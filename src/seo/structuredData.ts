import { getAbsoluteUrl, siteMetadata } from '../config/siteMetadata'

const sameAs = [
  siteMetadata.social.github,
  siteMetadata.social.linkedin,
  siteMetadata.social.instagram,
]

export const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteMetadata.siteUrl}/#website`,
  url: siteMetadata.siteUrl,
  name: siteMetadata.siteName,
  description: siteMetadata.defaultDescription,
  inLanguage: siteMetadata.defaultLocale,
  publisher: {
    '@id': `${siteMetadata.siteUrl}/#organization`,
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: `${siteMetadata.siteUrl}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  ],
})

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteMetadata.siteUrl}/#organization`,
  name: siteMetadata.siteName,
  url: siteMetadata.siteUrl,
  logo: getAbsoluteUrl('/logo_1.svg'),
  email: siteMetadata.contactEmail,
  sameAs,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: siteMetadata.contactEmail,
      areaServed: 'BR',
      availableLanguage: ['pt-BR', 'en'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteMetadata.structuredData.streetAddress,
    postalCode: siteMetadata.structuredData.postalCode,
    addressCountry: siteMetadata.structuredData.country,
  },
})

export const buildPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteMetadata.siteUrl}/#person`,
  name: 'Junior Santos',
  jobTitle: 'Creative Developer',
  description: siteMetadata.defaultDescription,
  url: siteMetadata.siteUrl,
  email: siteMetadata.contactEmail,
  worksFor: {
    '@id': `${siteMetadata.siteUrl}/#organization`,
  },
  sameAs,
  image: getAbsoluteUrl('/profile_photo.png'),
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteMetadata.structuredData.streetAddress,
    addressCountry: siteMetadata.structuredData.country,
  },
})

type ServiceSchemaParams = {
  name: string
  description: string
  url: string
  serviceType: string
}

export const buildServiceSchema = ({ name, description, url, serviceType }: ServiceSchemaParams) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${url}#service`,
  name,
  description,
  serviceType,
  provider: {
    '@id': `${siteMetadata.siteUrl}/#organization`,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Brazil',
  },
})

type CreativeWorkSchemaParams = {
  name: string
  description: string
  url: string
  image?: string
  keywords?: string[]
}

export const buildCreativeWorkSchema = ({
  name,
  description,
  url,
  image,
  keywords,
}: CreativeWorkSchemaParams) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${url}#creative`,
  name,
  description,
  url,
  image: image ? getAbsoluteUrl(image) : siteMetadata.defaultOgImage,
  creator: {
    '@id': `${siteMetadata.siteUrl}/#person`,
  },
  keywords,
})

type SoftwareApplicationParams = {
  name: string
  description: string
  url: string
  operatingSystems?: string[]
  applicationCategory?: string
  offers?: {
    price?: string
    priceCurrency?: string
  }
}

export const buildSoftwareApplicationSchema = ({
  name,
  description,
  url,
  operatingSystems = ['Android', 'iOS'],
  applicationCategory = 'ProductivityApplication',
  offers,
}: SoftwareApplicationParams) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  description,
  applicationCategory,
  operatingSystem: operatingSystems.join(', '),
  creator: {
    '@id': `${siteMetadata.siteUrl}/#person`,
  },
  url,
  offers: offers
    ? {
        '@type': 'Offer',
        price: offers.price ?? '0',
        priceCurrency: offers.priceCurrency ?? 'USD',
      }
    : undefined,
})
