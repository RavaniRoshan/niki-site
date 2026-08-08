import { Analytics, track as vercelTrack } from '@vercel/analytics/react'

export function track(name, opts = {}) {
  if (typeof window !== "undefined") {
    vercelTrack(name, opts)
  }
}

export default function SiteAnalytics() {
  return <Analytics />
}
