import { useState } from 'react'
import heroProfile from './assets/images/eu_photo.png'
import { AppProvider, useApp } from './context/AppContext'

// Tema de cores
const getTheme = (theme: 'light' | 'dark') => ({
  light: {
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    bgSecondary: '#ffffff',
    bgCard: 'rgba(255, 255, 255, 0.95)',
    text: '#1f2937',
    textSecondary: '#6b7280',
    textWhite: '#ffffff',
    border: 'rgba(31, 41, 55, 0.1)',
    shadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  dark: {
    bg: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
    bgSecondary: '#1f2937',
    bgCard: 'rgba(31, 41, 55, 0.95)',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    textWhite: '#ffffff',
    border: 'rgba(249, 250, 251, 0.1)',
    shadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
  }
}[theme])

// Header Component
function Header() {
  const { theme, language, toggleTheme, toggleLanguage, t } = useApp()
  const [, setIsMenuOpen] = useState(false)
  const colors = getTheme(theme)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <header style={{
      padding: '1rem 2rem',
      background: theme === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(31,41,55,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${colors.border}`,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      color: colors.text
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img 
            src="/logo.svg" 
            alt="Jr San Logo" 
            style={{ 
              height: '50px', 
              width: 'auto'
            }} 
          />
        </div>

        {/* Desktop Navigation */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: window.innerWidth > 768 ? 'flex' : 'none', gap: '2rem' }}>
            <button onClick={() => scrollToSection('home')} style={{ background: 'none', border: 'none', color: colors.text, cursor: 'pointer', fontSize: '1rem' }}>
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection('portfolio')} style={{ background: 'none', border: 'none', color: colors.text, cursor: 'pointer', fontSize: '1rem' }}>
              {t('nav.portfolio')}
            </button>
            <button onClick={() => scrollToSection('about')} style={{ background: 'none', border: 'none', color: colors.text, cursor: 'pointer', fontSize: '1rem' }}>
              {t('nav.about')}
            </button>
            <button onClick={() => scrollToSection('skills')} style={{ background: 'none', border: 'none', color: colors.text, cursor: 'pointer', fontSize: '1rem' }}>
              {t('nav.skills')}
            </button>
            <button onClick={() => scrollToSection('services')} style={{ background: 'none', border: 'none', color: colors.text, cursor: 'pointer', fontSize: '1rem' }}>
              {t('nav.services')}
            </button>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={toggleTheme}
              style={{ 
                background: 'none', 
                border: `2px solid ${colors.border}`, 
                borderRadius: '6px', 
                padding: '0.5rem', 
                cursor: 'pointer',
                color: colors.text,
                fontSize: '1.2rem'
              }}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button 
              onClick={toggleLanguage}
              style={{ 
                background: 'linear-gradient(135deg, #667eea, #764ba2)', 
                border: 'none', 
                borderRadius: '6px', 
                padding: '0.5rem 1rem', 
                cursor: 'pointer',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              {language === 'pt' ? 'EN' : 'PT'}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

// Hero Component
function Hero() {
  const { t } = useApp()

  return (
    <section 
      id="home" 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.1)',
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
      }} />

      <div style={{ maxWidth: '800px', position: 'relative', zIndex: 2 }}>
        {/* Profile Image */}
        <div style={{
          width: '140px',
          height: '140px',
          margin: '0 auto 2rem',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '4px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}>
          <img 
            src={heroProfile} 
            alt="Profile Photo" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        <p style={{
          fontSize: '0.9rem',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '1rem',
          opacity: 0.9
        }}>
          {t('hero.greeting')}
        </p>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: '1.1',
          background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {t('hero.title')}
        </h1>

        <p style={{
          fontSize: '1.4rem',
          marginBottom: '1rem',
          opacity: 0.95,
          fontWeight: '500'
        }}>
          {t('hero.subtitle')}
        </p>

        <p style={{
          fontSize: '1.1rem',
          marginBottom: '3rem',
          opacity: 0.85,
          lineHeight: '1.7',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          {t('hero.description')}
        </p>

        <button 
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'white',
            color: '#1f2937',
            padding: '1rem 2.5rem',
            borderRadius: '12px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            transform: 'translateY(0)'
          }} 
          onMouseOver={(e) => {
            const target = e.target as HTMLElement
            target.style.transform = 'translateY(-3px)'
            target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)'
          }}
          onMouseOut={(e) => {
            const target = e.target as HTMLElement
            target.style.transform = 'translateY(0)'
            target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'
          }}
        >
          {t('hero.cta')}
        </button>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite'
        }}>
          <div style={{
            width: '2px',
            height: '30px',
            background: 'white',
            opacity: 0.6,
            borderRadius: '1px'
          }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
            40% { transform: translateX(-50%) translateY(-10px); }
            60% { transform: translateX(-50%) translateY(-5px); }
          }
        `
      }} />
    </section>
  )
}

// Portfolio Component
function Portfolio() {
  const { theme, t } = useApp()
  const colors = getTheme(theme)
  const [currentProject, setCurrentProject] = useState(0)

  const projects = [
    { 
      title: t('portfolio.project1.title'), 
      description: t('portfolio.project1.description'),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      tech: ['Flutter', 'Firebase', 'Stripe']
    },
    { 
      title: t('portfolio.project2.title'), 
      description: t('portfolio.project2.description'),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      tech: ['Figma', 'React', 'Storybook']
    },
    { 
      title: t('portfolio.project3.title'), 
      description: t('portfolio.project3.description'),
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      tech: ['React', 'TypeScript', 'Tailwind']
    },
    { 
      title: t('portfolio.project4.title'), 
      description: t('portfolio.project4.description'),
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      tech: ['React', 'Chart.js', 'Node.js']
    }
  ]

  return (
    <section id="portfolio" style={{
      padding: '6rem 2rem',
      background: colors.bgSecondary,
      color: colors.text
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '3rem', 
          marginBottom: '4rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {t('portfolio.title')}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {projects.map((project, index) => (
            <div key={index} style={{
              background: colors.bgCard,
              borderRadius: '16px',
              padding: '2rem',
              border: `1px solid ${colors.border}`,
              boxShadow: colors.shadow,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)'
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget as HTMLElement
              target.style.transform = 'translateY(-5px)'
              target.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)'
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget as HTMLElement
              target.style.transform = 'translateY(0)'
              target.style.boxShadow = colors.shadow
            }}
            onClick={() => setCurrentProject(index)}
            >
              <div style={{
                width: '100%',
                height: '200px',
                background: project.gradient,
                borderRadius: '12px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                {project.title}
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: colors.text }}>
                {project.title}
              </h3>
              <p style={{ opacity: 0.8, marginBottom: '1rem', color: colors.textSecondary }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {project.tech.map((tech, i) => (
                  <span key={i} style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Project indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentProject ? 'linear-gradient(135deg, #667eea, #764ba2)' : colors.border,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// About Component
function About() {
  const { theme, t } = useApp()
  const colors = getTheme(theme)

  return (
    <section id="about" style={{
      padding: '6rem 2rem',
      background: theme === 'light' ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: colors.text
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '3rem', 
          marginBottom: '4rem', 
          fontWeight: 'bold',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {t('about.title')}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '300px 1fr' : '1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Avatar */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '250px',
              height: '250px',
              margin: '0 auto',
              borderRadius: '50%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '5px solid rgba(255,255,255,0.1)',
              overflow: 'hidden'
            }}>
                  <img 
                    src={heroProfile} 
                alt="About Photo" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            <p style={{ 
              marginBottom: '1.5rem', 
              textAlign: 'justify',
              color: colors.text
            }}>
              {t('about.text1')}
            </p>
            <p style={{ 
              marginBottom: '1.5rem', 
              textAlign: 'justify',
              color: colors.text
            }}>
              {t('about.text2')}
            </p>
            <p style={{ 
              textAlign: 'justify',
              color: colors.text
            }}>
              {t('about.text3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Skills Component
function Skills() {
  const { theme, t } = useApp()
  const colors = getTheme(theme)

  const skills = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'React Native', icon: '📱', color: '#61DAFB' },
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'Flutter', icon: '/icons/flutter.svg', color: '#02569B' },
    { name: 'JavaScript', icon: '/icons/javascript.svg', color: '#F7DF1E' },
    { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178C6' },
    { name: 'HTML5', icon: '/icons/html5.svg', color: '#E34F26' },
    { name: 'CSS3', icon: '/icons/css3.png', color: '#1572B6' },
    { name: 'VS Code', icon: '/icons/vscode.svg', color: '#007ACC' },
    { name: 'GitHub', icon: '/icons/github.svg', color: '#181717' },
    { name: 'GitLab', icon: '/icons/gitlab.svg', color: '#FC6D26' },
    { name: 'Illustrator', icon: '/icons/illustrator.svg', color: '#FF9A00' },
    { name: 'Photoshop', icon: '/icons/photoshop.png', color: '#31A8FF' },
    { name: 'Lightroom', icon: '/icons/lightroom.svg', color: '#31A8FF' },
    { name: 'Android', icon: '/icons/android.svg', color: '#3DDC84' },
    { name: 'Apple', icon: '/icons/apple.svg', color: '#000000' }
  ]

  return (
    <section id="skills" style={{
      padding: '6rem 2rem',
      background: colors.bgSecondary,
      color: colors.text,
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '3rem', 
          marginBottom: '4rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {t('skills.title')}
        </h2>

        {/* Skills Strip */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          animation: 'scroll 25s linear infinite',
          width: 'fit-content'
        }}>
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} style={{
              background: colors.bgCard,
              borderRadius: '16px',
              padding: '2rem',
              minWidth: '180px',
              border: `1px solid ${colors.border}`,
              boxShadow: colors.shadow,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)'
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget as HTMLElement
              target.style.transform = 'translateY(-5px) scale(1.05)'
              target.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)'
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget as HTMLElement
              target.style.transform = 'translateY(0) scale(1)'
              target.style.boxShadow = colors.shadow
            }}
            >
              <div style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60px'
              }}>
                <img 
                  src={skill.icon} 
                  alt={skill.name}
                  style={{
                    maxWidth: '50px',
                    maxHeight: '50px',
                    width: 'auto',
                    height: 'auto',
                    filter: theme === 'dark' && skill.name === 'GitHub' ? 'brightness(0) invert(1)' : 'none'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: skill.color,
                textShadow: theme === 'dark' ? '0 0 10px rgba(255,255,255,0.3)' : 'none'
              }}>
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `
      }} />
    </section>
  )
}

// Services Component
function Services() {
  const { theme, t } = useApp()
  const colors = getTheme(theme)

  const services = [
    {
      title: t('services.web.title'),
      description: t('services.web.description'),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '💻'
    },
    {
      title: t('services.design.title'),
      description: t('services.design.description'),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🎨'
    },
    {
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      icon: '📱'
    }
  ]

  return (
    <section id="services" style={{
      padding: '6rem 2rem',
      background: theme === 'light' ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: colors.text
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '3rem', 
          marginBottom: '4rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {t('services.title')}
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: colors.bgCard,
              borderRadius: '20px',
              padding: '3rem 2rem',
              border: `1px solid ${colors.border}`,
              boxShadow: colors.shadow,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              const target = e.currentTarget as HTMLElement
              target.style.transform = 'translateY(-10px)'
              target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)'
            }}
            onMouseOut={(e) => {
              const target = e.currentTarget as HTMLElement
              target.style.transform = 'translateY(0)'
              target.style.boxShadow = colors.shadow
            }}
            >
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: service.gradient
              }} />

              <div style={{
                fontSize: '4rem',
                marginBottom: '1.5rem'
              }}>
                {service.icon}
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                background: service.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {service.title}
              </h3>

              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: colors.textSecondary
              }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Component
function CTA() {
  const { t } = useApp()

  const handleContact = () => {
    // Simula ação de contato
    alert('Em breve: formulário de contato ou link para WhatsApp/Email!')
  }

  return (
    <section style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Logo/Avatar */}
        <div style={{
          width: '100px',
          height: '100px',
          margin: '0 auto 2rem',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
          border: '2px solid rgba(255,255,255,0.3)'
        }}>
          🚀
        </div>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          {t('cta.title')}
        </h2>

        <p style={{
          fontSize: '1.3rem',
          marginBottom: '3rem',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          {t('cta.description')}
        </p>

        <button 
          onClick={handleContact}
          style={{
            background: 'white',
            color: '#1f2937',
            padding: '1.2rem 3rem',
            borderRadius: '16px',
            border: 'none',
            fontSize: '1.2rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            transform: 'translateY(0)'
          }}
          onMouseOver={(e) => {
            const target = e.target as HTMLElement
            target.style.transform = 'translateY(-3px) scale(1.05)'
            target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)'
          }}
          onMouseOut={(e) => {
            const target = e.target as HTMLElement
            target.style.transform = 'translateY(0) scale(1)'
            target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)'
          }}
        >
          {t('cta.button')} ✨
        </button>

        {/* Contact Info */}
        <div style={{
          marginTop: '4rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: '📧', label: 'Email', value: 'contato@portfolio.com' },
            { icon: '📱', label: 'WhatsApp', value: '+55 11 99999-9999' },
            { icon: '📍', label: 'Local', value: 'São Paulo, SP' }
          ].map((contact, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              opacity: 0.8
            }}>
              <span style={{ fontSize: '1.5rem' }}>{contact.icon}</span>
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{contact.label}</div>
                <div style={{ fontWeight: '500' }}>{contact.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const { theme, t } = useApp()
  const colors = getTheme(theme)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { name: 'GitHub', icon: '🐱', url: 'https://github.com' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'Behance', icon: '🎨', url: 'https://behance.net' },
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com' }
  ]

  return (
    <footer style={{
      background: colors.bgSecondary,
      color: colors.text,
      padding: '3rem 2rem 1rem',
      borderTop: `1px solid ${colors.border}`
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr 1fr' : '1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <img 
                src="/logo.svg" 
                alt="Jr San Logo" 
                style={{ 
                  height: '40px', 
                  width: 'auto'
                }} 
              />
            </div>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: colors.textSecondary,
              marginBottom: '1.5rem'
            }}>
              Desenvolvedor Flutter & Designer apaixonado por criar experiências digitais incríveis.
            </p>
            
            {/* Social Links */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '45px',
                    height: '45px',
                    background: colors.bgCard,
                    borderRadius: '12px',
                    border: `1px solid ${colors.border}`,
                    textDecoration: 'none',
                    fontSize: '1.5rem',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)'
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(-3px)'
                    target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)'
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(0)'
                    target.style.background = colors.bgCard
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: colors.text
            }}>
              Links Rápidos
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                { name: t('nav.home'), id: 'home' },
                { name: t('nav.portfolio'), id: 'portfolio' },
                { name: t('nav.about'), id: 'about' },
                { name: t('nav.skills'), id: 'skills' },
                { name: t('nav.services'), id: 'services' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.75rem' }}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: colors.textSecondary,
                      cursor: 'pointer',
                      fontSize: '1rem',
                      textAlign: 'left',
                      padding: 0,
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      const target = e.target as HTMLElement
                      target.style.color = colors.text
                    }}
                    onMouseOut={(e) => {
                      const target = e.target as HTMLElement
                      target.style.color = colors.textSecondary
                    }}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              color: colors.text
            }}>
              Contato
            </h3>
            <div style={{ color: colors.textSecondary, lineHeight: '1.8' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                📧 contato@portfolio.com
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                📱 +55 11 99999-9999
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                📍 São Paulo, SP - Brasil
              </p>
              
              <button
                onClick={scrollToTop}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)'
                }}
                onMouseOver={(e) => {
                  const target = e.target as HTMLElement
                  target.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  const target = e.target as HTMLElement
                  target.style.transform = 'translateY(0)'
                }}
              >
                ↑ {t('footer.scrollTop')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: `1px solid ${colors.border}`,
          textAlign: 'center',
          color: colors.textSecondary,
          fontSize: '0.9rem'
        }}>
          <p>
            © {new Date().getFullYear()} Jr San - Creative Development. {t('footer.rights')}.
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
            Feito com ❤️ usando React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function AppContent() {
  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
      <Header />
      <Hero />
      <Portfolio />
      <About />
      <Skills />
      <Services />
      <CTA />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
