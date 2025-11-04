import { useTranslation } from '../features/i18n/i18n'
import { Github, Linkedin, Mail, Heart, Instagram } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { trackEvent } from '../analytics/events'

type SocialLink = {
  name: string
  href: string
  Icon: LucideIcon
}

type ContactDetail = {
  icon: string
  text: string
}

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/JuniorSantosDev86',
    Icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/junior-santos',
    Icon: Linkedin,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/juniorsantos.dev',
    Icon: Instagram,
  },
  {
    name: 'Email',
    href: 'mailto:juniorsantos.dev86@gmail.com',
    Icon: Mail,
  },
] as const

const CONTACT_DETAILS: readonly ContactDetail[] = [
  { icon: '\uD83D\uDCE7', text: 'juniorsantos.dev86@gmail.com' },
  { icon: '\uD83D\uDCCD', text: 'Curitiba, PR' },
  { icon: '\uD83C\uDF10', text: 'Portfolio 2025' },
] as const

function SiteFooter() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <span className="text-2xl font-bold gradient-text-primary">JrSan</span>
              </div>
              <p className="mb-6 max-w-md text-muted-foreground">
                {t('footer.description')}
              </p>

              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((link) => {
                  const IconComponent = link.Icon
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-all duration-300 hover:scale-110 hover:bg-muted/80 hover:shadow-lg"
                      aria-label={link.name}
                      onClick={() => trackEvent('outbound_click', { url: link.href, location: 'site_footer' })}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-semibold">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                {[{ key: 'home', href: '#home' }, { key: 'portfolio', href: '#portfolio' }, { key: 'services', href: '#services' }, { key: 'about', href: '#about' }].map((link) => (
                  <li key={link.key}>
                    <button
                      onClick={() => {
                        trackEvent('cta_click', { cta: `footer_${link.key}`, location: 'site_footer' })
                        const element = document.querySelector(link.href)
                        if (element) element.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t(`navigation.${link.key}` as any)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 font-semibold">{t('footer.contactHeading')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {CONTACT_DETAILS.map((detail) => (
                  <li key={detail.text}>
                    {detail.icon} {detail.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6">
          <div className="flex flex-col items-center justify-between space-y-4 text-sm text-muted-foreground md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <span>{t('footer.credits')}</span>
              <span className="font-medium text-foreground">{t('footer.developer')}</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>{`\u00a9 ${currentYear}`}</span>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              <span>{t('footer.madeWith')}</span>
              <div className="flex items-center space-x-2">
                <span className="rounded bg-muted px-2 py-1 text-foreground">React</span>
                <span className="rounded bg-muted px-2 py-1 text-foreground">TypeScript</span>
                <span className="rounded bg-muted px-2 py-1 text-foreground">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Scroll to top"
      >
        <svg className="mx-auto h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  )
}

export default SiteFooter
