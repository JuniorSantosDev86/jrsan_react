import { useTranslation } from '../features/i18n/i18n'
import profileImage from '../assets/images/eu_photo.png'
import { useContactModal } from '../context/ContactModalContext'

function About() {
  const { t } = useTranslation()
  const { openContactModal } = useContactModal()

  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[]

  return (
    <section id="about" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text-primary">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Avatar Column */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative">
                {/* Main Avatar */}
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <img
                    src={profileImage}
                    alt="Foto de Junior Santos"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={256}
                    height={256}
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl opacity-50 animate-pulse"></div>

                {/* Small floating elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  Jr
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full shadow-lg animate-bounce-subtle"></div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {paragraphs.map((paragraph, index) => (
                <div key={index} className="group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <p className="text-lg leading-relaxed text-justify text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                    {paragraph}
                  </p>
                  {index < paragraphs.length - 1 && (
                    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                  )}
                </div>
              ))}

              {/* Call to Action */}
              <div className="pt-8">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      const element = document.querySelector('#portfolio')
                      if (element) element.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="btn-primary"
                  >
                    {t('aboutActions.portfolio')}
                  </button>
                  <button
                    onClick={openContactModal}
                    className="btn-secondary"
                  >
                    {t('aboutActions.contact')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}

export default About
