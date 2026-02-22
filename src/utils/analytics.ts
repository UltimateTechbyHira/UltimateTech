/**
 * Central Analytics Utility for GA4 and Umami
 */

export function trackEvent(name: string, data?: Record<string, any>) {
  if (typeof window === 'undefined')
    return

  // Track with GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, data)
  }

  // Track with Umami
  if (typeof window.umami?.track === 'function') {
    window.umami.track(name, data)
  }
}

/**
 * Track Scroll Depth (25%, 50%, 75%, 100%)
 */
export function trackScrollDepth(currentSlug: string) {
  if (typeof window === 'undefined')
    return

  const thresholds = [25, 50, 75, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    if (scrollHeight <= 0)
      return

    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)

    thresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold)
        trackEvent('scroll_depth', {
          percent: threshold,
          post: currentSlug,
        })
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}

/**
 * Track Time on Article (30s, 90s)
 */
export function trackEngagementTime(currentSlug: string) {
  if (typeof window === 'undefined')
    return

  const times = [30, 90]
  const timers: number[] = []

  times.forEach((seconds) => {
    const timer = window.setTimeout(() => {
      trackEvent('engaged_time', {
        seconds,
        post: currentSlug,
      })
    }, seconds * 1000)
    timers.push(timer)
  })

  return () => timers.forEach(timer => clearTimeout(timer))
}

/**
 * Track Outbound Link Clicks
 */
export function trackOutboundClicks(currentSlug: string) {
  if (typeof window === 'undefined')
    return

  const handleClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('a')
    if (!target || !target.href)
      return

    const url = new URL(target.href, window.location.origin)
    const isExternal = url.origin !== window.location.origin

    if (isExternal && url.protocol.startsWith('http')) {
      trackEvent('outbound_click', {
        url: target.href,
        post: currentSlug,
      })
    }
  }

  document.addEventListener('click', handleClick)
  return () => document.removeEventListener('click', handleClick)
}

/**
 * Track Code Copy Events
 */
export function trackCodeCopy(currentSlug: string) {
  if (typeof window === 'undefined')
    return

  const handleClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest('[data-copy-code]')
    if (target) {
      trackEvent('code_copy', {
        post: currentSlug,
      })
    }
  }

  document.addEventListener('click', handleClick)
  return () => document.removeEventListener('click', handleClick)
}
