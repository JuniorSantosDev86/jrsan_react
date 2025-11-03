import i18n from 'i18next'
import {
  initReactI18next,
  useTranslation as useTranslationBase,
} from 'react-i18next'

// Import translation files
import ptCommon from './locales/pt/common.json'
import enCommon from './locales/en/common.json'

const resources = {
  pt: {
    common: ptCommon,
  },
  en: {
    common: enCommon,
  },
}

const isDev =
  typeof import.meta !== 'undefined' &&
  Boolean((import.meta as any)?.env?.MODE === 'development')

const SUPPORTED_LANGUAGES = ['pt', 'en'] as const

const isSupportedLanguage = (value: unknown): value is 'pt' | 'en' =>
  typeof value === 'string' && (SUPPORTED_LANGUAGES as readonly string[]).includes(value)

const resolveHtmlLang = (lng: string) => (lng === 'pt' ? 'pt-BR' : 'en')

// Detect initial language
const getInitialLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const queryLang = params.get('lang')
    if (isSupportedLanguage(queryLang)) {
      return queryLang
    }

    try {
      const storedLanguage = window.localStorage.getItem('portfolio-language')
      if (isSupportedLanguage(storedLanguage)) {
        return storedLanguage
      }
    } catch {
      // ignore storage errors
    }
  }

  if (typeof navigator !== 'undefined') {
    const browserLanguage = navigator.language.toLowerCase()
    if (browserLanguage.startsWith('pt')) {
      return 'pt'
    }
  }

  return 'en'
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    
    debug: isDev, // Only in development

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    react: {
      useSuspense: false, // Disable suspense for better error handling
    },

    // Save language to localStorage when changed
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'portfolio-language',
      caches: ['localStorage'],
    },
  })

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('portfolio-language', lng)
    } catch {
      // ignore storage errors
    }

    const url = new URL(window.location.href)
    if (lng === 'pt') {
      url.searchParams.delete('lang')
    } else {
      url.searchParams.set('lang', lng)
    }
    window.history.replaceState({}, '', url.toString())
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = resolveHtmlLang(lng)
  }
})

// Set initial HTML lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = resolveHtmlLang(i18n.language)
}

export default i18n

// Type-safe translation hook
export const useTranslation = () => {
  const { t, i18n: i18nInstance } = useTranslationBase('common')
  
  return {
    t,
    language: i18nInstance.language as 'pt' | 'en',
    changeLanguage: (lang: 'pt' | 'en') => i18nInstance.changeLanguage(lang),
    isPortuguese: i18nInstance.language === 'pt',
    isEnglish: i18nInstance.language === 'en',
  }
}

// Helper function to get current language outside components
export const getCurrentLanguage = (): 'pt' | 'en' => {
  return i18n.language as 'pt' | 'en'
}

// Helper function to change language outside components
export const changeLanguage = (lang: 'pt' | 'en') => {
  i18n.changeLanguage(lang)
}

// Type definitions for better TypeScript support
export type Language = 'pt' | 'en'
export type TranslationKey = keyof typeof ptCommon
