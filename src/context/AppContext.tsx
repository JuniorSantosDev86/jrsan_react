import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type Language = 'pt' | 'en'

interface AppContextType {
  theme: Theme
  language: Language
  toggleTheme: () => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Traduções
const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Header
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'Sobre',
    'nav.skills': 'Skills',
    'nav.services': 'Serviços',
    
    // Hero
    'hero.greeting': 'Olá, eu sou',
    'hero.title': 'Desenvolvedor Flutter & Designer',
    'hero.subtitle': 'Criando experiências digitais incríveis',
    'hero.description': 'Especialista em desenvolvimento mobile com Flutter e design gráfico. Transformo ideias em aplicativos funcionais e interfaces atrativas.',
    'hero.cta': 'Meus Serviços',
    
    // About
    'about.title': 'Sobre Mim',
    'about.text1': 'Sou um desenvolvedor apaixonado por tecnologia e design, com mais de 5 anos de experiência criando soluções digitais inovadoras.',
    'about.text2': 'Minha especialidade é desenvolvimento mobile com Flutter, mas também trabalho com design gráfico, UI/UX e desenvolvimento web.',
    'about.text3': 'Sempre busco entregar projetos que combinem funcionalidade excepcional com design elegante e experiência do usuário intuitiva.',
    
    // Skills
    'skills.title': 'Minhas Skills',
    
    // Services
    'services.title': 'Meus Serviços',
    'services.web.title': 'Desenvolvimento Web',
    'services.web.description': 'Sites e aplicações web modernas com React, TypeScript e tecnologias de ponta.',
    'services.design.title': 'Design Gráfico',
    'services.design.description': 'Criação de identidades visuais, logos, materiais gráficos e interfaces atrativas.',
    'services.mobile.title': 'Aplicativos Mobile',
    'services.mobile.description': 'Desenvolvimento de apps nativos e multiplataforma com Flutter.',
    
    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.project1.title': 'E-commerce App',
    'portfolio.project1.description': 'Aplicativo de e-commerce completo com Flutter',
    'portfolio.project2.title': 'Design System',
    'portfolio.project2.description': 'Sistema de design para produtos digitais',
    'portfolio.project3.title': 'Landing Page',
    'portfolio.project3.description': 'Landing page responsiva e moderna',
    'portfolio.project4.title': 'Dashboard',
    'portfolio.project4.description': 'Dashboard administrativo com React',
    
    // CTA & Footer
    'cta.title': 'Vamos trabalhar juntos?',
    'cta.description': 'Estou sempre aberto a novos projetos e desafios interessantes.',
    'cta.button': 'Entre em Contato',
    'footer.rights': 'Todos os direitos reservados',
    'footer.scrollTop': 'Voltar ao topo'
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.services': 'Services',
    
    // Hero
    'hero.greeting': 'Hello, I am',
    'hero.title': 'Flutter Developer & Designer',
    'hero.subtitle': 'Creating amazing digital experiences',
    'hero.description': 'Expert in mobile development with Flutter and graphic design. I transform ideas into functional applications and attractive interfaces.',
    'hero.cta': 'My Services',
    
    // About
    'about.title': 'About Me',
    'about.text1': 'I am a developer passionate about technology and design, with over 5 years of experience creating innovative digital solutions.',
    'about.text2': 'My specialty is mobile development with Flutter, but I also work with graphic design, UI/UX and web development.',
    'about.text3': 'I always strive to deliver projects that combine exceptional functionality with elegant design and intuitive user experience.',
    
    // Skills
    'skills.title': 'My Skills',
    
    // Services
    'services.title': 'My Services',
    'services.web.title': 'Web Development',
    'services.web.description': 'Modern websites and web applications with React, TypeScript and cutting-edge technologies.',
    'services.design.title': 'Graphic Design',
    'services.design.description': 'Creation of visual identities, logos, graphic materials and attractive interfaces.',
    'services.mobile.title': 'Mobile Apps',
    'services.mobile.description': 'Development of native and cross-platform apps with Flutter.',
    
    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.project1.title': 'E-commerce App',
    'portfolio.project1.description': 'Complete e-commerce application with Flutter',
    'portfolio.project2.title': 'Design System',
    'portfolio.project2.description': 'Design system for digital products',
    'portfolio.project3.title': 'Landing Page',
    'portfolio.project3.description': 'Responsive and modern landing page',
    'portfolio.project4.title': 'Dashboard',
    'portfolio.project4.description': 'Administrative dashboard with React',
    
    // CTA & Footer
    'cta.title': 'Let\'s work together?',
    'cta.description': 'I\'m always open to new projects and interesting challenges.',
    'cta.button': 'Get In Touch',
    'footer.rights': 'All rights reserved',
    'footer.scrollTop': 'Back to top'
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as Theme) || 'light'
  })
  
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'pt'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt')
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <AppContext.Provider value={{
      theme,
      language,
      toggleTheme,
      toggleLanguage,
      t
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
