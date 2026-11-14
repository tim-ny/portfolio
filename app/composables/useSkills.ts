export interface SkillGroup { category: string; items: string[]; order?: number }
export function useSkills() {
  return useAsyncData('skills', async () => {
    const items = await queryCollection('skills').all() as SkillGroup[]
    return items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  })
}