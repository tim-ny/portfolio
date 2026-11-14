<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, async () => {
  const all = await queryCollection('pages').all()
  return (
    all.find((p: any) => p.path === route.path) ||
    all.find((p: any) => p.path === `/pages${route.path}`) ||
    all.find((p: any) => p.path?.endsWith(route.path)) ||
    null
  )
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useHead(() => ({
  title: page.value?.title ?? 'Page',
  meta: [{ name: 'description', content: page.value?.description ?? '' }],
}))
</script>

<template>
  <div>
    <AmbientBackground />
    <MobileNav />
    <div class="layout">
      <SiteSidebar />
      <main id="main">
        <section>
          <div class="prose">
            <ContentRenderer :value="page" />
          </div>
        </section>
        <footer><NuxtLink to="/">← Home</NuxtLink></footer>
      </main>
    </div>
  </div>
</template>