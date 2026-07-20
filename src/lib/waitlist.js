// Canonical segment values, shared so the Pricing CTA and the Waitlist page
// always agree on the exact string passed via the `?segment=` query param.

export const SEGMENT_SELF_HOSTED = 'Self-hosted (BYOK)'
export const SEGMENT_MANAGED_CLOUD = 'Managed cloud (enterprise)'
export const SEGMENT_UNSURE = 'Not sure yet'

export const SEGMENTS = [
  SEGMENT_SELF_HOSTED,
  SEGMENT_MANAGED_CLOUD,
  SEGMENT_UNSURE,
]
