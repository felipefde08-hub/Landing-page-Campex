# Campex API

Servidor Node sem dependências. Hoje atende o formulário de `/contato/`.

| Rota | Método | O que faz |
|---|---|---|
| `/api/health` | GET | Verificação de saúde (usada pelo Render) |
| `/api/contato` | POST | Valida o formulário e envia por e-mail via [Resend](https://resend.com) |

## Rodar localmente

```bash
cd server
cp .env.example .env   # opcional
npm run dev            # http://localhost:4310
```

Abra o site pelo Live Server (porta 5501). Em `localhost`, o `main.js` já envia o formulário para `http://localhost:4310`.
Sem `RESEND_API_KEY`, as mensagens só aparecem no terminal.

## Produção (Render)

O serviço `campex-api` está descrito em `../render.yaml`. No painel do Render:

1. Defina `RESEND_API_KEY` (crie a chave na Resend e verifique o domínio `campex.ai` lá).
2. Confira se `ALLOWED_ORIGINS` tem o endereço real do site (inclua o domínio próprio quando houver).
3. Se a URL da API não for `https://campex-api.onrender.com`, ajuste `CONTACT_ENDPOINT` em `../main.js`.

Sem `RESEND_API_KEY` em produção, a API responde erro e o site mostra o e-mail de contato, para nenhuma mensagem se perder em silêncio.

## Proteções

- Validação de campos e limite de tamanho (16 KB por requisição)
- CORS restrito a `ALLOWED_ORIGINS`
- Honeypot anti-spam (campo `website` escondido no formulário)
- Limite de 5 envios por IP a cada 10 minutos (em memória; zera quando o serviço reinicia)
