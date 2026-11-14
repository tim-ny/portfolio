export interface SiteSettings {
  name: string
  role: string
  location: string
  email: string
  url: string
  headline: string
  intro: string
  about: string[]
  education?: string
  employer?: string
  footer?: string
}

export function useSiteSettings() {
  return useAsyncData('site-settings', () =>
    queryCollection('site').first() as Promise<SiteSettings | null>
  )
}