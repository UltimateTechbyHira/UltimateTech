import type { Font } from 'satori'
import { themeConfig } from '@/config'

async function loadGoogleFont(text: string): Promise<Font[]> {
  const fonts: Font[] = []
  const siteUrl = themeConfig.site.url.replace(/\/$/, '')

  try {
    // Try to load Noto Sans SC from site assets
    const fontResponse = await fetch(`${siteUrl}/fonts/NotoSansSC-Bold.otf`)
    if (fontResponse.ok) {
      const fontData = await fontResponse.arrayBuffer()
      fonts.push({
        name: 'Noto Sans SC',
        data: fontData,
        weight: 700,
        style: 'normal',
      })
    }

    const regularResponse = await fetch(`${siteUrl}/fonts/NotoSansSC-Regular.otf`)
    if (regularResponse.ok) {
      const regularData = await regularResponse.arrayBuffer()
      fonts.push({
        name: 'Noto Sans SC',
        data: regularData,
        weight: 400,
        style: 'normal',
      })
    }
  }
  catch (e) {
    console.error('Failed to load local fonts, trying Google Fonts API...', e)
  }

  // Fallback or additional fonts if needed:
  if (fonts.length === 0) {
    const API = `https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&text=${encodeURIComponent(text)}`
    const css = await (await fetch(API)).text()
    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

    if (resource) {
      const response = await fetch(resource[1])
      if (response.ok) {
        fonts.push({
          name: 'Noto Sans SC',
          data: await response.arrayBuffer(),
          weight: 400,
          style: 'normal',
        })
      }
    }
  }

  return fonts
}

export default loadGoogleFont
