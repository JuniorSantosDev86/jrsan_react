import { ArrowLeft, Sparkles, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiFigma,
  SiVite,
  SiGithub,
} from 'react-icons/si'
import { useTranslation } from '../../features/i18n/i18n'
import Meta from '../../seo/Meta'
import { buildServiceSchema } from '../../seo/structuredData'
import { siteMetadata } from '../../config/siteMetadata'

const TRANSLATION_OPTIONS = { returnObjects: true } as const

type DeliverableItem = {
  title: string
  description: string
}

type ProcessStep = {
  title: string
  description: string
}

type WebDevelopmentContent = {
  seo: {
    title: string
    description: string
  }
  labels: {
    serviceName: string
    backToServices: string
    brandName: string
  }
  hero: {
    tag: string
    title: string
    paragraphs: string[]
  }
  deliverables: {
    title: string
    items: DeliverableItem[]
  }
  caseHighlight: {
    title: string
    description: string
  }
  technologies: {
    title: string
    description: string
  }
  results: {
    title: string
    items: string[]
  }
  process: {
    title: string
    steps: ProcessStep[]
  }
  closing: {
    highlight: string
    message: string
    cta: string
  }
}

const TECHNOLOGIES = [
  { name: 'React JS', icon: SiReact, color: '#61DAFB' },
  { name: 'JavaScript (ES6+)', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Figma', icon: SiFigma, color: '#A259FF' },
  { name: 'Vite', icon: SiVite, color: '#FFC23B' },
  { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
] as const

function WebDevelopmentService() {
  const { t } = useTranslation()
  const content = t('servicesDetails.webDevelopment', TRANSLATION_OPTIONS) as WebDevelopmentContent
  const description = content.seo.description
  const pagePath = '/services/web-development'

  const deliverables = content.deliverables?.items ?? []
  const processSteps = content.process?.steps ?? []
  const heroParagraphs = content.hero?.paragraphs ?? []
  const resultItems = content.results?.items ?? []

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
            serviceType: 'Web Development',
          }),
        ]}
      />

      <div className="min-h-screen bg-[#050517] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06061d]/85 backdrop-blur-xl">
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
        <section className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr,0.8fr]">
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
              <h2 className="text-xl font-semibold text-white">{content.deliverables.title}</h2>
              <ul className="space-y-4 text-slate-300">
                {deliverables.map((item) => (
                  <li key={item.title} className="space-y-1">
                    <p className="text-base font-semibold text-white">{item.title}</p>
                    <p className="text-sm">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent p-6 shadow-[0_25px_45px_rgba(86,40,186,0.35)] backdrop-blur-lg">
              <h2 className="text-xl font-semibold text-white">{content.caseHighlight.title}</h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                {content.caseHighlight.description}
              </p>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <h2 className="text-lg font-semibold text-white">{content.technologies.title}</h2>
              <p className="mt-3 text-sm text-slate-300">
                {content.technologies.description}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {TECHNOLOGIES.map((tech) => {
                  const Icon = tech.icon
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 shadow-[0_18px_30px_rgba(3,7,18,0.45)]"
                    >
                      <Icon className="text-base" style={{ color: tech.color }} />
                      {tech.name}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <h2 className="text-lg font-semibold text-white">{content.results.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {resultItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                <Rocket className="h-4 w-4 text-primary" />
                {content.labels.brandName}
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_45px_90px_rgba(3,7,18,0.55)] backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-white">{content.process.title}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {processSteps.map((stage, index) => (
              <div
                key={`${stage.title}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_40px_rgba(3,7,18,0.45)]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{stage.title}</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>
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

export default WebDevelopmentService
