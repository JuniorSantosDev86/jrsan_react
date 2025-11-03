import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiFigma,
  SiFirebase,
  SiReact,
} from 'react-icons/si'
import { useTranslation } from '../../features/i18n/i18n'
import Meta from '../../seo/Meta'
import { buildCreativeWorkSchema, buildSoftwareApplicationSchema } from '../../seo/structuredData'
import { siteMetadata } from '../../config/siteMetadata'

import zenbodhi1 from '../../assets/images/zenbodhi1.png'
import zenbodhi2 from '../../assets/images/zenbodhi2.png'
import zenbodhi3 from '../../assets/images/zenbodhi3.png'

const gallery = [zenbodhi1, zenbodhi2, zenbodhi3]

const TRANSLATION_OPTIONS = { returnObjects: true } as const

type ParagraphSection = {
  type: 'paragraphs'
  title: string
  paragraphs: string[]
}

type OrderedSectionItem = {
  title: string
  bullets: string[]
}

type OrderedSection = {
  type: 'ordered'
  title: string
  items: OrderedSectionItem[]
}

type BulletedSection = {
  type: 'bulleted'
  title: string
  items: string[]
}

type QuoteSection = {
  type: 'quote'
  text: string
}

type ProjectSection = ParagraphSection | OrderedSection | BulletedSection | QuoteSection

type GalleryContent = {
  title: string
  mobileLabel: string
  mobileAlt: string
}

type ZenBodhiContent = {
  seo: {
    title: string
    description: string
  }
  labels: {
    highlightBadge: string
    backToPortfolio: string
  }
  hero: {
    title: string
    summary: string
  }
  sections: ProjectSection[]
  gallery: GalleryContent
}

const tools = [
  { name: 'React Native', icon: SiReact, color: '#61DAFB' },
  { name: 'Figma', icon: SiFigma, color: '#A259FF' },
  { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
  { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
] as const

const isParagraphSection = (section: ProjectSection): section is ParagraphSection =>
  section.type === 'paragraphs'

const isOrderedSection = (section: ProjectSection): section is OrderedSection =>
  section.type === 'ordered'

const isBulletedSection = (section: ProjectSection): section is BulletedSection =>
  section.type === 'bulleted'

const isQuoteSection = (section: ProjectSection): section is QuoteSection =>
  section.type === 'quote'

function ZenBodhiProject() {
  const { t } = useTranslation()
  const content = t('projectDetails.zenBodhi', TRANSLATION_OPTIONS) as ZenBodhiContent
  const sections = content.sections ?? []
  const description = content.seo.description
  const pagePath = '/projects/zenbodhi'
  const representativeImage = gallery[0] ?? ''

  return (
    <>
      <Meta
        title={content.seo.title}
        description={description}
        path={pagePath}
        type="article"
        structuredData={[
          buildCreativeWorkSchema({
            name: content.hero.title,
            description,
            url: `${siteMetadata.siteUrl}${pagePath}`,
            image: representativeImage,
            keywords: ['React Native', 'Mindfulness App'],
          }),
          buildSoftwareApplicationSchema({
            name: content.hero.title,
            description,
            url: `${siteMetadata.siteUrl}${pagePath}`,
            operatingSystems: ['Android', 'iOS'],
            applicationCategory: 'HealthApplication',
          }),
        ]}
      />

      <div className="min-h-screen bg-[#050512] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06061a]/90 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-2 font-semibold tracking-wide text-sm uppercase text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>{content.labels.highlightBadge}</span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 transition-all hover:border-white/20 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{content.labels.backToPortfolio}</span>
          </Link>
        </div>
      </header>

      <main id="main-content" className="container space-y-20 py-16">
        <section className="mx-auto max-w-4xl space-y-10 text-slate-200">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              {content.hero.title}
            </h1>
            <p className="text-lg text-slate-300">
              {content.hero.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => {
              const Icon = tool.icon
              return (
                <span
                  key={tool.name}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:text-white hover:-translate-y-0.5"
                >
                  <Icon className="text-base" style={{ color: tool.color }} />
                  {tool.name}
                </span>
              )
            })}
          </div>

          <div className="space-y-8 leading-relaxed text-slate-300">
            {sections.map((section, index) => {
              if (isParagraphSection(section)) {
                return (
                  <div key={`${section.title}-${index}`} className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </div>
                )
              }

              if (isOrderedSection(section)) {
                return (
                  <div key={`${section.title}-${index}`} className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                    <ol className="space-y-6">
                      {section.items.map((item, itemIndex) => (
                        <li key={`${item.title}-${itemIndex}`}>
                          <div className="text-lg font-semibold text-white">{item.title}</div>
                          <ul className="mt-3 space-y-2 pl-6 text-slate-300 marker:text-emerald-300 list-disc">
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ol>
                  </div>
                )
              }

              if (isBulletedSection(section)) {
                return (
                  <div key={`${section.title}-${index}`} className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                    <ul className="space-y-3 pl-6 text-slate-300 marker:text-emerald-300 list-disc">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )
              }

              if (isQuoteSection(section)) {
                return (
                  <div
                    key={`quote-${index}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
                  >
                    <p className="text-lg font-semibold text-emerald-300">{section.text}</p>
                  </div>
                )
              }

              return null
            })}
          </div>
        </section>

        <section className="space-y-10">
          <div className="space-y-2 text-white">
            <h2 className="text-3xl font-bold">{content.gallery.title}</h2>
            <p className="text-sm uppercase tracking-[0.35em] text-white/40">{content.gallery.mobileLabel}</p>
          </div>

          {/* Reserve space to prevent CLS when gallery images hydrate */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <figure
                key={image}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/40 aspect-[9/16]"
              >
                <img
                  src={image}
                  alt={content.gallery.mobileAlt.replace('{{index}}', String(index + 1))}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  width={720}
                  height={1280}
                />
              </figure>
            ))}
          </div>
        </section>
      </main>
      </div>
    </>
  )
}

export default ZenBodhiProject
