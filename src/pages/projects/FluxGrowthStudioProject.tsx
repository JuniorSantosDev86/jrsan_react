import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SiReact, SiJavascript, SiFigma, SiAdobeillustrator, SiTailwindcss } from 'react-icons/si'
import { useTranslation } from '../../features/i18n/i18n'
import Meta from '../../seo/Meta'
import { buildCreativeWorkSchema } from '../../seo/structuredData'
import { siteMetadata } from '../../config/siteMetadata'

const fluxGrowthImages = import.meta.glob<{ default: string }>(
  '../../assets/images/fluxgrowth*.{png,jpg,jpeg,webp}',
  { eager: true }
)

const sortedKeys = Object.keys(fluxGrowthImages).sort()
const desktopGallery: string[] = []
const mobileGallery: string[] = []

for (const key of sortedKeys) {
  const source = fluxGrowthImages[key]?.default

  if (!source) {
    continue
  }

  if (key.toLowerCase().includes('mobile')) {
    mobileGallery.push(source)
  } else {
    desktopGallery.push(source)
  }
}

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

type ProjectSection = ParagraphSection | BulletedSection | OrderedSection

type GalleryContent = {
  title: string
  desktopLabel: string
  mobileLabel: string
  desktopAlt: string
  mobileAlt: string
}

type FluxGrowthContent = {
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

const skills = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Figma', icon: SiFigma, color: '#A259FF' },
  { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
] as const

const isParagraphSection = (section: ProjectSection): section is ParagraphSection =>
  section.type === 'paragraphs'

const isBulletedSection = (section: ProjectSection): section is BulletedSection =>
  section.type === 'bulleted'

const isOrderedSection = (section: ProjectSection): section is OrderedSection =>
  section.type === 'ordered'

function FluxGrowthStudioProject() {
  const { t } = useTranslation()
  const content = t('projectDetails.fluxGrowthStudio', TRANSLATION_OPTIONS) as FluxGrowthContent
  const sections = content.sections ?? []
  const description = content.seo.description
  const pagePath = '/projects/fluxgrowth-studio'
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
            keywords: skills.map((skill) => skill.name),
          }),
        ]}
      />

      <div className="min-h-screen bg-[#060618] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070720]/90 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-2 font-semibold tracking-wide text-sm uppercase text-white/70">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
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
        <section className="mx-auto max-w-4xl space-y-8 text-slate-200">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              {content.labels.detailChip}
            </span>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              {content.hero.title}
            </h1>
            <p className="text-base text-slate-400">
              {content.hero.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => {
              const Icon = skill.icon

              return (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:text-white hover:-translate-y-0.5"
                >
                  <Icon className="text-base" style={{ color: skill.color }} />
                  {skill.name}
                </span>
              )
            })}
          </div>

          <div className="space-y-6 leading-relaxed text-slate-300">
            {sections.map((section, index) => {
              if (isParagraphSection(section)) {
                return (
                  <div key={`${section.title}-${index}`}>
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="mt-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )
              }

              if (isBulletedSection(section)) {
                return (
                  <div key={`${section.title}-${index}`}>
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                    <ul className="mt-4 space-y-3 pl-6 text-slate-300 marker:text-violet-300 list-disc">
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
                    <ol className="mt-4 space-y-6 pl-6 text-slate-300 marker:text-violet-300 list-decimal">
                      {section.items.map((item, itemIndex) => (
                        <li key={`${item.title}-${itemIndex}`}>
                          <div className="text-lg font-semibold text-white">{item.title}</div>
                          {item.description ? (
                            <p className="mt-3">{item.description}</p>
                          ) : null}
                          {item.bullets?.length ? (
                            <ul className="mt-3 space-y-2 pl-6 text-slate-300 marker:text-violet-300 list-disc">
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

              return null
            })}
          </div>
        </section>

        {(desktopGallery.length > 0 || mobileGallery.length > 0) && (
          <section className="space-y-10">
            <div className="space-y-2 text-white">
              <h2 className="text-3xl font-bold">{content.gallery.title}</h2>
            </div>

            {desktopGallery.length > 0 && (
              <>
                <p className="text-sm uppercase tracking-[0.35em] text-white/40">{content.gallery.desktopLabel}</p>
                {/* Reserve space to prevent CLS when gallery images hydrate */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {desktopGallery.map((image, index) => (
                    <figure
                      key={`${image}-desktop-${index}`}
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
              </>
            )}

            {mobileGallery.length > 0 && (
              <>
                <p className="text-sm uppercase tracking-[0.35em] text-white/40">{content.gallery.mobileLabel}</p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {mobileGallery.map((image, index) => (
                      <figure
                        key={`${image}-mobile-${index}`}
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
                </>
              )}
          </section>
        )}
      </main>
      </div>
    </>
  )
}

export default FluxGrowthStudioProject
