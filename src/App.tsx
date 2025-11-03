import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './features/theme/ThemeProvider'
import AppRouter from './routes/AppRouter'
import { ContactModalProvider } from './context/ContactModalContext'
import GtmNoScript from './components/GtmNoScript'
import ConsentBanner from './components/ConsentBanner'
import SkipLink from './components/SkipLink'
import { bootstrapAnalytics } from './analytics/gtm'

function App() {
  useEffect(() => {
    bootstrapAnalytics()
  }, [])

  return (
    <HelmetProvider>
      <ThemeProvider>
        <ContactModalProvider>
          <GtmNoScript />
          <SkipLink />
          <AppRouter />
          <ConsentBanner />
        </ContactModalProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
