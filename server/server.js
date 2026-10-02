/* CAMPEX — API
   Servidor sem dependências (só módulos nativos do Node). Hoje expõe:
     GET  /api/health    → verificação do Render
     POST /api/contato   → recebe o formulário de /contato/ e envia por e-mail (Resend)

   Variáveis de ambiente (ver .env.example):
     PORT             porta (o Render define sozinho)
     ALLOWED_ORIGINS  origens do site que podem chamar a API, separadas por vírgula
     RESEND_API_KEY   chave da Resend; sem ela, as mensagens só aparecem no log (modo dev)
     CONTACT_TO       e-mail que recebe as mensagens
     CONTACT_FROM     remetente verificado na Resend */

const http = require('node:http');

const PORT = Number(process.env.PORT) || 4310;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5501,http://127.0.0.1:5501')
  .split(',').map((origin) => origin.trim()).filter(Boolean);
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const CONTACT_TO = process.env.CONTACT_TO || 'contato@campex.ai';
const CONTACT_FROM = process.env.CONTACT_FROM || 'Campex Site <site@campex.ai>';

const MAX_BODY_BYTES = 16 * 1024;
const LIMITS = { name: 120, email: 200, company: 160, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Limite simples por IP (em memória): 5 envios a cada 10 minutos.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
};
setInterval(() => {
  const now = Date.now();
  hits.forEach((times, ip) => {
    if (times.every((time) => now - time >= RATE_WINDOW_MS)) hits.delete(ip);
  });
}, RATE_WINDOW_MS).unref();

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  res.end(JSON.stringify(body));
};

const corsHeaders = (origin) => (ALLOWED_ORIGINS.includes(origin)
  ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
  : {});

const readJson = (req) => new Promise((resolve, reject) => {
  let size = 0;
  const chunks = [];
  // Passando do limite, descarta o resto do corpo (sem derrubar a conexão) para conseguir responder 413.
  req.on('data', (chunk) => {
    size += chunk.length;
    if (size <= MAX_BODY_BYTES) chunks.push(chunk);
  });
  req.on('end', () => {
    if (size > MAX_BODY_BYTES) {
      reject(Object.assign(new Error('payload_too_large'), { status: 413 }));
      return;
    }
    try {
      resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
    } catch {
      reject(Object.assign(new Error('invalid_json'), { status: 400 }));
    }
  });
  req.on('error', reject);
});

const validateContact = (body) => {
  const field = (key) => (typeof body[key] === 'string' ? body[key].trim() : '');
  const data = {
    name: field('name'),
    email: field('email'),
    company: field('company'),
    message: field('message'),
  };
  const errors = [];
  if (!data.name) errors.push('name');
  if (!EMAIL_PATTERN.test(data.email)) errors.push('email');
  if (!data.message) errors.push('message');
  Object.entries(LIMITS).forEach(([key, max]) => {
    if (data[key].length > max) errors.push(key);
  });
  return { data, errors: [...new Set(errors)] };
};

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

const deliverContact = async (contact) => {
  if (!RESEND_API_KEY) {
    // Em produção, falhar é melhor que confirmar ao visitante um envio que não aconteceu.
    if (IS_PRODUCTION) throw new Error('RESEND_API_KEY não definida');
    console.log('[contato] RESEND_API_KEY ausente — mensagem só registrada no log:', contact);
    return;
  }
  const rows = [
    ['Nome', contact.name],
    ['E-mail', contact.email],
    ['Empresa', contact.company || '—'],
    ['Idioma', contact.lang],
  ];
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: contact.email,
      subject: `Contato pelo site — ${contact.name}${contact.company ? ` (${contact.company})` : ''}`,
      text: `${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\n${contact.message}`,
      html: `${rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join('')}`
        + `<p style="white-space:pre-wrap">${escapeHtml(contact.message)}</p>`,
    }),
  });
  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`);
};

const handleContact = async (req, res, cors) => {
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  if (isRateLimited(ip)) return send(res, 429, { ok: false, error: 'rate_limited' }, cors);

  const body = await readJson(req);
  // Honeypot: campo escondido no formulário; só robôs preenchem. Responde OK sem enviar.
  if (body.website) return send(res, 200, { ok: true }, cors);

  const { data, errors } = validateContact(body);
  if (errors.length) return send(res, 422, { ok: false, error: 'invalid_fields', fields: errors }, cors);

  const lang = ['pt', 'en', 'es'].includes(body.lang) ? body.lang : 'pt';
  await deliverContact({ ...data, lang });
  return send(res, 200, { ok: true }, cors);
};

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';
  const cors = corsHeaders(origin);
  const { pathname } = new URL(req.url, 'http://localhost');

  try {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        ...cors,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      });
      return res.end();
    }

    if (pathname === '/api/health' && req.method === 'GET') return send(res, 200, { ok: true });

    if (pathname === '/api/contato') {
      if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'method_not_allowed' }, { ...cors, Allow: 'POST' });
      if (origin && !cors['Access-Control-Allow-Origin']) return send(res, 403, { ok: false, error: 'origin_not_allowed' });
      return await handleContact(req, res, cors);
    }

    return send(res, 404, { ok: false, error: 'not_found' }, cors);
  } catch (error) {
    if (error.status) return send(res, error.status, { ok: false, error: error.message }, cors);
    console.error('[api]', error);
    return send(res, 500, { ok: false, error: 'server_error' }, cors);
  }
});

server.listen(PORT, () => {
  console.log(`[api] ouvindo na porta ${PORT} — origens permitidas: ${ALLOWED_ORIGINS.join(', ')}`);
  if (!RESEND_API_KEY) {
    console.warn(`[api] RESEND_API_KEY não definida: ${IS_PRODUCTION ? 'o formulário de contato vai responder erro' : 'mensagens de contato só vão para o log'}.`);
  }
});
