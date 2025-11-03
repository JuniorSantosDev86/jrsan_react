# Junior Santos - Portfolio React

Um portfólio moderno e responsivo construído com React, TypeScript e Tailwind CSS, inspirado no design fornecido. O projeto apresenta alternância de tema claro/escuro, internacionalização (PT/EN), animações suaves e otimização para performance.

## 🚀 Características

- **⚡ Tecnologias Modernas**: React 19, TypeScript, Vite
- **🎨 Design Responsivo**: Mobile-first, suporte para XS até ultrawide (1536px+)
- **🌓 Tema Claro/Escuro**: Alternância com persistência no localStorage
- **🌍 Internacionalização**: Suporte completo PT/EN com react-i18next
- **✨ Animações**: Framer Motion para transições suaves e microinterações
- **🎯 Performance**: Otimizado para Lighthouse scores ≥95/90
- **♿ Acessibilidade**: Contraste AA, navegação por teclado, ARIA labels
- **📱 PWA Ready**: Service worker e manifest configurados

## 🛠️ Tech Stack

### Core
- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de CSS utilitário

### UI & Animações
- **Framer Motion** - Animações e microinterações
- **Lucide React** - Ícones SVG
- **@tailwindcss/typography** - Tipografia otimizada
- **@tailwindcss/forms** - Estilos para formulários

### Internacionalização
- **react-i18next** - Sistema de tradução
- **i18next** - Core de internacionalização

### Roteamento & SEO
- **react-router-dom** - Roteamento SPA
- **react-helmet-async** - Gerenciamento de head/SEO

### Utilitários
- **clsx** - Utilitário para classes condicionais
- **tailwind-merge** - Merge de classes Tailwind

### Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **@vitejs/plugin-react-swc** - Fast refresh

## 📁 Estrutura do Projeto

```
src/
├── assets/
│   ├── img/                    # Imagens do projeto
│   └── icons/                  # Ícones customizados
├── components/
│   ├── Header.tsx              # Cabeçalho com navegação
│   ├── Hero.tsx                # Seção hero principal
│   ├── PortfolioCarousel.tsx   # Carrossel de projetos
│   ├── About.tsx               # Seção sobre
│   ├── SkillsStrip.tsx         # Faixa de habilidades
│   ├── ServicesGrid.tsx        # Grid de serviços
│   ├── CTAFooter.tsx           # Call-to-action footer
│   └── SiteFooter.tsx          # Rodapé do site
├── features/
│   ├── theme/
│   │   └── ThemeProvider.tsx   # Context de tema
│   └── i18n/
│       ├── i18n.ts             # Configuração i18next
│       └── locales/
│           ├── pt/common.json  # Traduções PT
│           └── en/common.json  # Traduções EN
├── pages/
│   └── Home.tsx                # Página principal
├── routes/
│   └── AppRouter.tsx           # Configuração de rotas
├── styles/
│   ├── globals.css             # Estilos globais
│   └── theme.css               # Tokens de tema
├── App.tsx                     # Componente raiz
└── main.tsx                    # Entry point
```

## 🎨 Sistema de Temas

O projeto utiliza CSS Variables para suporte a temas claro e escuro:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 262 83% 58%;
  /* ... */
}

[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

## 🌍 Internacionalização

Sistema completo de tradução com detecção automática do idioma do navegador:

```typescript
// Uso em componentes
const { t, language, changeLanguage } = useTranslation()

// Textos simples
t('navigation.home') // "Início" ou "Home"

// Objetos complexos
const project = t('portfolio.projects.fluxGrowthStudio', { returnObjects: true })
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/junior-santos/portfolio-react.git
cd portfolio-react

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento (localhost:3000)

# Build
npm run build           # Build de produção
npm run preview         # Preview do build

# Qualidade de Código
npm run lint            # Verificar linting
npm run lint:fix        # Corrigir problemas de linting
npm run format          # Formatar código com Prettier
npm run format:check    # Verificar formatação
npm run type-check      # Verificar tipos TypeScript

# Performance
npm run audit           # Lighthouse audit
```

## 📱 Responsividade

O projeto suporta os seguintes breakpoints:

- **XS**: 475px+ (smartphones)
- **SM**: 640px+ (smartphones grandes)
- **MD**: 768px+ (tablets)
- **LG**: 1024px+ (desktops)
- **XL**: 1280px+ (desktops grandes)
- **Ultrawide**: 1536px+ (monitores ultrawide)

## ♿ Acessibilidade

- **Contraste**: Conformidade WCAG AA
- **Navegação**: Suporte completo a teclado
- **Screen Readers**: ARIA labels e roles
- **Focus**: Indicadores visuais claros
- **Reduced Motion**: Respeita preferências do usuário

## 🎯 Performance

Otimizações implementadas:

- **Code Splitting**: Chunks automáticos por rota
- **Tree Shaking**: Eliminação de código não usado
- **Image Optimization**: Formatos modernos (WebP)
- **Lazy Loading**: Carregamento sob demanda
- **Preload**: Recursos críticos
- **Minificação**: CSS e JS otimizados

## 🔧 Configuração

### Vite (vite.config.ts)
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          i18n: ['i18next', 'react-i18next'],
          animations: ['framer-motion'],
        },
      },
    },
  },
})
```

### Tailwind (tailwind.config.js)
```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      // Configurações customizadas
    },
  },
}
```

## 📈 Deploy

### GitHub Pages

1. Configure o repositório:
```bash
npm install --save-dev gh-pages
```

2. Adicione ao package.json:
```json
{
  "homepage": "https://username.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Arraste a pasta dist para netlify.com
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Junior Santos**
- Portfolio: [https://junior-santos.dev](https://junior-santos.dev)
- LinkedIn: [@junior-santos](https://linkedin.com/in/junior-santos)
- GitHub: [@junior-santos](https://github.com/junior-santos)
- Email: junior@example.com

## 🙏 Agradecimentos

- Design inspirado no layout fornecido
- Ícones por [Lucide](https://lucide.dev)
- Fontes por [Google Fonts](https://fonts.google.com)
- Deploy por [Vercel](https://vercel.com)

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
## SEO & Analytics

- Variaveis `.env`:
  - `VITE_SITE_URL`: dominio principal (ex.: `https://meu-dominio.com`)
  - `VITE_DEFAULT_OG_IMAGE`: caminho absoluto da imagem OG (ex.: `/og-image.jpg`)
  - `VITE_GTM_ID`: identificador do Google Tag Manager (formato `GTM-XXXXXXX`)
  - `VITE_GSC_META`: valor da meta tag de verificacao do Google Search Console
  - `VITE_META_PIXEL_ID` e `VITE_LINKEDIN_PARTNER_ID`: opcionais para pixels via GTM
- Eventos padrao: `page_view`, `cta_click`, `outbound_click`, `form_submit`
  - Para inspecionar no navegador, use `window.dataLayer` no console
  - Cada mudanca de rota dispara `page_view` automaticamente
- Consent Mode v2 implementado com banner persistente; preferencias gravadas em `localStorage`
- Sitemap e robots gerados apos `npm run build` (tambem disponiveis em `npm run sitemap`)
- Validacoes recomendadas:
  - Lighthouse Desktop (Meta: Perf >=95, SEO >=100, A11y >=100, Best Practices >=90)
  - Google Rich Results Test apontando para `/` e paginas de projetos/servicos
  - Inspecionar JSON-LD via devtools (`<script type="application/ld+json">`)
  - Enviar `https://meu-dominio.com/sitemap.xml` ao Search Console (caminho ajustado pelo `.env`)

### Checklist pos-deploy

1. Atualizar variaveis `.env` em producao e repetir o build
2. Garantir que `robots.txt` aponta para o dominio definitivo
3. Acessar `/sitemap.xml` e `/sitemap-robots.txt` para validar
4. Validar consentimento no navegador (banner, atualizacao de categorias e gatilhos do GTM)
5. Testar eventos principais: clicar CTAs, links externos e enviar o formulario
6. Confirmar hreflang alternates (`?lang=en`) e canonicals corretos
7. Executar Lighthouse e axe DevTools para confirmar as metas estabelecidas
