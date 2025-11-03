import { initializeDataLayer, loadGtmContainer, pushToDataLayer } from './gtm'

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing'

export type ConsentPreferences = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

const CONSENT_STORAGE_KEY = 'jr-consent-preferences'
const CONSENT_VERSION = '1.0.0'

export const defaultConsentPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

type StoredConsent = {
  version: string
  preferences: ConsentPreferences
  updatedAt: string
}

const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export const getStoredConsent = (): ConsentPreferences | null => {
  const storage = getStorage()
  if (!storage) return null
  const raw = storage.getItem(CONSENT_STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as StoredConsent
    if (parsed.version !== CONSENT_VERSION) {
      return null
    }
    return parsed.preferences
  } catch {
    return null
  }
}

const mapConsentToGtag = (preferences: ConsentPreferences) => ({
  ad_storage: preferences.marketing ? 'granted' : 'denied',
  analytics_storage: preferences.analytics ? 'granted' : 'denied',
  ad_user_data: preferences.marketing ? 'granted' : 'denied',
  ad_personalization: preferences.marketing ? 'granted' : 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
})

const persistConsent = (preferences: ConsentPreferences) => {
  const storage = getStorage()
  if (!storage) return
  const payload: StoredConsent = {
    version: CONSENT_VERSION,
    preferences,
    updatedAt: new Date().toISOString(),
  }
  storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload))
}

const updateConsentInDataLayer = (
  preferences: ConsentPreferences,
  mode: 'default' | 'update'
) => {
  if (typeof window === 'undefined') return
  initializeDataLayer()

  if (typeof window.gtag === 'function') {
    window.gtag('consent', mode, mapConsentToGtag(preferences))
  }

  pushToDataLayer({
    event: 'consent_update',
    consent_mode: mode,
    consent_preferences: preferences,
  })
}

export const registerDefaultConsent = () => {
  const stored = getStoredConsent()
  if (stored) {
    updateConsentInDataLayer(stored, 'default')
    loadGtmContainer()
    return stored
  }

  updateConsentInDataLayer(defaultConsentPreferences, 'default')
  loadGtmContainer()
  return defaultConsentPreferences
}

export const saveConsentPreferences = (preferences: ConsentPreferences) => {
  persistConsent(preferences)
  updateConsentInDataLayer(preferences, 'update')
  loadGtmContainer()
}

export const hasProvidedConsent = () => getStoredConsent() !== null
