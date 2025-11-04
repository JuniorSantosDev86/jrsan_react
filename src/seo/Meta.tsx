import { Helmet } from 'react-helmet-async'
import { siteMetadata, getAbsoluteUrl, getCanonicalUrl, getOgImageUrl, buildHrefLangAlternates, languageLocales, supportedLanguages } from '../config/siteMetadata'
import { useTranslation } from '../features/i18n/i18n'
import type { Language } from '../features/i18n/i18n'

type PreloadDescriptor = {
  href: string
  as: string
  type?: string
  fetchPriority?: 'high' | 'low' | 'auto'
  crossOrigin?: 'anonymous' | 'use-credentials'
  imageSrcSet?: string
}

type MetaProps = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article' | 'profile' | 'product' | 'creativework'
  robots?: string
  structuredData?: Array<Record<string, unknown>>
  alternates?: Partial<Record<Language, string>>
  preloads?: PreloadDescriptor[]
  publishedTime?: string
  modifiedTime?: string
}

const isProduction = typeof import.meta !== 'undefined' && import.meta.env.MODE === 'production'

const formatTitle = (title: string) => {
  const trimmed = title.trim()
  if (!trimmed.length) return siteMetadata.siteName
  if (trimmed.toLowerCase().includes(siteMetadata.siteName.toLowerCase())) {
    return trimmed
  }
  return `${trimmed} | ${siteMetadata.siteName}`
}

const serialize = (data: Record<string, unknown>) =>
  JSON.stringify(data, (_, value) => (value === undefined ? undefined : value))

function Meta({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  robots,
  structuredData,
  alternates,
  preloads,
  publishedTime,
  modifiedTime,
}: MetaProps) {
  const { language } = useTranslation()
  const locale = languageLocales[language] ?? siteMetadata.defaultLocale
  const canonicalUrl = getCanonicalUrl(path, language)
  const ogImage = getOgImageUrl(image)
  const robotsValue = robots ?? (isProduction ? 'index,follow' : 'noindex,nofollow')

  const alternatesInfo = buildHrefLangAlternates(path, alternates)
  const ogLocaleAlternates = supportedLanguages
    .filter((lang) => lang !== language)
    .map((lang) => languageLocales[lang])

  const jsonLdEntries = structuredData?.map((schema) => serialize(schema)) ?? []

  return (
    <Helmet>
      <html lang={locale} />
      <title>{formatTitle(title)}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsValue} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={formatTitle(title)} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type === 'creativework' ? 'article' : type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteMetadata.siteName} />
      <meta property="og:locale" content={locale} />
      {ogLocaleAlternates.map((alternateLocale) => (
        <meta key={alternateLocale} property="og:locale:alternate" content={alternateLocale} />
      ))}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteMetadata.siteName} cover`} />
      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formatTitle(title)} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${siteMetadata.siteName} cover`} />

      <link rel="alternate" hrefLang="x-default" href={getCanonicalUrl(path, 'pt')} />
      {alternatesInfo.map((alternate) => (
        <link key={alternate.hrefLang} rel="alternate" hrefLang={alternate.hrefLang} href={alternate.href} />
      ))}

      {preloads?.map((preload) => (
        <link
          key={`${preload.href}-${preload.as}`}
          rel="preload"
          href={getAbsoluteUrl(preload.href)}
          as={preload.as}
          type={preload.type}
          fetchPriority={preload.fetchPriority}
          crossOrigin={preload.crossOrigin}
          imageSrcSet={preload.imageSrcSet}
        />
      ))}

      {siteMetadata.googleSiteVerification && isProduction ? (
        <meta name="google-site-verification" content={siteMetadata.googleSiteVerification} />
      ) : null}

      {jsonLdEntries.map((entry, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {entry}
        </script>
      ))}
    </Helmet>
  )
}

export default Meta
