import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from '../pages/Home'
import FluxGrowthStudioProject from '../pages/projects/FluxGrowthStudioProject'
import NutriClaraMendesProject from '../pages/projects/NutriClaraMendesProject'
import RitusDeLuzWebsiteProject from '../pages/projects/RitusDeLuzWebsiteProject'
import RitusDeLuzProject from '../pages/projects/RitusDeLuzProject'
import ZenBodhiProject from '../pages/projects/ZenBodhiProject'
import LexPrimeAdvocaciaProject from '../pages/projects/LexPrimeAdvocaciaProject'
import WebDevelopmentService from '../pages/services/WebDevelopmentService'
import UIUXDesignService from '../pages/services/UIUXDesignService'
import MobileAppsService from '../pages/services/MobileAppsService'
import DigitalMarketingService from '../pages/services/DigitalMarketingService'
import ScrollToTop from '../components/ScrollToTop'
import { trackPageView } from '../analytics/events'

function RouteChangeHandler() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`, document.title)
  }, [location])

  return null
}

function AppRouter() {
  return (
    <Router>
      <RouteChangeHandler />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/fluxgrowth-studio" element={<FluxGrowthStudioProject />} />
        <Route path="/portfolio/nutri-clara-mendes" element={<NutriClaraMendesProject />} />
        <Route path="/projects/lexprime-advocacia" element={<LexPrimeAdvocaciaProject />} />
        <Route path="/services/web-development" element={<WebDevelopmentService />} />
        <Route path="/services/ui-ux-design" element={<UIUXDesignService />} />
        <Route path="/services/mobile-apps" element={<MobileAppsService />} />
        <Route path="/services/digital-marketing" element={<DigitalMarketingService />} />
        <Route path="/projects/ritus-de-luz" element={<RitusDeLuzProject />} />
        <Route path="/projects/ritus-de-luz-website" element={<RitusDeLuzWebsiteProject />} />
        <Route path="/projects/zenbodhi" element={<ZenBodhiProject />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
