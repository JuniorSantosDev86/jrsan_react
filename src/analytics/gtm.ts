import { siteMetadata } from '../config/siteMetadata'

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown> | unknown[]>
    gtag?: (...args: unknown[]) => void
    __jrDataLayerInitialized?: boolean
    __jrGtmLoaded?: boolean
  }
}

const GTM_ID = siteMetadata.googleTagManagerId

export const initializeDataLayer = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.dataLayer = window.dataLayer || []

  if (!window.__jrDataLayerInitialized) {
    window.dataLayer.push({
      'gtm.start': Date.now(),
      event: 'gtm.js',
    })
    window.__jrDataLayerInitialized = true
  }

  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
  }
}

export const pushToDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === 'undefined') return
  initializeDataLayer()
  window.dataLayer.push(payload)
}

export const loadGtmContainer = () => {
  if (typeof window === 'undefined' || !GTM_ID || window.__jrGtmLoaded) {
    return
  }

  initializeDataLayer()

  const script = document.createElement('script')
  script.id = 'gtm-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  script.referrerPolicy = 'no-referrer-when-downgrade'
  document.head.appendChild(script)
  window.__jrGtmLoaded = true
}

export const getGtmId = () => GTM_ID

export const bootstrapAnalytics = () => {
  if (typeof window === 'undefined') return
  initializeDataLayer()

  if (siteMetadata.optionalPixels.metaPixelId) {
    pushToDataLayer({
      event: 'meta_pixel_placeholder',
      metaPixelId: siteMetadata.optionalPixels.metaPixelId,
    })
  }

  if (siteMetadata.optionalPixels.linkedinPartnerId) {
    pushToDataLayer({
      event: 'linkedin_pixel_placeholder',
      linkedinPartnerId: siteMetadata.optionalPixels.linkedinPartnerId,
    })
  }

  if (GTM_ID) {
    loadGtmContainer()
  }
}


