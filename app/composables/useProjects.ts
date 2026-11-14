export interface Project {
  title: string
  period: string
  description: string
  url?: string
  image?: string
  tags: string[]
  featured?: boolean
  order?: number
}
export function useProjects() {
  return useAsyncData('projects', async () => {
    const items = await queryCollection('projects').all() as Project[]
    return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  })
}