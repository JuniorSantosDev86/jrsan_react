/**
 * Carrossel horizontal com foco no card central.
 * Ajuste `ACTIVE_SCALE` e `INACTIVE_SCALE` para alterar o contraste de tamanho.
 */
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useTranslation } from '../features/i18n/i18n'
import { trackEvent } from '../analytics/events'
import type { ProjectItem } from '../data/projects'

const ACTIVE_SCALE = 1.1
const INACTIVE_SCALE = 0.72
const LOOP_MULTIPLIER = 5
const INITIAL_PROJECT_INDEX = 1 // LexPrime é o segundo projeto (índice 1)

const TRANSLATION_OPTIONS = { returnObjects: true } as const

type ProjectContent = {
  category: string
  title: string
  description: string
  tags?: string[]
}

type PortfolioCarouselProps = {
  items: ProjectItem[]
  onCardClick?: (project: ProjectItem) => void
}

const analyticsEvent = (detail: Record<string, unknown>) => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('analytics', { detail }))
}

const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference)
      return () => mediaQuery.removeEventListener('change', updatePreference)
    }

    mediaQuery.addListener(updatePreference)
    return () => mediaQuery.removeListener(updatePreference)
  }, [])

  return prefersReducedMotion
}

const projectContentFallback: ProjectContent = {
  category: '',
  title: '',
  description: '',
  tags: undefined,
}

const sanitizeTags = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value)) return undefined
  const filtered = value.filter(
    (tag): tag is string => typeof tag === 'string' && tag.trim().length > 0
  )
  return filtered.length > 0 ? filtered : undefined
}

const getProjectContent = (raw: unknown): ProjectContent => {
  if (typeof raw === 'string') {
    return { ...projectContentFallback, title: raw, description: raw }
  }

  if (!raw || typeof raw !== 'object') {
    return projectContentFallback
  }

  const { category, title, description, tags } = raw as Partial<ProjectContent>

  return {
    category: typeof category === 'string' ? category : projectContentFallback.category,
    title:
      typeof title === 'string'
        ? title
        : typeof description === 'string'
          ? description
          : projectContentFallback.title,
    description:
      typeof description === 'string'
        ? description
        : typeof title === 'string'
          ? title
          : projectContentFallback.description,
    tags: sanitizeTags(tags),
  }
}

const isValidInternalPath = (value: unknown): value is string =>
  typeof value === 'string' && value.startsWith('/')

function PortfolioCarousel({ items, onCardClick }: PortfolioCarouselProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const prefersReducedMotion = usePrefersReducedMotion()
  const totalItems = items.length
  const virtualLength = totalItems * LOOP_MULTIPLIER
  const loopOffset = totalItems * Math.floor(LOOP_MULTIPLIER / 2)
  // Calcula o índice virtual para mostrar a LexPrime (índice 1) em destaque
  const middleIndex = loopOffset + INITIAL_PROJECT_INDEX
  const [selectedIndex, setSelectedIndex] = useState(middleIndex)
  const [announceMessage, setAnnounceMessage] = useState('')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const listId = useId()

  useEffect(() => {
    cardRefs.current = new Array(virtualLength).fill(null)
  }, [virtualLength])

  const virtualItems = useMemo(() => {
    if (!totalItems) return []
    return Array.from({ length: virtualLength }, (_, idx) => items[idx % totalItems])
  }, [items, totalItems, virtualLength])

  const projectContents = useMemo(() => {
    if (!totalItems) return []
    return items.map((item) => {
      const translationKey = item.translationKey ?? `portfolio.projects.${item.id}`
      return getProjectContent(t(translationKey, TRANSLATION_OPTIONS))
    })
  }, [items, t, totalItems])

  const updateSelectedIndex = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.left + containerRect.width / 2

    let closestIndex = 0
    let smallestDistance = Number.POSITIVE_INFINITY

    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const cardRect = card.getBoundingClientRect()
      const cardCenter = cardRect.left + cardRect.width / 2
      const distance = Math.abs(cardCenter - containerCenter)

      if (distance < smallestDistance) {
        smallestDistance = distance
        closestIndex = index
      }
    })

    setSelectedIndex(closestIndex)
    if (totalItems) {
      const normalized = ((closestIndex % totalItems) + totalItems) % totalItems
      const currentItem = projectContents[normalized]
      if (currentItem) {
        setAnnounceMessage(`${currentItem.title} — ${t('portfolio.badge')}`)
      }
    }
  }, [projectContents, t, totalItems])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let frame = 0
    const handleScroll = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateSelectedIndex)
    }

    updateSelectedIndex()
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [updateSelectedIndex])

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = containerRef.current
    const card = cardRefs.current[index]
    if (!container || !card) return

    const containerCenterOffset = container.clientWidth / 2 - card.clientWidth / 2
    const targetScrollLeft = card.offsetLeft - containerCenterOffset

    container.scrollTo({ left: targetScrollLeft, behavior })
  }, [])

  useEffect(() => {
    if (!totalItems) return
    // Aguarda um pouco para garantir que os cards estão renderizados
    const timeout = setTimeout(() => {
      scrollToIndex(middleIndex, 'auto')
    }, 100)
    return () => clearTimeout(timeout)
  }, [middleIndex, scrollToIndex, totalItems])

  const scrollPrev = useCallback(() => {
    // Simples decremento com wrap-around infinito
    let target = selectedIndex - 1
    if (target < 0) {
      target = virtualLength - 1
    }
    scrollToIndex(target)
  }, [scrollToIndex, selectedIndex, virtualLength])

  const scrollNext = useCallback(() => {
    // Simples incremento com wrap-around infinito
    let target = selectedIndex + 1
    if (target >= virtualLength) {
      target = 0
    }
    scrollToIndex(target)
  }, [scrollToIndex, selectedIndex, virtualLength])

  const handleKeyNavigation = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollNext, scrollPrev]
  )

  const handleNavigation = useCallback(
    (project: ProjectItem) => {
      trackEvent('cta_click', {
        cta: project.analyticsId ?? `portfolio_${project.id}`,
        location: 'portfolio_carousel',
      })
      analyticsEvent({ source: 'portfolio:card_click', id: project.id })
      onCardClick?.(project)

      if (isValidInternalPath(project.href)) {
        navigate(project.href)
      } else if (project.href && typeof window !== 'undefined') {
        window.open(project.href, '_blank', 'noopener')
      }
    },
    [navigate, onCardClick]
  )

  const handleCardPress = useCallback(
    (project: ProjectItem, index: number, isActive: boolean) => {
      if (!isActive) {
        scrollToIndex(index)
        return
      }

      handleNavigation(project)
    },
    [handleNavigation, scrollToIndex]
  )

  const sectionHeader = useMemo(
    () => (
      <div className="text-center mb-16 space-y-6">
        <div className="flex justify-center">
          <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-primary/80 shadow-[0_12px_30px_rgba(124,58,237,0.25)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t('portfolio.badge')}
          </span>
        </div>
        <h2 className="text-4xl font-bold gradient-text-primary drop-shadow-sm md:text-5xl">
          {t('portfolio.title')}
        </h2>
        <p className="text-lg text-muted-foreground/90 max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
          {t('portfolio.subtitle')}
        </p>
      </div>
    ),
    [t]
  )

  if (!items.length) {
    return null
  }

  return (
    <section
      id="portfolio"
      className="section-padding relative overflow-visible"
      role="region"
      aria-label="Carrossel de projetos"
      onKeyDown={handleKeyNavigation}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="pointer-events-none absolute -top-32 left-1/2 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl opacity-70 animate-pulse-slow will-change-transform" />
      <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-80 w-80 translate-x-1/4 translate-y-1/3 rounded-full bg-purple-500/10 blur-3xl animate-float-slow will-change-transform" />

      <div className="container relative">
        {sectionHeader}

        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
        onClick={scrollPrev}
        data-analytics="portfolio:navigate_prev"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/70 text-foreground/80 backdrop-blur-xl shadow-lg transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={t('accessibility.previousProject' as any)}
            aria-controls={listId}
            disabled={false}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            data-analytics="portfolio:navigate_next"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/70 text-foreground/80 backdrop-blur-xl shadow-lg transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={t('accessibility.nextProject' as any)}
            aria-controls={listId}
            disabled={false}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={containerRef}
          className="overflow-x-auto px-6 md:px-10 scroll-smooth snap-x snap-mandatory py-8"
          aria-live="polite"
        >
          <div className="flex items-stretch gap-10 pb-10 snap-x snap-mandatory" role="list" id={listId}>
            <span
              aria-hidden="true"
              className="shrink-0 w-[40vw] sm:w-[32vw] md:w-[26vw] lg:w-[22vw]"
            />
            {virtualItems.map((project, index) => {
              const normalizedIndex = totalItems
                ? ((index % totalItems) + totalItems) % totalItems
                : 0
              const projectData = projectContents[normalizedIndex] ?? projectContentFallback
              const isActive = selectedIndex === index
              const scale = prefersReducedMotion ? 1 : isActive ? ACTIVE_SCALE : INACTIVE_SCALE
              const opacity = prefersReducedMotion ? 1 : isActive ? 1 : 0.7

              return (
                <div
                  key={`${project.id}-${index}`}
                  role="listitem"
                  tabIndex={0}
                  data-active={isActive}
                  ref={(node) => {
                    cardRefs.current[index] = node
                  }}
                  className={[
                    'snap-center relative shrink-0 transition-transform duration-300 ease-out will-change-transform origin-center',
                    'w-[65vw] sm:w-[42vw] md:w-[30vw] lg:w-[22vw] xl:w-[20vw] aspect-[3/4]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  ].join(' ')}
                  style={{
                    transform: `scale(${scale})`,
                    opacity,
                  }}
                  onClick={() => handleCardPress(project, index, isActive)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      handleCardPress(project, index, isActive)
                    }
                  }}
                >
                  <div
                    className={[
                      project.gradient ?? 'portfolio-card-1',
                      'rounded-3xl p-6 text-white relative overflow-hidden group cursor-pointer h-full',
                      'transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30',
                      isActive && 'shadow-2xl shadow-primary/80 ring-[3px] ring-primary/90 drop-shadow-[0_0_20px_rgba(124,58,237,0.8)]',
                    ].filter(Boolean).join(' ')}
                  >
                    <div className="absolute -top-20 right-0 h-32 w-32 rounded-full bg-white/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0 will-change-transform" />
                    <div className="absolute -bottom-16 left-0 h-28 w-28 rounded-full bg-white/10 blur-3xl transition-all duration-500 group-hover:scale-125 will-change-transform" />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500" />

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                        {projectData.category}
                      </div>

                      <h3 className="mt-6 text-xl font-bold leading-snug tracking-tight line-clamp-3">
                        {projectData.title || project.title}
                      </h3>

                      <p className="mt-3 text-sm text-white/80 line-clamp-3 leading-relaxed">
                        {projectData.description || project.subtitle}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {(projectData.tags ?? project.tags ?? []).map((tag) => (
                          <span
                            key={`${project.id}-${tag}`}
                            className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex-grow" />

                      <button
                        className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/25 group-hover:translate-x-1 will-change-transform"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleNavigation(project)
                        }}
                      >
                        <span>{t('portfolio.viewProject')}</span>
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/20 transition-all duration-500" />
                  </div>
                </div>
              )
            })}
            <span
              aria-hidden="true"
              className="shrink-0 w-[40vw] sm:w-[32vw] md:w-[26vw] lg:w-[22vw]"
            />
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {announceMessage}
        </p>
      </div>
    </section>
  )
}

export default PortfolioCarousel
