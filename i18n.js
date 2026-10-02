/* Portuguese source copy, followed by English and Spanish translations. */
(() => {
  const copy = [
    ['Campex — Inteligência operacional', 'Campex — Operational intelligence', 'Campex — Inteligencia operativa'],
    ['Campex — inteligência operacional para o mundo físico.', 'Campex — operational intelligence for the physical world.', 'Campex — inteligencia operativa para el mundo físico.'],
    ['Produto', 'Product', 'Producto'],
    ['Como funciona', 'How it works', 'Cómo funciona'],
    ['Integrações', 'Integrations', 'Integraciones'],
    ['Soluções', 'Solutions', 'Soluciones'],
    ['Produtividade', 'Productivity', 'Productividad'],
    ['Qualidade', 'Quality', 'Calidad'],
    ['Segurança', 'Safety', 'Seguridad'],
    ['Fluxo operacional', 'Operational flow', 'Flujo operativo'],
    ['Empresa', 'Company', 'Empresa'],
    ['Sobre', 'About', 'Acerca de'],
    ['Contato', 'Contact', 'Contacto'],
    ['Falar com nosso time', 'Talk to our team', 'Habla con nuestro equipo'],
    ['INTELIGÊNCIA OPERACIONAL PARA O MUNDO FÍSICO', 'OPERATIONAL INTELLIGENCE FOR THE PHYSICAL WORLD', 'INTELIGENCIA OPERATIVA PARA EL MUNDO FÍSICO'],
    ['Sua operação já tem olhos.', 'Your operation already has eyes.', 'Tu operación ya tiene ojos.'],
    ['Agora ela pode entender.', 'Now it can understand.', 'Ahora puede entender.'],
    ['OPERAÇÃO REAL', 'REAL OPERATIONS', 'OPERACIONES REALES'],
    ['CAMPEX / INTELIGÊNCIA OPERACIONAL', 'CAMPEX / OPERATIONAL INTELLIGENCE', 'CAMPEX / INTELIGENCIA OPERATIVA'],
    ['02 / O QUE AS CÂMERAS NÃO CONTAM', '02 / WHAT CAMERAS DON’T TELL YOU', '02 / LO QUE LAS CÁMARAS NO CUENTAN'],
    ['Câmeras registram.', 'Cameras record.', 'Las cámaras graban.'],
    ['Mas não explicam', 'But they don’t explain', 'Pero no explican'],
    ['o que aconteceu.', 'what happened.', 'qué pasó.'],
    ['Por que essa máquina parou?', 'Why did this machine stop?', '¿Por qué se detuvo esta máquina?'],
    ['O que aconteceu antes?', 'What happened before?', '¿Qué pasó antes?'],
    ['Quem estava na área?', 'Who was in the area?', '¿Quién estaba en el área?'],
    ['Quanto tempo ficou parada?', 'How long was it stopped?', '¿Cuánto tiempo estuvo detenida?'],
    ['Isso já aconteceu antes?', 'Has this happened before?', '¿Esto ya había pasado?'],
    ['O turno aconteceu como esperado?', 'Did the shift go as expected?', '¿El turno transcurrió como se esperaba?'],
    ['O que mudou?', 'What changed?', '¿Qué cambió?'],
    ['Uma nova forma de entender sua operação.', 'A new way to understand your operation.', 'Una nueva forma de entender tu operación.'],
    ['Eventos, evidências e contexto operacional organizados em um único lugar.', 'Events, evidence and operational context, organized in one place.', 'Eventos, evidencias y contexto operativo organizados en un solo lugar.'],
    ['01 / EVENTOS EM TEMPO REAL', '01 / REAL-TIME EVENTS', '01 / EVENTOS EN TIEMPO REAL'],
    ['Veja o que está acontecendo agora, não só depois.', 'See what is happening now, not just afterward.', 'Ve lo que está pasando ahora, no solo después.'],
    ['A Campex identifica automaticamente mudanças de estado — máquina parada, operador ausente, movimento na área — assim que acontecem, sem depender de alguém assistir a câmera.', 'Campex automatically detects state changes — a stopped machine, an absent operator, movement in an area — as they happen, without relying on someone watching the camera.', 'Campex identifica automáticamente cambios de estado — máquina detenida, operador ausente, movimiento en el área — en cuanto ocurren, sin depender de que alguien observe la cámara.'],
    ['EVENTOS / AO VIVO', 'EVENTS / LIVE', 'EVENTOS / EN VIVO'],
    ['LINHA 01 / PRODUÇÃO', 'LINE 01 / PRODUCTION', 'LÍNEA 01 / PRODUCCIÓN'],
    ['LINHA DE PRODUÇÃO 01', 'PRODUCTION LINE 01', 'LÍNEA DE PRODUCCIÓN 01'],
    ['AO VIVO', 'LIVE', 'EN VIVO'],
    ['ÁREA MONITORADA', 'MONITORED AREA', 'ÁREA MONITOREADA'],
    ['EVIDÊNCIA', 'EVIDENCE', 'EVIDENCIA'],
    ['ANTES', 'BEFORE', 'ANTES'],
    ['EVENTO', 'EVENT', 'EVENTO'],
    ['DEPOIS', 'AFTER', 'DESPUÉS'],
    ['02 / EVIDÊNCIA DE CADA OCORRÊNCIA', '02 / EVIDENCE FOR EVERY EVENT', '02 / EVIDENCIA DE CADA EVENTO'],
    ['Cada evento vem com a prova.', 'Every event comes with proof.', 'Cada evento viene con pruebas.'],
    ['Cada ocorrência é registrada com horário, área, duração e evidência visual — sem precisar procurar manualmente em horas de gravação.', 'Every event is logged with its time, area, duration and visual evidence — no need to search manually through hours of footage.', 'Cada evento se registra con hora, área, duración y evidencia visual — sin tener que buscar manualmente en horas de grabación.'],
    ['EVIDÊNCIAS / CONTEXTO', 'EVIDENCE / CONTEXT', 'EVIDENCIAS / CONTEXTO'],
    ['CONTEXTO OPERACIONAL', 'OPERATIONAL CONTEXT', 'CONTEXTO OPERATIVO'],
    ['Mudança de estado da máquina', 'Machine state change', 'Cambio de estado de la máquina'],
    ['HORÁRIO', 'TIME', 'HORA'],
    ['ÁREA', 'AREA', 'ÁREA'],
    ['Linha de Produção 01', 'Production Line 01', 'Línea de Producción 01'],
    ['DURAÇÃO', 'DURATION', 'DURACIÓN'],
    ['Disponível', 'Available', 'Disponible'],
    ['Operador deixou a área', 'Operator left the area', 'El operador salió del área'],
    ['Fluxo operacional retomado', 'Operational flow resumed', 'Flujo operativo reanudado'],
    ['03 / HISTÓRICO CONSULTÁVEL', '03 / SEARCHABLE HISTORY', '03 / HISTORIAL CONSULTABLE'],
    ['A operação constrói memória própria.', 'Your operation builds its own memory.', 'Tu operación construye su propia memoria.'],
    ['Cada evento fica registrado no histórico, consultável a qualquer momento — para investigar um incidente, entender um padrão ou provar o que aconteceu.', 'Every event is saved in a history you can search at any time — to investigate an incident, understand a pattern or prove what happened.', 'Cada evento queda registrado en un historial que puedes consultar en cualquier momento — para investigar un incidente, entender un patrón o demostrar lo que pasó.'],
    ['HISTÓRICO / EVENTOS', 'HISTORY / EVENTS', 'HISTORIAL / EVENTOS'],
    ['Operador entrou na área', 'Operator entered the area', 'El operador entró en el área'],
    ['PRESENÇA', 'PRESENCE', 'PRESENCIA'],
    ['MUDANÇA DE ESTADO', 'STATE CHANGE', 'CAMBIO DE ESTADO'],
    ['Empilhadeira entrou na área monitorada', 'Forklift entered the monitored area', 'Un montacargas entró en el área monitoreada'],
    ['MOVIMENTO', 'MOVEMENT', 'MOVIMIENTO'],
    ['FLUXO', 'FLOW', 'FLUJO'],
    ['EVENTOS', 'EVENTS', 'EVENTOS'],
    ['EVIDÊNCIAS', 'EVIDENCE', 'EVIDENCIAS'],
    ['HISTÓRICO', 'HISTORY', 'HISTORIAL'],
    ['RELATÓRIOS', 'REPORTS', 'INFORMES'],
    ['INTELIGÊNCIA', 'INTELLIGENCE', 'INTELIGENCIA'],
    ['Explorar Campex Operations', 'Explore Campex Operations', 'Explorar Campex Operations'],
    ['TECNOLOGIA PARA QUEM OPERA O MUNDO REAL', 'TECHNOLOGY FOR THOSE WHO RUN THE REAL WORLD', 'TECNOLOGÍA PARA QUIENES OPERAN EL MUNDO REAL'],
    ['Mais contexto para quem precisa decidir.', 'More context for better decisions.', 'Más contexto para quienes toman decisiones.'],
    ['Entenda o que aconteceu', 'Understand what happened', 'Entiende lo que pasó'],
    ['Veja como funciona', 'See how it works', 'Descubre cómo funciona'],
    ['Vídeo vira dado', 'Video becomes data', 'El video se convierte en datos'],
    ['Câmeras existentes se tornam sensores operacionais, sem trocar hardware.', 'Existing cameras become operational sensors, with no hardware replacement.', 'Las cámaras existentes se convierten en sensores operativos, sin cambiar el hardware.'],
    ['Construído em campo, não em laboratório', 'Built in the field, not in a lab', 'Desarrollado en campo, no en un laboratorio'],
    ['Testado e implantado dentro de operações industriais reais desde o primeiro dia.', 'Tested and deployed in real industrial operations from day one.', 'Probado e implementado en operaciones industriales reales desde el primer día.'],
    ['ECOSSISTEMA', 'ECOSYSTEM', 'ECOSISTEMA'],
    ['Conectado com as ferramentas que sua operação já usa.', 'Connected to the tools your operation already uses.', 'Conectado con las herramientas que tu operación ya usa.'],
    ['A Campex se integra ao seu fluxo de trabalho e aos seus sistemas industriais.', 'Campex integrates with your workflow and industrial systems.', 'Campex se integra con tu flujo de trabajo y tus sistemas industriales.'],
    ['Em breve', 'Coming soon', 'Próximamente'],
    ['COMO FUNCIONA', 'HOW IT WORKS', 'CÓMO FUNCIONA'],
    ['Da operação ao resultado.', 'From operations to results.', 'De la operación al resultado.'],
    ['A Campex transforma o que acontece diante das câmeras em contexto, decisões e indicadores para a gestão.', 'Campex turns what happens in front of cameras into context, decisions and management metrics.', 'Campex transforma lo que ocurre frente a las cámaras en contexto, decisiones e indicadores para la gestión.'],
    ['Observa', 'Observe', 'Observa'],
    ['A Campex acompanha continuamente câmeras e áreas importantes da operação.', 'Campex continuously monitors cameras and key areas of your operation.', 'Campex monitorea continuamente las cámaras y las áreas clave de tu operación.'],
    ['máquinas', 'machines', 'máquinas'],
    ['pessoas', 'people', 'personas'],
    ['produtos', 'products', 'productos'],
    ['veículos', 'vehicles', 'vehículos'],
    ['processos', 'processes', 'procesos'],
    ['Entende', 'Understand', 'Entiende'],
    ['Combina imagem, tempo, zonas e contexto para entender o que realmente está acontecendo.', 'Combines images, time, zones and context to understand what is really happening.', 'Combina imágenes, tiempo, zonas y contexto para entender lo que realmente está pasando.'],
    ['parada', 'downtime', 'parada'],
    ['ausência', 'absence', 'ausencia'],
    ['desvio', 'deviation', 'desviación'],
    ['risco', 'risk', 'riesgo'],
    ['fluxo', 'flow', 'flujo'],
    ['Age', 'Act', 'Actúa'],
    ['Eventos relevantes podem gerar alertas e permitir intervenção enquanto ainda existe tempo de mudar o resultado.', 'Relevant events can trigger alerts and enable intervention while there is still time to change the outcome.', 'Los eventos relevantes pueden generar alertas y permitir intervenir mientras aún hay tiempo de cambiar el resultado.'],
    ['alerta em tempo real', 'real-time alert', 'alerta en tiempo real'],
    ['evidência', 'evidence', 'evidencia'],
    ['prevenção', 'prevention', 'prevención'],
    ['Mede', 'Measure', 'Mide'],
    ['Tudo vira histórico e indicadores para gestão.', 'Everything becomes history and metrics for management.', 'Todo se convierte en historial e indicadores para la gestión.'],
    ['tempo perdido', 'lost time', 'tiempo perdido'],
    ['frequência', 'frequency', 'frecuencia'],
    ['disponibilidade', 'availability', 'disponibilidad'],
    ['desvios', 'deviations', 'desviaciones'],
    ['tendências', 'trends', 'tendencias'],
    ['Um sistema. Diferentes resultados.', 'One system. Different outcomes.', 'Un sistema. Diferentes resultados.'],
    ['Tempo produzindo', 'Production time', 'Tiempo de producción'],
    ['Paradas e duração', 'Stoppages and duration', 'Paradas y duración'],
    ['Ausência de operador', 'Operator absence', 'Ausencia de operador'],
    ['Gargalos', 'Bottlenecks', 'Cuellos de botella'],
    ['Disponibilidade', 'Availability', 'Disponibilidad'],
    ['Contagem de produtos', 'Product count', 'Conteo de productos'],
    ['Divergências de quantidade', 'Quantity discrepancies', 'Diferencias de cantidad'],
    ['Etapas fora do padrão', 'Nonstandard process steps', 'Etapas fuera del estándar'],
    ['Erros antes de avançarem na linha', 'Errors before they move down the line', 'Errores antes de que avancen por la línea'],
    ['Pessoas em áreas de risco', 'People in hazardous areas', 'Personas en áreas de riesgo'],
    ['Interação pessoa/máquina', 'Human-machine interaction', 'Interacción persona/máquina'],
    ['EPI', 'PPE', 'EPP'],
    ['Veículos em zonas críticas', 'Vehicles in critical zones', 'Vehículos en zonas críticas'],
    ['Movimentação de materiais', 'Material movement', 'Movimiento de materiales'],
    ['Empilhadeiras', 'Forklifts', 'Montacargas'],
    ['Estoque parado', 'Idle inventory', 'Inventario inmovilizado'],
    ['Filas e acúmulos', 'Queues and buildups', 'Colas y acumulaciones'],
    ['Pare de apenas assistir câmeras.', 'Stop just watching cameras.', 'Deja de solo mirar cámaras.'],
    ['Entenda sua operação.', 'Understand your operation.', 'Entiende tu operación.'],
    ['Transforme as câmeras que sua operação já possui em contexto, eventos, evidências e dados operacionais.', 'Turn the cameras your operation already has into context, events, evidence and operational data.', 'Transforma las cámaras que tu operación ya tiene en contexto, eventos, evidencias y datos operativos.'],
    ['ARRASTE PARA GIRAR · APROXIME PARA EXPLORAR', 'DRAG TO ROTATE · ZOOM TO EXPLORE', 'ARRASTRA PARA GIRAR · ACERCA PARA EXPLORAR'],
    ['Inteligência operacional para o mundo físico.', 'Operational intelligence for the physical world.', 'Inteligencia operativa para el mundo físico.'],
    ['Produção', 'Production', 'Producción'],
    ['Logística', 'Logistics', 'Logística'],
    ['Operações', 'Operations', 'Operaciones'],
    ['Privacidade', 'Privacy', 'Privacidad'],
    ['Termos', 'Terms', 'Términos'],
    ['© 2026 Campex. Todos os direitos reservados. · CNPJ 65.798.983/0001-07', '© 2026 Campex. All rights reserved. · CNPJ 65.798.983/0001-07', '© 2026 Campex. Todos los derechos reservados. · CNPJ 65.798.983/0001-07'],
    ['São José do Rio Preto, SP — Brasil', 'São José do Rio Preto, SP — Brazil', 'São José do Rio Preto, SP — Brasil'],
    ['Navegação principal', 'Main navigation', 'Navegación principal'],
    ['Abrir menu', 'Open menu', 'Abrir menú'],
    ['Fechar menu', 'Close menu', 'Cerrar menú'],
    ['Perguntas operacionais', 'Operational questions', 'Preguntas operativas'],
    ['Áreas de resultado', 'Outcome areas', 'Áreas de resultados'],
    ['Modelo 3D interativo de máquina industrial', 'Interactive 3D industrial machine model', 'Modelo 3D interactivo de máquina industrial'],
    ['Controles de zoom do modelo 3D', '3D model zoom controls', 'Controles de zoom del modelo 3D'],
    ['Aproximar modelo', 'Zoom in', 'Acercar modelo'],
    ['Afastar modelo', 'Zoom out', 'Alejar modelo'],
    ['Redes sociais', 'Social media', 'Redes sociales'],
    ['LinkedIn (abre em nova aba)', 'LinkedIn (opens in a new tab)', 'LinkedIn (se abre en una pestaña nueva)'],
    ['Instagram (abre em nova aba)', 'Instagram (opens in a new tab)', 'Instagram (se abre en una pestaña nueva)'],
    // Páginas internas
    ['PRODUTO', 'PRODUCT', 'PRODUCTO'],
    ['SOLUÇÕES', 'SOLUTIONS', 'SOLUCIONES'],
    ['EMPRESA', 'COMPANY', 'EMPRESA'],
    ['Menos tempo parado, mais tempo produzindo.', 'Less downtime, more time producing.', 'Menos tiempo detenido, más tiempo produciendo.'],
    ['Cada desvio registrado, com evidência.', 'Every deviation logged, with evidence.', 'Cada desviación registrada, con evidencia.'],
    ['Riscos visíveis antes de virarem incidentes.', 'Risks made visible before they become incidents.', 'Riesgos visibles antes de convertirse en incidentes.'],
    ['A operação inteira, de ponta a ponta.', 'The whole operation, end to end.', 'Toda la operación, de punta a punta.'],
    ['Conte sobre sua operação. Nosso time responde em até um dia útil.', 'Tell us about your operation. Our team replies within one business day.', 'Cuéntanos sobre tu operación. Nuestro equipo responde en un día hábil.'],
    ['Conteúdo em construção.', 'Content coming soon.', 'Contenido en construcción.'],
    ['Nome', 'Name', 'Nombre'],
    ['E-mail', 'Email', 'Correo electrónico'],
    ['Mensagem', 'Message', 'Mensaje'],
    ['Enviar', 'Send', 'Enviar'],
    ['O envio ainda não está conectado. Escreva para contato@campex.ai.', 'Sending is not connected yet. Write to contato@campex.ai.', 'El envío aún no está conectado. Escribe a contato@campex.ai.'],
  ];

  const languages = ['pt', 'en', 'es'];
  const requested = new URLSearchParams(window.location.search).get('lang');
  const language = languages.includes(requested) ? requested : 'pt';
  const column = languages.indexOf(language);
  const translations = new Map(copy.map((row) => [row[0], row[column]]));
  const translate = (value) => translations.get(value) ?? value;
  window.campexTranslate = translate;

  // Change text nodes only, preserving icons, nested markup and event targets.
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, svg, .lang-menu')) continue;
    const source = node.textContent.trim();
    if (translations.has(source)) node.textContent = node.textContent.replace(source, translate(source));
  }
  document.querySelectorAll('[aria-label], [alt], [title]').forEach((element) => {
    ['aria-label', 'alt', 'title'].forEach((attribute) => {
      if (element.hasAttribute(attribute)) element.setAttribute(attribute, translate(element.getAttribute(attribute)));
    });
  });
  // Títulos das páginas internas: "Página — Campex".
  document.title = document.title.split(' — ').map(translate).join(' — ');
  const description = document.querySelector('meta[name="description"]');
  description.content = translate(description.content);
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
  document.querySelector('.lang-code').textContent = language.toUpperCase();
  document.querySelector('.nav-lang [data-menu-trigger]').setAttribute('aria-label', {
    pt: 'Idioma: Português (BR)', en: 'Language: English', es: 'Idioma: Español',
  }[language]);

  const check = document.querySelector('.lang-check');
  document.querySelectorAll('.lang-option').forEach((link, index) => {
    const code = languages[index];
    const url = new URL(window.location.href);
    url.searchParams.set('lang', code);
    link.href = `${url.pathname}${url.search}${url.hash}`;
    link.hreflang = code === 'pt' ? 'pt-BR' : code;
    link.lang = link.hreflang;
    link.className = 'lang-option';
    link.removeAttribute('aria-current');
    if (code === language) {
      link.classList.add('is-current');
      link.setAttribute('aria-current', 'true');
    }
  });
  document.querySelector('.lang-option.is-current').append(check);

  // Links internos entre páginas carregam o idioma atual (PT é o padrão e fica sem parâmetro).
  if (language !== 'pt') {
    document.querySelectorAll('a[href^="/"]:not(.lang-option)').forEach((link) => {
      const url = new URL(link.href);
      url.searchParams.set('lang', language);
      link.href = `${url.pathname}${url.search}${url.hash}`;
    });
  }
})();
