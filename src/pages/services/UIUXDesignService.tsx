import { ArrowLeft, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SiFigma, SiAdobeillustrator, SiReact, SiFramer } from 'react-icons/si'
import { TbHierarchy3 } from 'react-icons/tb'
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

type UIUXDesignContent = {
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
  quote: {
    title: string
    description: string
  }
  toolkit: {
    title: string
    description: string
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
  { name: 'Figma', icon: SiFigma, color: '#A259FF' },
  { name: 'Adobe Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'UI Systems', icon: TbHierarchy3, color: '#38E4AE' },
] as const

function UIUXDesignService() {
  const { t } = useTranslation()
  const content = t('servicesDetails.uiuxDesign', TRANSLATION_OPTIONS) as UIUXDesignContent
  const description = content.seo.description
  const pagePath = '/services/ui-ux-design'

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
            serviceType: 'UI/UX Design',
          }),
        ]}
      />

      <div className="min-h-screen bg-[#09051B] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B0722]/85 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            <Sparkles className="h-4 w-4 text-primary" />
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
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
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

            <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_35px_55px_rgba(3,7,18,0.55)] backdrop-blur-lg">
              <h2 className="text-xl font-semibold text-white">{content.highlights.title}</h2>
              <ul className="space-y-3 text-slate-300">
                {highlightItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/20 via-primary/10 to-transparent p-6 shadow-[0_25px_45px_rgba(86,40,186,0.35)] backdrop-blur-lg">
              <h2 className="text-xl font-semibold text-white">{content.quote.title}</h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                {content.quote.description}
              </p>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <h2 className="text-lg font-semibold text-white">{content.toolkit.title}</h2>
              <p className="mt-3 text-sm text-slate-300">
                {content.toolkit.description}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {TOOLKIT.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <div
                      key={tool.name}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 shadow-[0_18px_30px_rgba(3,7,18,0.45)]"
                    >
                      <Icon className="text-base" style={{ color: tool.color }} />
                      {tool.name}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <h2 className="text-lg font-semibold text-white">{content.process.title}</h2>
              <div className="mt-5 space-y-4">
                {processSteps.map((stage) => (
                  <div
                    key={stage.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_30px_rgba(3,7,18,0.4)]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                      {stage.step}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-white">{stage.title}</h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">{stage.description}</p>
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
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white/80 transition-all hover:border-white/40 hover:bg-white/15 hover:text-white"
          >
            {content.closing.cta}
          </Link>
        </section>
      </main>
      </div>
    </>
  )
}

export default UIUXDesignService
