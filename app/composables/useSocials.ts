export interface SocialLink { label: string; url: string; order?: number }
export function useSocials() {
  return useAsyncData('socials', async () => {
    const items = await queryCollection('socials').all() as SocialLink[]
    return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  })
}