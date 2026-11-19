# Codon · site

Site da Codon em React + Three.js (React Three Fiber), com rolagem suave (Lenis).

## Rodar no computador

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

## Publicar

```bash
npm run build
```

A pasta `dist/` é o site pronto. Na Vercel ou Netlify, basta importar o repositório: comando de build `npm run build`, pasta de saída `dist`.

## Onde mexer

| O quê | Arquivo |
|---|---|
| Textos de serviços, portfólio, processo e segmentos | `src/data.js` |
| Logo (símbolo) | `Symbol` em `src/components/Nav.jsx` · original em `public/logo-codon-original.svg` |
| Cores, fontes e espaçamentos | `src/styles.css` (bloco `:root` no topo) |
| Hélice 3D (geometria, cores das bases, movimento) | `src/three/Helix.jsx` |
| Luz de estúdio e partículas | `src/three/Scene.jsx` |
| Seções | `src/components/` |

## Pendências

- Wordmark oficial: hoje o nome "CODON" ao lado do símbolo é texto em Impact.
- Portfólio (`PORTFOLIO` em `src/data.js`): adicionar o link do GitHub do Servem Pets e os @ do CBCTQ26 e da FAETERJ no campo `link`.
- Neue Montreal: os arquivos vieram como Demo/Trial. Para uso comercial, comprar a licença na Pangram Pangram.
- Formulário: hoje monta a mensagem para a DM. Para enviar direto, ligar a um serviço como Formspree ou a uma função da Vercel.
