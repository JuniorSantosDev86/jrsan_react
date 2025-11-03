import { useMemo } from 'react'
import { useTranslation } from '../features/i18n/i18n'
import Header from '../components/Header'
import Hero from '../components/Hero'
import PortfolioCarousel from '../components/PortfolioCarousel'
import About from '../components/About'
import SkillsStrip from '../components/SkillsStrip'
import ServicesGrid from '../components/ServicesGrid'
import CTAFooter from '../components/CTAFooter'
import SiteFooter from '../components/SiteFooter'
import Meta from '../seo/Meta'
import { buildOrganizationSchema, buildPersonSchema, buildWebSiteSchema } from '../seo/structuredData'
import { siteMetadata } from '../config/siteMetadata'

function Home() {
  const { t } = useTranslation()
  const heroDescription = useMemo(() => t('hero.description').replace(/\s+/g, ' ').trim(), [t])
  const heroImageUrl = useMemo(
    () => new URL('../assets/images/profile_photo.png', import.meta.url).href,
    []
  )
  const metaTitle = t('hero.subtitle')

  return (
    <>
      <Meta
        title={metaTitle}
        description={heroDescription || siteMetadata.defaultDescription}
        path="/"
        type="website"
        preloads={[
          {
            as: 'image',
            href: heroImageUrl,
            fetchPriority: 'high',
          },
        ]}
        structuredData={[
          buildWebSiteSchema(),
          buildOrganizationSchema(),
          buildPersonSchema(),
        ]}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main id="main-content" className="relative">
          <Hero />
          <PortfolioCarousel />
          <About />
          <SkillsStrip />
          <ServicesGrid />
          <CTAFooter />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}

export default Home
