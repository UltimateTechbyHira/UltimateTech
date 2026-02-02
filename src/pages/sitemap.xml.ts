import { getCollection } from 'astro:content'
import { allLocales, themeConfig } from '@/config'
import { getLangRouteParam } from '@/i18n/lang'

export async function GET() {
  const { url: siteURL } = themeConfig.site
  const posts = await getCollection('posts', ({ data }) => !data.draft)

  const pages = []

  // Add home pages and copyright pages for each locale
  for (const lang of allLocales) {
    const langParam = getLangRouteParam(lang)
    const langPath = langParam ? `${langParam}/` : ''

    // Home page
    pages.push({
      url: new URL(langPath, siteURL).href,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    })

    // Copyright page
    pages.push({
      url: new URL(`${langPath}copyright/`, siteURL).href,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.3,
    })
  }

  // Add posts
  for (const post of posts) {
    const slug = post.data.abbrlink || post.id
    const postDate = post.data.updated || post.data.published

    // A post can be in multiple languages if its lang is ''
    const postLangs = post.data.lang === '' ? allLocales : [post.data.lang]

    for (const lang of postLangs) {
      if (!allLocales.includes(lang as any))
        continue

      const langParam = getLangRouteParam(lang)
      const langPath = langParam ? `${langParam}/` : ''

      pages.push({
        url: new URL(`${langPath}posts/${slug}/`, siteURL).href,
        lastmod: postDate.toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      })
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
