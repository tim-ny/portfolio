export interface Experience {
  role: string
  company: string
  period: string
  location?: string
  bullets: string[]
  tags: string[]
  order?: number
}
export function useExperience() {
  return useAsyncData('experience', async () => {
    const items = await queryCollection('experience').all() as Experience[]
    return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  })
}