import { Mail, Github, ArrowRight } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import { useTranslation } from '../features/i18n/i18n'
import logoGif from '../assets/images/logo_1.gif'
import { useContactModal } from '../context/ContactModalContext'
import { trackEvent } from '../analytics/events'

const contactItems = [
  {
    label: 'Email',
    value: 'juniorsantos.dev86@gmail.com',
    icon: Mail,
    href: 'mailto:juniorsantos.dev86@gmail.com',
  },
  {
    label: 'GitHub',
    value: '@JuniorSantosDev86',
    icon: Github,
    href: 'https://github.com/JuniorSantosDev86',
  },
]

function CTAFooter() {
  const { t } = useTranslation()
  const { openContactModal } = useContactModal()

  return (
    <section className="cta-bg text-white py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Logo/Icon */}
          <div className="w-40 h-40 mx-auto rounded-full bg-transparent flex items-center justify-center overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
            <img
              src={logoGif}
              alt="Logotipo animado JrSan"
              className="h-32 w-32 object-contain"
              loading="lazy"
              decoding="async"
              width={128}
              height={128}
            />
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                trackEvent('cta_click', { cta: 'footer_contact_modal', location: 'cta_footer' })
                openContactModal()
              }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Mail className="h-5 w-5" />
              <span>{t('cta.button')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <a
              href="https://wa.me/5541998624167"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
              onClick={() =>
                trackEvent('outbound_click', {
                  url: 'https://wa.me/5541998624167',
                  location: 'cta_footer',
                })
              }
            >
              <SiWhatsapp className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Contact Methods */}
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60 mb-4">
              {t('cta.directChannels')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
                    onClick={() =>
                      trackEvent('outbound_click', { url: item.href, location: 'cta_footer' })
                    }
                  >
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-white/90" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</p>
                    <p className="mt-1 font-semibold text-white/90 break-all">{item.value}</p>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTAFooter

