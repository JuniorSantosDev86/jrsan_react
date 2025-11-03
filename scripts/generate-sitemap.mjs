#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const ensureDirectory = (targetPath) => {
  const dir = path.dirname(targetPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

const loadRoutes = () => {
  const routeFile = path.resolve(process.cwd(), 'src/config/routes.json')
  const raw = fs.readFileSync(routeFile, 'utf-8')
  return JSON.parse(raw)
}

const routes = loadRoutes()

const SITE_URL = (process.env.VITE_SITE_URL || 'https://meu-dominio.com').replace(/\/+$/, '')
const nowIso = new Date().toISOString()

const locales = [
  { code: 'pt', locale: 'pt-BR' },
  { code: 'en', locale: 'en' },
]

const normalisePath = (value) => (value.startsWith('/') ? value : `/${value}`)

const getLocalizedUrl = (routePath, langCode) => {
  const normalised = normalisePath(routePath)
  const isDefault = langCode === 'pt'
  const query = isDefault ? '' : `?lang=${langCode}`
  return `${SITE_URL}${normalised}${query}`
}

const sitemapEntries = routes
  .map((route) => {
    const loc = `${SITE_URL}${normalisePath(route.path)}`
    const alternates = locales
      .map(
        (lang) =>
          `    <xhtml:link rel="alternate" hreflang="${lang.locale.toLowerCase()}" href="${getLocalizedUrl(route.path, lang.code)}" />`
      )
      .join('\n')
    const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${getLocalizedUrl(route.path, 'pt')}" />`
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>${route.changefreq ?? 'monthly'}</changefreq>
    <priority>${route.priority ?? 0.7}</priority>
${alternates}
${xDefault}
  </url>`
  })
  .join('\n')

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries}
</urlset>
`

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

const sitemapRobotsTxt = `Sitemap: ${SITE_URL}/sitemap.xml
User-agent: *
Allow: /
`

const writeTargets = [
  path.resolve(process.cwd(), 'public/sitemap.xml'),
  path.resolve(process.cwd(), 'dist/sitemap.xml'),
  path.resolve(process.cwd(), 'public/robots.txt'),
  path.resolve(process.cwd(), 'dist/robots.txt'),
  path.resolve(process.cwd(), 'public/sitemap-robots.txt'),
  path.resolve(process.cwd(), 'dist/sitemap-robots.txt'),
]

ensureDirectory(writeTargets[0])
ensureDirectory(writeTargets[2])
ensureDirectory(writeTargets[4])

fs.writeFileSync(writeTargets[0], sitemapXml, 'utf-8')
if (fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
  fs.writeFileSync(writeTargets[1], sitemapXml, 'utf-8')
}

fs.writeFileSync(writeTargets[2], robotsTxt, 'utf-8')
if (fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
  fs.writeFileSync(writeTargets[3], robotsTxt, 'utf-8')
}

fs.writeFileSync(writeTargets[4], sitemapRobotsTxt, 'utf-8')
if (fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
  fs.writeFileSync(writeTargets[5], sitemapRobotsTxt, 'utf-8')
}

console.log(`✅ Sitemap gerado em ${writeTargets[0]}`)
