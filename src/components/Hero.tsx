import clsx from 'clsx'
import { useTranslation } from '../features/i18n/i18n'
import { useTheme } from '../features/theme/ThemeProvider'
import profileImage from '../assets/images/profile_photo.png'
import { trackEvent } from '../analytics/events'

function Hero() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const heroBackground = isDark
    ? 'linear-gradient(140deg, #090d1f 0%, #141b33 45%, #1f1144 100%)'
    : 'linear-gradient(140deg, #667eea 0%, #764ba2 50%, #8e5cf6 100%)'

  const scrollToServices = () => {
    const element = document.querySelector('#services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    trackEvent('cta_click', { cta: 'hero_services', location: 'hero' })
  }

  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    trackEvent('cta_click', { cta: 'hero_portfolio', location: 'hero' })
  }

  return (
    <section 
      id="home" 
      className={clsx(
        'relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-36 pb-12',
        isDark ? 'text-white' : 'text-foreground'
      )}
      style={{ background: heroBackground }}
    >
      {/* Gradient background already applied via hero-bg */}
      {/* Subtle overlay to enhance contrast */}
      <div
        className={clsx(
          'absolute inset-0 pointer-events-none',
          isDark ? 'bg-black/35 md:bg-black/25' : 'bg-white/0'
        )}
      />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 overflow-hidden shadow-lg">
              <img
                src={profileImage}
                alt="Foto de perfil de Junior Santos"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={256}
                height={256}
              />
            </div>
          </div>

          {/* Greeting */}
          <p
            className={clsx(
              'text-sm font-medium uppercase tracking-wider mb-4',
              isDark ? 'text-white/80' : 'text-foreground/80'
            )}
          >
            {t('hero.greeting')}
          </p>

          {/* Main Title */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('hero.title')}
            </h1>
            <span
              className={clsx(
                'mt-4 inline-flex items-center justify-center rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em]',
                'bg-white/5 backdrop-blur-sm border border-white/15 shadow-[0_8px_25px_rgba(79,70,229,0.25)] transition-colors duration-300',
                isDark ? 'text-white/70 hover:text-white/85' : 'text-foreground/70 hover:text-foreground'
              )}
            >
              {t('hero.badge')}
            </span>
          </div>

          {/* Subtitle */}
          <p
            className={clsx(
              'text-xl mb-4 max-w-2xl mx-auto font-medium',
              isDark ? 'text-white/85' : 'text-foreground/90'
            )}
          >
            {t('hero.subtitle')}
          </p>

          {/* Description */}
          <p
            className={clsx(
              'text-lg mb-8 max-w-3xl mx-auto leading-relaxed whitespace-pre-line',
              isDark ? 'text-white/75' : 'text-foreground/80'
            )}
          >
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToServices}
              className={clsx(
                'btn-primary px-8 py-4 text-base font-semibold transition-transform duration-300',
                'inline-flex items-center justify-center hover:scale-105'
              )}
            >
              {t('hero.cta')}
            </button>

            <button
              onClick={scrollToPortfolio}
              className={clsx(
                'inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-semibold transition-all duration-300 hover:scale-105',
                isDark
                  ? 'bg-white/10 text-white border border-white/25 hover:bg-white/15'
                  : 'bg-background/80 text-foreground border border-foreground/10 hover:bg-background/90 hover:border-foreground/20'
              )}
            >
              {t('hero.secondaryCta')}
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 opacity-60">
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ 
                    animationDelay: `${i * 0.2}s` 
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white border-opacity-30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
