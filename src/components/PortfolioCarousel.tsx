import { useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../features/i18n/i18n'
import { trackEvent } from '../analytics/events'

const PROJECTS = [
  {
    id: 'fluxGrowthStudio',
    gradient: 'portfolio-card-1',
    category: 'Landing Page',
    categoryEn: 'Landing Page',
    path: '/projects/fluxgrowth-studio'
  },
  {
    id: 'ritusWebsite',
    gradient: 'portfolio-card-3',
    category: 'Website',
    categoryEn: 'Website',
    path: '/projects/ritus-de-luz-website'
  },
  {
    id: 'landingPage',
    gradient: 'portfolio-card-2',
    category: 'Web Development',
    categoryEn: 'Web Development',
    path: '/projects/ritus-de-luz'
  },
  {
    id: 'zenbodhiApp',
    gradient: 'portfolio-card-4',
    category: 'Mobile App',
    categoryEn: 'Mobile App',
    path: '/projects/zenbodhi'
  },
] as const

type Project = (typeof PROJECTS)[number]

type ProjectContent = {
  category: string
  title: string
  description: string
  tags?: string[]
}

const TRANSLATION_OPTIONS = { returnObjects: true } as const

const projectContentFallback: ProjectContent = {
  category: '',
  title: '',
  description: '',
  tags: undefined
}

const sanitizeTags = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined
  }

  const filtered = value.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0)

  return filtered.length > 0 ? filtered : undefined
}

const getProjectContent = (raw: unknown): ProjectContent => {
  if (typeof raw === 'string') {
    return {
      ...projectContentFallback,
      title: raw,
      description: raw
    }
  }

  if (!raw || typeof raw !== 'object') {
    return projectContentFallback
  }

  const { category, title, description, tags } = raw as Partial<ProjectContent>

  return {
    category: typeof category === 'string' ? category : projectContentFallback.category,
    title: typeof title === 'string' ? title : typeof description === 'string' ? description : projectContentFallback.title,
    description: typeof description === 'string' ? description : typeof title === 'string' ? title : projectContentFallback.description,
    tags: sanitizeTags(tags)
  }
}

const isValidInternalPath = (value: unknown): value is string => typeof value === 'string' && value.startsWith('/')

function PortfolioCarousel() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize component after mount to prevent scroll interference
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  const navigateToProject = (project: Project, index: number) => {
    goToProject(index)
    if (isValidInternalPath(project.path)) {
      trackEvent('cta_click', { cta: `portfolio_${project.id}`, location: 'portfolio_carousel' })
      navigate(project.path)
    }
  }

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>, project: Project, index: number) => {
    event.stopPropagation()
    navigateToProject(project, index)
  }

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="pointer-events-none absolute -top-32 left-1/2 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl opacity-70 animate-pulse-slow will-change-transform" />
      <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-80 w-80 translate-x-1/4 translate-y-1/3 rounded-full bg-purple-500/10 blur-3xl animate-float-slow will-change-transform" />
      <div className="container relative">{isInitialized && (
        <>
          {/* Section Header */}
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

          {/* Portfolio Cards */}
          <div className="relative max-w-6xl mx-auto">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/10 opacity-70 blur-2xl will-change-transform" />
            {/* Cards Container */}
            <div className="grid grid-cols-1 gap-6 mb-14 md:grid-cols-2 lg:grid-cols-4">
              {PROJECTS.map((project, index) => {
                const projectData = getProjectContent(t(`portfolio.projects.${project.id}`, TRANSLATION_OPTIONS))
                
                return (
                  <div
                    key={project.id}
                    className={`${project.gradient} rounded-3xl p-6 text-white relative overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 will-change-transform ${
                      currentIndex === index ? 'ring-4 ring-white/50' : 'ring-1 ring-white/10'
                    } ${isInitialized ? 'animate-fade-up' : 'opacity-0'}`}
                    style={{ 
                      animationDelay: isInitialized ? `${index * 120}ms` : '0ms',
                      transform: 'translate3d(0, 0, 0)' // Force hardware acceleration
                    }}
                    onClick={() => navigateToProject(project, index)}
                  >
                    <div className="absolute -top-20 right-0 h-32 w-32 rounded-full bg-white/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0 will-change-transform" />
                    <div className="absolute -bottom-16 left-0 h-28 w-28 rounded-full bg-white/10 blur-3xl transition-all duration-500 group-hover:scale-125 will-change-transform" />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-500" />
                    
                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col">
                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md transition-all duration-300 group-hover:bg-white/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                        {projectData.category}
                      </div>

                      {/* Title */}
                      <h3 className="mt-6 text-xl font-bold leading-snug tracking-tight line-clamp-3">
                        {projectData.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-sm text-white/80 line-clamp-3 leading-relaxed">
                        {projectData.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {projectData.tags?.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Spacer */}
                      <div className="flex-grow" />

                      {/* Action Button */}
                      <button
                        className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/25 group-hover:translate-x-1 will-change-transform"
                        onClick={(event) => handleButtonClick(event, project, index)}
                      >
                        <span>{t('portfolio.viewProject')}</span>
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/20 transition-all duration-500" />
                  </div>
                )
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center space-x-6">
              {/* Previous Button */}
              <button
                onClick={prevProject}
                className="w-12 h-12 rounded-full bg-muted/70 hover:bg-muted/90 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg shadow-black/10 will-change-transform"
                aria-label={t('accessibility.previousProject' as any)}
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Indicators */}
              <div className="flex space-x-2">
                {PROJECTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`carousel-indicator w-3 h-3 rounded-full transition-all duration-300 will-change-transform ${
                      currentIndex === index ? 'active scale-125 shadow-[0_0_0_4px_rgba(124,58,237,0.25)]' : ''
                    }`}
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextProject}
                className="w-12 h-12 rounded-full bg-muted/70 hover:bg-muted/90 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg shadow-black/10 will-change-transform"
                aria-label={t('accessibility.nextProject' as any)}
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
      </div>
    </section>
  )
}

export default PortfolioCarousel
