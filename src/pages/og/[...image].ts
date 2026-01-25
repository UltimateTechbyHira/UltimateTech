import type { APIRoute } from 'astro'
import { Buffer } from 'node:buffer'
import { getCollection } from 'astro:content'
import sharp from 'sharp'
import generatePostOG from '@/utils/og/post'
import generateSiteOG from '@/utils/og/site'

export async function getStaticPaths() {
  const posts = await getCollection('posts')
  const postPaths = posts.map(post => ({
    params: { image: `${post.id}.png` },
    props: { post },
  }))

  return [
    ...postPaths,
    { params: { image: 'index.png' }, props: { post: null } },
  ]
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props
  let svg

  if (post) {
    svg = await generatePostOG(post)
  }
  else {
    svg = await generateSiteOG()
  }

  // Convert SVG to PNG using sharp
  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer()

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
