import { useEffect } from 'react'

export const SITE_URL = 'https://niki-site.vercel.app'
export const SITE_NAME = 'Niki'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

export const SEO_TITLE = 'Niki · Multi-agent coding pipeline that ships verified pull requests'
export const SEO_DESCRIPTION = 'Four independent LLM agents plan, code, test, and review in hermetic sandboxes — then hand you a verified niki/<id> branch with a full audit trail. Open source, BYOK, no telemetry.'

function setMeta(selector, attrs) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = document.createElement('meta')
    document.head.appendChild(node)
  }
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value))
}

function setLink(rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`)
  if (!node) {
    node = document.createElement('link')
    node.setAttribute('rel', rel)
    document.head.appendChild(node)
  }
  node.setAttribute('href', href)
}

export function Seo({ title, description, path = '/', image = OG_IMAGE, type = 'website', robots = 'index, follow' }) {
  useEffect(() => {
    const url = new URL(path, SITE_URL).toString()

    document.title = title
    setLink('canonical', url)

    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[name="robots"]', { name: 'robots', content: robots })

    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image })

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
  }, [description, image, path, title, type, robots])

  return null
}
