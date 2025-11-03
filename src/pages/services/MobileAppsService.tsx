import { ArrowLeft, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  SiFlutter,
  SiDart,
  SiReact,
  SiFigma,
  SiFirebase,
} from 'react-icons/si'
import { useTranslation } from '../../features/i18n/i18n'
import Meta from '../../seo/Meta'
import { buildServiceSchema } from '../../seo/structuredData'
import { siteMetadata } from '../../config/siteMetadata'

const TRANSLATION_OPTIONS = { returnObjects: true } as const

type ProcessStage = {
  step: string
  title: string
  description: string
}

type MobileAppsContent = {
  seo: {
    title: string
    description: string
  }
  labels: {
    serviceName: string
    backToServices: string
  }
  hero: {
    tag: string
    title: string
    paragraphs: string[]
  }
  highlights: {
    title: string
    items: string[]
  }
  stack: {
    title: string
  }
  process: {
    title: string
    steps: ProcessStage[]
  }
  closing: {
    highlight: string
    message: string
    cta: string
  }
}

const TOOLKIT = [
  { name: 'Flutter', icon: SiFlutter, color: '#46D1FD' },
  { name: 'Dart', icon: SiDart, color: '#0175C2' },
  { name: 'React Native', icon: SiReact, color: '#61DAFB' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Figma', icon: SiFigma, color: '#A259FF' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
] as const

function MobileAppsService() {
  const { t } = useTranslation()
  const content = t('servicesDetails.mobileApps', TRANSLATION_OPTIONS) as MobileAppsContent
  const description = content.seo.description
  const pagePath = '/services/mobile-apps'

  const heroParagraphs = content.hero?.paragraphs ?? []
  const highlightItems = content.highlights?.items ?? []
  const processSteps = content.process?.steps ?? []

  return (
    <>
      <Meta
        title={content.seo.title}
        description={description}
        path={pagePath}
        type="article"
        structuredData={[
          buildServiceSchema({
            name: content.hero.title,
            description,
            url: `${siteMetadata.siteUrl}${pagePath}`,
            serviceType: 'Mobile App Development',
          }),
        ]}
      />

      <div className="min-h-screen bg-[#061411] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071814]/85 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
            <Smartphone className="h-4 w-4 text-emerald-400" />
            <span>{content.labels.serviceName}</span>
          </div>

          <Link
            to="/#services"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/75 transition-all hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{content.labels.backToServices}</span>
          </Link>
        </div>
      </header>

      <main id="main-content" className="container space-y-20 py-16">
        <section className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/40 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-100">
                {content.hero.tag}
              </span>
              <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                {content.hero.title}
              </h1>
              {heroParagraphs.map((paragraph, index) => (
                <p key={index} className="text-base text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-4 rounded-2xl border border-emerald-300/10 bg-emerald-400/10 p-6 shadow-[0_35px_55px_rgba(7,35,31,0.55)] backdrop-blur-lg">
              <h2 className="text-xl font-semibold text-white">{content.highlights.title}</h2>
              <ul className="space-y-3 text-slate-200">
                {highlightItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-emerald-300/10 bg-emerald-500/10 p-6 backdrop-blur-lg">
              <h2 className="text-lg font-semibold text-white">{content.stack.title}</h2>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {TOOLKIT.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <div
                      key={tool.name}
                      className="flex items-center gap-3 rounded-xl border border-emerald-300/20 bg-black/10 px-4 py-3 text-sm font-medium text-white/85 shadow-[0_18px_30px_rgba(7,35,31,0.45)]"
                    >
                      <Icon className="text-base" style={{ color: tool.color }} />
                      {tool.name}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-300/10 bg-black/20 p-6 backdrop-blur-lg">
              <h2 className="text-lg font-semibold text-white">{content.process.title}</h2>
              <div className="mt-5 space-y-4">
                {processSteps.map((stage) => (
                  <div
                    key={stage.title}
                    className="rounded-xl border border-emerald-300/10 bg-black/20 p-4 shadow-[0_18px_30px_rgba(7,35,31,0.45)]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                      {stage.step}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-white">{stage.title}</h3>
                    <p className="mt-2 text-xs text-slate-200 leading-relaxed">{stage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-4xl space-y-6 text-center">
          <p className="text-xl font-semibold text-white">
            {content.closing.highlight}
          </p>
          <p className="text-base text-slate-300">
            {content.closing.message}
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-50 transition-all hover:border-emerald-200 hover:bg-emerald-400/20"
          >
            {content.closing.cta}
          </Link>
        </section>
      </main>
      </div>
    </>
  )
}

export default MobileAppsService
