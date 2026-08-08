const UTM_KEY = "niki_utm"

export function captureUtm() {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)
  const utm = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    ref: params.get("ref") || "",
  }

  const hasUtm = Object.values(utm).some((v) => v)
  if (hasUtm) {
    try {
      localStorage.setItem(UTM_KEY, JSON.stringify(utm))
    } catch {
      /* ignore */
    }
  }

  return utm
}

export function getUtm() {
  if (typeof window === "undefined") return {}

  try {
    const stored = localStorage.getItem(UTM_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function isPhReferral() {
  const utm = getUtm()
  return utm.utm_source === "producthunt" || utm.ref === "producthunt"
}
