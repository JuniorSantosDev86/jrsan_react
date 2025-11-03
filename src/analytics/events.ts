import { pushToDataLayer } from './gtm'

type EventParams = Record<string, unknown>

export const trackEvent = (eventName: string, params: EventParams = {}) => {
  if (typeof window === 'undefined') return
  pushToDataLayer({
    event: eventName,
    eventTimestamp: Date.now(),
    ...params,
  })
}

export const trackPageView = (path: string, title?: string) => {
  if (typeof window === 'undefined') return
  pushToDataLayer({
    event: 'page_view',
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: title ?? document.title,
    language: document.documentElement.lang,
  })
}
