import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiFigma,
  SiFlutter,
  SiDart,
} from 'react-icons/si'
import { useTranslation } from '../../features/i18n/i18n'
import Meta from '../../seo/Meta'
import { buildCreativeWorkSchema } from '../../seo/structuredData'
import { siteMetadata } from '../../config/siteMetadata'

import webritus1 from '../../assets/images/webritus1.png'
import webritus2 from '../../assets/images/webritus2.png'
import webritus3 from '../../assets/images/webritus3.png'
import webritus4 from '../../assets/images/webritus4.png'
import webritus5 from '../../assets/images/webritus5.png'
import webritus6 from '../../assets/images/webritus6.png'
import webritus7 from '../../assets/images/webritus7.png'
import webritus8 from '../../assets/images/webritus8.png'
import webritus9 from '../../assets/images/webritus9.png'
import webritus10 from '../../assets/images/webritus10.png'
import webritus11 from '../../assets/images/webritus11.png'
import webritus12 from '../../assets/images/webritus12.png'
import webritus13 from '../../assets/images/webritus13.png'
import webritus14 from '../../assets/images/webritus14.png'
import webritusMobile1 from '../../assets/images/webritusmobile1.png'
import webritusMobile2 from '../../assets/images/webritusmobile2.png'
import webritusMobile3 from '../../assets/images/webritusmobile3.png'
import webritusMobile4 from '../../assets/images/webritusmobile4.png'
import webritusMobile5 from '../../assets/images/webritusmobile5.png'
import webritusMobile6 from '../../assets/images/webritusmobile6.png'
import webritusMobile7 from '../../assets/images/webritusmobile7.png'
import webritusMobile8 from '../../assets/images/webritusmobile8.png'
import webritusMobile9 from '../../assets/images/webritusmobile9.png'
import webritusMobile10 from '../../assets/images/webritusmobile10.png'
import webritusMobile11 from '../../assets/images/webritusmobile11.png'
import webritusMobile12 from '../../assets/images/webritusmobile12.png'
import webritusMobile13 from '../../assets/images/webritusmobile13.png'

const desktopGallery = [
  webritus1,
  webritus2,
  webritus3,
  webritus4,
  webritus5,
  webritus6,
  webritus7,
  webritus8,
  webritus9,
  webritus10,
  webritus11,
  webritus12,
  webritus13,
  webritus14,
]

const mobileGallery = [
  webritusMobile1,
  webritusMobile2,
  webritusMobile3,
  webritusMobile4,
  webritusMobile5,
  webritusMobile6,
  webritusMobile7,
  webritusMobile8,
  webritusMobile9,
  webritusMobile10,
  webritusMobile11,
  webritusMobile12,
  webritusMobile13,
]

const TRANSLATION_OPTIONS = { returnObjects: true } as const

type ParagraphSection = {
  type: 'paragraphs'
  title: string
  paragraphs: string[]
}

type BulletedSection = {
  type: 'bulleted'
  title: string
  items: string[]
}

type OrderedSectionItem = {
  title: string
  description?: string
  bullets?: string[]
}

type OrderedSection = {
  type: 'ordered'
  title: string
  items: OrderedSectionItem[]
}

type QuoteSection = {
  type: 'quote'
  text: string
}

type ProjectSection = ParagraphSection | BulletedSection | OrderedSection | QuoteSection

type GalleryContent = {
  title: string
  desktopLabel: string
  mobileLabel: string
  desktopAlt: string
  mobileAlt: string
}

type WebsiteContent = {
  seo: {
    title: string
    description: string
  }
  labels: {
    highlightBadge: string
    backToPortfolio: string
    detailChip: string
  }
  hero: {
    title: string
    summary: string
  }
  sections: ProjectSection[]
  gallery: GalleryContent
}

const tools = [
  { name: 'Flutter', icon: SiFlutter, color: '#46D1FD' },
  { name: 'Dart', icon: SiDart, color: '#0175C2' },
  { name: 'Figma', icon: SiFigma, color: '#A259FF' },
  { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
  { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
] as const

const isParagraphSection = (section: ProjectSection): section is ParagraphSection =>
  section.type === 'paragraphs'

const isBulletedSection = (section: ProjectSection): section is BulletedSection =>
  section.type === 'bulleted'

const isOrderedSection = (section: ProjectSection): section is OrderedSection =>
  section.type === 'ordered'

const isQuoteSection = (section: ProjectSection): section is QuoteSection =>
  section.type === 'quote'

function RitusDeLuzWebsiteProject() {
  const { t } = useTranslation()
  const content = t('projectDetails.ritusDeLuzWebsite', TRANSLATION_OPTIONS) as WebsiteContent
  const sections = content.sections ?? []
  const description = content.seo.description
  const pagePath = '/projects/ritus-de-luz-website'
  const representativeImage = desktopGallery[0] ?? mobileGallery[0] ?? ''

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
            keywords: ['Flutter', 'Branding', 'Website'],
          }),
        ]}
      />

      <div className="min-h-screen bg-[#060618] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070720]/90 backdrop-blur-xl">
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
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              {content.labels.detailChip}
            </span>
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

              if (isOrderedSection(section)) {
                return (
                  <div key={`${section.title}-${index}`} className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                    <ol className="mt-4 space-y-6 pl-6 text-slate-300 marker:text-emerald-300 list-decimal">
                      {section.items.map((item, itemIndex) => (
                        <li key={`${item.title}-${itemIndex}`}>
                          <div className="text-lg font-semibold text-white">{item.title}</div>
                          {item.description ? <p className="mt-3">{item.description}</p> : null}
                          {item.bullets?.length ? (
                            <ul className="mt-3 space-y-2 pl-6 text-slate-300 marker:text-emerald-300 list-disc">
                              {item.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ol>
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
            <p className="text-sm uppercase tracking-[0.35em] text-white/40">{content.gallery.desktopLabel}</p>
          </div>

          {/* Reserve space to prevent CLS when gallery images hydrate */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {desktopGallery.map((image, index) => (
              <figure
                key={image}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/40 aspect-[16/9]"
              >
                <img
                  src={image}
                  alt={content.gallery.desktopAlt.replace('{{index}}', String(index + 1))}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  width={1280}
                  height={720}
                />
              </figure>
            ))}
          </div>

          <div className="space-y-2 text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-white/40">{content.gallery.mobileLabel}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {mobileGallery.map((image, index) => (
              <figure
                key={image}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/40 aspect-[9/16] flex items-center justify-center p-3"
              >
                <img
                  src={image}
                  alt={content.gallery.mobileAlt.replace('{{index}}', String(index + 1))}
                  loading="lazy"
                  decoding="async"
                  className="h-full max-h-full w-auto max-w-full object-contain"
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

export default RitusDeLuzWebsiteProject
