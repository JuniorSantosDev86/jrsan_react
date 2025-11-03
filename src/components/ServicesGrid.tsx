import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../features/i18n/i18n'
import { Code, Megaphone, PenTool, Smartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useContactModal } from '../context/ContactModalContext'
import { trackEvent } from '../analytics/events'

const SERVICES = [
  {
    id: 'webDevelopment',
    icon: Code,
    gradient: 'service-web',
  },
  {
    id: 'uiuxDesign',
    icon: PenTool,
    gradient: 'service-design',
  },
  {
    id: 'mobileApps',
    icon: Smartphone,
    gradient: 'service-mobile',
  },
  {
    id: 'marketingDigital',
    icon: Megaphone,
    gradient: 'service-marketing',
  },
] as const

type Service = (typeof SERVICES)[number]
type ServiceId = Service['id']

const SERVICE_ROUTES: Record<ServiceId, string> = {
  webDevelopment: '/services/web-development',
  uiuxDesign: '/services/ui-ux-design',
  mobileApps: '/services/mobile-apps',
  marketingDigital: '/services/digital-marketing',
}

type ServiceContent = {
  title: string
  description: string
  tags?: string[]
}

const TRANSLATION_OPTIONS = { returnObjects: true } as const

const sanitizeServiceTags = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined
  }

  const filtered = value.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)

  return filtered.length > 0 ? filtered : undefined
}

const getServiceContent = (raw: unknown): ServiceContent => {
  if (typeof raw === 'string') {
    return {
      title: raw,
      description: raw,
      tags: undefined
    }
  }

  if (!raw || typeof raw !== 'object') {
    return {
      title: '',
      description: '',
      tags: undefined
    }
  }

  const { title, description, tags } = raw as Partial<ServiceContent>

  return {
    title: typeof title === 'string' ? title : typeof description === 'string' ? description : '',
    description: typeof description === 'string' ? description : typeof title === 'string' ? title : '',
    tags: sanitizeServiceTags(tags)
  }
}

function ServicesGrid() {
  const { t } = useTranslation()
  const { openContactModal } = useContactModal()
  const navigate = useNavigate()

  const handleServiceAction = (serviceId: ServiceId) => {
    trackEvent('cta_click', { cta: `service_${serviceId}`, location: 'services_grid' })
    const route = SERVICE_ROUTES[serviceId]

    if (route) {
      navigate(route)
      return
    }

    openContactModal()
  }

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background/90" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/15 blur-3xl animate-pulse-slow" />

      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center">
            <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-emerald-400/35 bg-emerald-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 shadow-[0_12px_30px_rgba(16,185,129,0.25)] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {t('services.title')}
            </span>
          </div>
          <h2 className="sr-only">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto md:grid-cols-2 xl:max-w-7xl xl:grid-cols-4">
          {SERVICES.map((service, index) => {
            const serviceData = getServiceContent(t(`services.${service.id}`, TRANSLATION_OPTIONS))
            const IconComponent: LucideIcon = service.icon

            return (
              <div
                key={service.id}
                className={`${service.gradient} group animate-fade-up relative overflow-hidden rounded-3xl p-8 text-white shadow-[0_24px_60px_rgba(8,8,22,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_32px_80px_rgba(124,58,237,0.35)]`}
                style={{ minHeight: '340px', animationDelay: `${index * 140}ms` }}
                onClick={() => handleServiceAction(service.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-transparent transition-opacity duration-500 group-hover:bg-black/15" />
                <div className="absolute -top-20 right-0 h-36 w-36 rounded-full bg-white/15 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-80" />
                <div className="absolute -bottom-24 left-0 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-transform duration-500 group-hover:scale-110" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/25">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
                        {t('services.title')}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold leading-snug tracking-tight">
                    {serviceData.title}
                  </h3>

                  <p className="mt-4 flex-grow text-white/80 leading-relaxed">
                    {serviceData.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {serviceData.tags?.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center rounded-full bg-white/18 px-3 py-1 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/28"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      handleServiceAction(service.id)
                    }}
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white/20 px-6 py-2 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/30 group-hover:translate-x-1"
                  >
                    <span>{t('services.learnMore')}</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/0 transition-all duration-500 group-hover:border-white/15" />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('services.bottomMessage')}
          </p>
          <button
            onClick={openContactModal}
            className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-[0_20px_45px_rgba(124,58,237,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_55px_rgba(124,58,237,0.4)]"
          >
            {t('services.bottomCta')}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ServicesGrid
