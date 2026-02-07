import type {
  ThemeConfig,
} from '@/types'

export const themeConfig: ThemeConfig = {
  site: {
    title: 'Ultimate Tech',
    subtitle: 'How-to Tutorials, Coding, Ethical Hacks, Tips & Tricks',
    description: 'Just an another tech blog that provides the latest tech news, how-to tutorials, coding related content, and more.',
    i18nTitle: false,
    author: 'Harman Singh Hira',
    url: 'https://ultimatetech.org',
    base: '/',
    favicon: '/icons/favicon.ico',
    keywords: 'Ultimate Tech, Tech Blog, Technology, Latest Tech News, How-To Tutorials, Coding',
  },
  color: {
    mode: 'dark',
    light: {
      primary: 'oklch(25% 0.005 298)',
      secondary: 'oklch(40% 0.005 298)',
      background: 'oklch(96% 0.005 298)',
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.5)',
    },
    dark: {
      primary: 'oklch(92% 0.005 298)',
      secondary: 'oklch(77% 0.005 298)',
      background: 'oklch(22% 0.005 298)',
      highlight: 'oklch(0.93 0.195089 103.2532 / 0.2)',
    },
  },
  global: {
    locale: 'en',
    moreLocales: [],
    fontStyle: 'sans',
    dateFormat: 'YYYY-MM-DD',
    toc: true,
    katex: true,
    reduceMotion: false,
    pageSize: 8,
  },
  comment: {
    enabled: true,
    giscus: {
      repo: 'UltimateTechbyHira/UltimateTech',
      repoId: 'R_kgDOQ-0TbA',
      category: 'General',
      categoryId: 'DIC_kwDOQ-0TbM4C1T7v',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'bottom',
    },
  },
  seo: {
    twitterID: '@HSinghHira',
    twitterCreator: '@HSinghHira',
    verification: {
      google: '',
      bing: '',
      yandex: '',
      baidu: '',
    },
    googleAnalyticsID: 'G-HC709WNBBN',
    umamiAnalyticsID: 'eac92e7f-bb62-4f02-89dd-1b4fe29fbc71',
    follow: {
      feedID: '',
      userID: '',
    },
    robots: 'index, follow',
    googlebot: 'index, follow',
    bingbot: 'index, follow',
  },
  footer: {
    links: [{
      name: 'RSS',
      url: '/atom.xml',
    }, {
      name: 'GitHub',
      url: 'https://github.com/HSinghHira',
    }, {
      name: 'Twitter',
      url: 'https://x.com/HSinghHira',
    }],
    startYear: 2026,
  },
  preload: {
    imageHostURL: '',
    customGoogleAnalyticsJS: '',
    customUmamiAnalyticsJS: 'https://views.radishzz.cc/script.js',
  },
}
export const base = themeConfig.site.base === '/' ? '' : themeConfig.site.base.replace(/\/$/, '')
export const defaultLocale = themeConfig.global.locale
export const moreLocales = themeConfig.global.moreLocales
export const allLocales = [defaultLocale, ...moreLocales]
