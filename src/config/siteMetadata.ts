import type { Language } from '../features/i18n/i18n'

type SocialHandles = {
  github: string
  linkedin: string
  instagram: string
  email: string
}

const FALLBACK_SITE_URL = (import.meta.env?.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, '') ?? 'https://meu-dominio.com'

const DEFAULT_OG_IMAGE =
  (import.meta.env?.VITE_DEFAULT_OG_IMAGE as string | undefined)?.startsWith('http')
    ? (import.meta.env.VITE_DEFAULT_OG_IMAGE as string)
    : `${FALLBACK_SITE_URL}${(import.meta.env?.VITE_DEFAULT_OG_IMAGE as string | undefined) ?? '/og-image.jpg'}`

export const supportedLanguages: readonly Language[] = ['pt', 'en'] as const

export const languageLocales: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en',
}

export const siteMetadata = {
  siteName: 'JrSan Creative Development',
  shortName: 'JrSan',
  headline: 'Produtos digitais com performance, UI/UX e estratégia.',
  siteUrl: FALLBACK_SITE_URL,
  defaultLocale: languageLocales.pt,
  locales: languageLocales,
  defaultDescription:
    'Criação de experiências digitais modernas com foco em performance, UI/UX e estratégia. Sites, landing pages e aplicativos desenvolvidos por JrSan Creative Development.',
  contactEmail: 'juniorsantos.dev86@gmail.com',
  structuredData: {
    streetAddress: 'Curitiba, PR',
    postalCode: '80000-000',
    country: 'BR',
  },
  social: {
    github: 'https://github.com/junior-santos',
    linkedin: 'https://linkedin.com/in/junior-santos',
    instagram: 'https://instagram.com/juniorsantos.dev',
    email: 'mailto:juniorsantos.dev86@gmail.com',
  } satisfies SocialHandles,
  defaultOgImage: DEFAULT_OG_IMAGE,
  googleTagManagerId: import.meta.env?.VITE_GTM_ID ?? '',
  googleSiteVerification: import.meta.env?.VITE_GSC_META ?? '',
  siteUrlPlaceholder: 'https://meu-dominio.com',
  optionalPixels: {
    metaPixelId: import.meta.env?.VITE_META_PIXEL_ID ?? '',
    linkedinPartnerId: import.meta.env?.VITE_LINKEDIN_PARTNER_ID ?? '',
  },
} as const

export const getCanonicalUrl = (path = '/', language: Language = 'pt') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const isDefaultLanguage = language === 'pt'
  const query = isDefaultLanguage ? '' : `?lang=${language}`
  return `${siteMetadata.siteUrl}${normalizedPath}${query}`
}

export const getAbsoluteUrl = (value: string) => {
  if (!value) return siteMetadata.siteUrl
  if (value.startsWith('http')) return value
  return `${siteMetadata.siteUrl}${value.startsWith('/') ? value : `/${value}`}`
}

export const getOgImageUrl = (image?: string) => getAbsoluteUrl(image ?? siteMetadata.defaultOgImage)

export const buildHrefLangAlternates = (
  path: string,
  overrides?: Partial<Record<Language, string>>
) => {
  const entries = supportedLanguages.map((lang) => {
    const alternatePath = overrides?.[lang] ?? path
    return {
      lang,
      locale: languageLocales[lang],
      href: getCanonicalUrl(alternatePath, lang),
    }
  })

  return [
    ...entries.map((entry) => ({
      hrefLang: entry.locale.toLowerCase(),
      href: entry.href,
    })),
    {
      hrefLang: 'x-default',
      href: getCanonicalUrl(path, 'pt'),
    },
  ]
}
