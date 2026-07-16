# Campex — Landing Page Base

Base estática e editável inspirada apenas no **ritmo visual** de sites editoriais de tecnologia: tipografia grande, blocos numerados, cards de produto, bastante respiro e animações discretas.

## Como abrir

1. Abra a pasta `campex-landing-base`.
2. Clique duas vezes em `index.html`.
3. O site abre direto no navegador. Não precisa instalar nada.

## Onde mudar cada coisa

- **Textos e estrutura:** `index.html`
- **Cores, tamanhos e visual:** `styles.css`
- **Animações e menu mobile:** `script.js`

## Mudanças rápidas

### Cores
No começo de `styles.css`, altere as variáveis dentro de `:root`:

```css
--black: #07090d;
--paper: #f2f2eb;
--blue: #3155ff;
--violet: #755bff;
--lime: #c8ff62;
```

### Logo
Há um símbolo provisório em SVG dentro do `index.html`. Substitua o bloco `.brand` pela sua imagem:

```html
<img src="assets/logo-campex.svg" alt="Campex" />
```

### Botão de contato
Procure por:

```html
href="mailto:contato@campex.ai"
```

Troque por WhatsApp, Calendly ou formulário.

### Print real da plataforma
O mockup atual é todo feito em HTML/CSS. Quando tiver um print real, substitua o conteúdo de `.dashboard-shell` por:

```html
<img class="dashboard-image" src="assets/plataforma-campex.png" alt="Plataforma Campex" />
```

E adicione ao CSS:

```css
.dashboard-image {
  width: 100%;
  border-radius: 28px;
  box-shadow: var(--shadow);
}
```

## Estrutura da página

1. Hero
2. Problema
3. Sistema em 3 etapas
4. Aplicações
5. Plataforma
6. Piloto
7. FAQ
8. CTA final

## Publicar grátis

A pasta pode ser arrastada diretamente para Netlify Drop ou enviada para GitHub/Vercel como site estático.
