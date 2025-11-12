/**
 * @typedef {Object} ProjectItem
 * @property {string} id - Translation key slug (ex: "nutriClaraMendes").
 * @property {string} href - Internal or external link for the project.
 * @property {string} gradient - CSS gradient class (portfolio-card-X).
 * @property {string} [translationKey] - Optional override for translation path.
 * @property {string} [analyticsId] - Optional analytics identifier.
 * @property {string} [title] - Fallback title if translation is missing.
 * @property {string} [subtitle] - Fallback subtitle/description.
 * @property {string[]} [tags] - Fallback tags.
 */

/** @type {ProjectItem[]} */
export const projects = [
  {
    id: 'nutriClaraMendes',
    href: '/portfolio/nutri-clara-mendes',
    gradient: 'portfolio-card-1',
    translationKey: 'portfolio.projects.nutriClaraMendes',
    analyticsId: 'portfolio_nutriClaraMendes',
    title: 'Nutri Clara Mendes',
    subtitle: 'Landing focada em performance e SEO',
    tags: ['React', 'Tailwind', 'SEO'],
  },
  {
    id: 'lexPrimeAdvocacia',
    href: '/projects/lexprime-advocacia',
    gradient: 'portfolio-card-2',
    translationKey: 'portfolio.projects.lexPrimeAdvocacia',
    analyticsId: 'portfolio_lexPrimeAdvocacia',
    title: 'LexPrime Advocacia',
    subtitle: 'Landing page institucional full service',
    tags: ['React', 'Tailwind', 'Analytics'],
  },
  {
    id: 'fluxGrowthStudio',
    href: '/projects/fluxgrowth-studio',
    gradient: 'portfolio-card-1',
    translationKey: 'portfolio.projects.fluxGrowthStudio',
    analyticsId: 'portfolio_fluxGrowthStudio',
    title: 'FluxGrowth Studio',
    subtitle: 'Landing page com identidade estratégica',
    tags: ['React', 'UI Motion', 'Tailwind'],
  },
  {
    id: 'ritusWebsite',
    href: '/projects/ritus-de-luz-website',
    gradient: 'portfolio-card-3',
    translationKey: 'portfolio.projects.ritusWebsite',
    analyticsId: 'portfolio_ritusWebsite',
    title: 'Ritus de Luz Website',
    subtitle: 'Website sensorial e narrativo',
    tags: ['Flutter', 'Design', 'Storytelling'],
  },
  {
    id: 'zenbodhiApp',
    href: '/projects/zenbodhi',
    gradient: 'portfolio-card-4',
    translationKey: 'portfolio.projects.zenbodhiApp',
    analyticsId: 'portfolio_zenbodhiApp',
    title: 'ZenBodhi App',
    subtitle: 'Aplicativo de meditação e consciência',
    tags: ['React Native', 'Firebase', 'UX'],
  },
]
