import clsx from 'clsx'
import { useState, useEffect, useMemo } from 'react'
import type { CSSProperties } from 'react'
import { Menu, X } from 'lucide-react'
import { RiMoonClearLine, RiSunLine } from 'react-icons/ri'
import { useTheme } from '../features/theme/ThemeProvider'
import { useTranslation } from '../features/i18n/i18n'
import { useContactModal } from '../context/ContactModalContext'
import logoSvg from '../assets/images/logo.svg?raw'
import { trackEvent } from '../analytics/events'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, toggleTheme } = useTheme()
  const { t, language, changeLanguage } = useTranslation()
  const { openContactModal } = useContactModal()
  const isDark = theme === 'dark'

  const navigationItems = useMemo(
    () => [
      { key: 'home', href: '#home' },
      { key: 'portfolio', href: '#portfolio' },
      { key: 'services', href: '#services' },
      { key: 'about', href: '#about' },
      { key: 'contact', href: '#contact' },
    ],
    []
  )
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY
          const viewportHeight = window.innerHeight
          setIsScrolled(currentScroll > 10)
          const progress = Math.min(currentScroll / (viewportHeight * 0.75), 1)
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) {
              setActiveSection(id)
            }
          }
        })
      },
      { threshold: 0.55 }
    )

    const sections = navigationItems
      .map((item) => {
        const element = document.querySelector(item.href) as HTMLElement | null
        if (!element || item.key === 'contact') return null
        return element
      })
      .filter((element): element is HTMLElement => Boolean(element))

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [navigationItems])

  const handleLanguageSelect = (code: 'pt' | 'en') => {
    if (code !== language) {
      changeLanguage(code)
    }
  }

  const handleLanguageToggle = () => {
    const nextLanguage = language === 'pt' ? 'en' : 'pt'
    handleLanguageSelect(nextLanguage)
  }

  const languageLabel = language.toUpperCase()

  const scrollToSection = (href: string) => {
    if (href === '#contact') {
      trackEvent('cta_click', { cta: 'header_contact_modal', location: 'header' })
      openContactModal()
      setIsMenuOpen(false)
      setActiveSection('contact')
      return
    }

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      const id = element.getAttribute('id')
      if (id) {
        setActiveSection(id)
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header 
      className={clsx(
        'sticky top-0 left-0 right-0 z-50 w-full header-glass transition-all duration-500 ease-out',
        isScrolled ? 'header-glass-scrolled translate-y-0 shadow-lg' : 'shadow-none'
      )}
      style={{
        '--header-progress': scrollProgress,
        backdropFilter: `blur(${12 + scrollProgress * 8}px)`,
        WebkitBackdropFilter: `blur(${12 + scrollProgress * 8}px)`,
      } as CSSProperties}
    >
      <span
        className="pointer-events-none absolute left-0 top-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary transition-all duration-300 ease-out"
        style={{
          width: `${Math.min(Math.max(scrollProgress, 0), 1) * 100}%`,
          opacity: scrollProgress > 0.05 ? 1 : 0,
        }}
      />

      <div
        className={clsx(
          'container transition-all duration-500 ease-out',
          isScrolled ? 'py-3' : 'py-5 md:py-6'
        )}
      >
        <nav
          className={clsx(
            'flex items-center justify-between gap-4 transition-all duration-500 ease-out rounded-2xl border backdrop-blur-2xl',
            isScrolled
              ? isDark
                ? 'px-5 py-3 md:px-6 md:py-3 border-white/10 bg-white/5 shadow-[0_18px_45px_rgba(3,7,18,0.45)]'
                : 'px-5 py-3 md:px-6 md:py-3 border-border/60 bg-background/85 shadow-[0_18px_35px_rgba(15,23,42,0.16)]'
              : isDark
                ? 'px-6 py-4 md:px-8 md:py-5 border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(3,7,18,0.35)]'
                : 'px-6 py-4 md:px-8 md:py-5 border-border/60 bg-background/80 shadow-[0_24px_60px_rgba(15,23,42,0.12)]'
          )}
        >
          {/* Logo */}
          <button
            type="button"
            className={clsx(
              'inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-500',
              isScrolled ? 'scale-95' : 'scale-105'
            )}
            onClick={() => scrollToSection('#home')}
              aria-label="Voltar ao início"
            >
              <span
                role="img"
                aria-label="JrSan logo"
                className={clsx(
                  'logo-inline block transition-all duration-500 drop-shadow-[0_12px_25px_rgba(124,58,237,0.35)]',
                  isScrolled ? 'h-7' : 'h-9'
                )}
                dangerouslySetInnerHTML={{ __html: logoSvg }}
              />
          </button>

          {/* Desktop Navigation */}
          <div className={clsx(
            'hidden md:flex items-center transition-all duration-500',
            isScrolled ? 'space-x-6' : 'space-x-8'
          )}>
            {navigationItems.map((item) => {
              const isActive = activeSection === item.key

              return (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={clsx(
                    'relative inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                    isActive
                      ? 'bg-gradient-to-r from-primary/80 via-purple-500/80 to-primary/80 text-white shadow-[0_10px_25px_rgba(124,58,237,0.45)]'
                      : isDark
                        ? 'text-white/70 hover:text-white hover:bg-white/10'
                        : 'text-foreground/70 hover:text-foreground hover:bg-muted/60'
                  )}
                >
                  <span className="relative z-10">{t(`navigation.${item.key}` as any)}</span>
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border border-white/20 opacity-70" aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={handleLanguageToggle}
              className={clsx(
                'inline-flex h-10 w-10 items-center justify-center rounded-full border text-[0.7rem] font-black uppercase tracking-[0.2em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isDark
                  ? 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10 focus-visible:ring-offset-0'
                  : 'border-border/60 bg-white text-foreground/70 hover:text-foreground focus-visible:ring-offset-background'
              )}
              aria-label={t('accessibility.toggleLanguage' as any)}
            >
              {languageLabel}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={clsx(
                'inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isDark
                  ? 'border-white/15 bg-white/10 text-white/80 shadow-[0_14px_30px_rgba(8,16,28,0.35)] hover:bg-white/15 hover:text-white focus-visible:ring-offset-0'
                  : 'border-border/60 bg-gradient-to-br from-white to-background text-foreground/70 shadow-[0_14px_30px_rgba(15,23,42,0.12)] hover:text-foreground hover:from-white hover:to-background/90 focus-visible:ring-offset-background'
              )}
              aria-label={t('accessibility.toggleTheme' as any)}
            >
              {theme === 'dark' ? (
                <RiSunLine className="h-5 w-5" />
              ) : (
                <RiMoonClearLine className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className={clsx(
                'md:hidden p-2.5 rounded-xl border transition-all duration-200',
                isDark
                  ? 'border-white/10 text-white/80 hover:bg-white/10'
                  : 'border-border/60 text-foreground hover:bg-muted/70'
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('accessibility.closeMenu' as any) : t('accessibility.openMenu' as any)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={clsx(
              'md:hidden mt-4 rounded-2xl border px-4 py-4 backdrop-blur-xl shadow-[0_20px_40px_rgba(15,23,42,0.32)]',
              isDark ? 'border-white/10 bg-white/10' : 'border-border/60 bg-background/90'
            )}
          >
            <div className="grid gap-2">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.key

                return (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className={clsx(
                      'w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-primary/80 via-purple-500/75 to-primary/80 text-white shadow-[0_12px_25px_rgba(124,58,237,0.35)]'
                        : isDark
                          ? 'text-white/80 hover:bg-white/10'
                          : 'text-foreground/80 hover:bg-muted'
                    )}
                  >
                    {t(`navigation.${item.key}` as any)}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

