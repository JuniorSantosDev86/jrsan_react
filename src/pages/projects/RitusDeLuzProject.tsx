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

import ritus1 from '../../assets/images/ritus1.png'
import ritus2 from '../../assets/images/ritus2.png'
import ritus3 from '../../assets/images/ritus3.png'
import ritus4 from '../../assets/images/ritus4.png'
import ritus5 from '../../assets/images/ritus5.png'
import ritus6 from '../../assets/images/ritus6.png'
import ritus7 from '../../assets/images/ritus7.png'
import ritus8 from '../../assets/images/ritus8.png'
import ritus9 from '../../assets/images/ritus9.png'
import ritusMobile1 from '../../assets/images/ritusmobile1.jpg'
import ritusMobile2 from '../../assets/images/ritusmobile2.jpg'
import ritusMobile3 from '../../assets/images/ritusmobile3.jpg'
import ritusMobile4 from '../../assets/images/ritusmobile4.jpg'
import ritusMobile5 from '../../assets/images/ritusmobile5.jpg'
import ritusMobile6 from '../../assets/images/ritusmobile6.jpg'
import ritusMobile7 from '../../assets/images/ritusmobile7.jpg'

const desktopGallery = [
  ritus1,
  ritus2,
  ritus3,
  ritus4,
  ritus5,
  ritus6,
  ritus7,
  ritus8,
  ritus9,
]

const mobileGallery = [
  ritusMobile1,
  ritusMobile2,
  ritusMobile3,
  ritusMobile4,
  ritusMobile5,
  ritusMobile6,
  ritusMobile7,
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
  description: string
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

type RitusContent = {
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

function RitusDeLuzProject() {
  const { t } = useTranslation()
  const content = t('projectDetails.ritusDeLuzLanding', TRANSLATION_OPTIONS) as RitusContent
  const sections = content.sections ?? []
  const description = content.seo.description
  const pagePath = '/projects/ritus-de-luz'
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
            keywords: ['Flutter', 'Branding', 'Landing Page'],
          }),
        ]}
      />

      <div className="min-h-screen bg-[#050514] text-slate-100">
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
                    <ol className="space-y-6">
                      {section.items.map((item, itemIndex) => (
                        <li key={`${item.title}-${itemIndex}`}>
                          <div className="text-lg font-semibold text-white">{item.title}</div>
                          <p className="mt-2">{item.description}</p>
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

export default RitusDeLuzProject
