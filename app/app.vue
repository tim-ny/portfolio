<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')

useHead({
  script: [
    {
      innerHTML:
        "(function(){try{var m=window.matchMedia('(prefers-color-scheme: dark)');document.documentElement.dataset.theme=m.matches?'dark':'light';}catch(e){}})();",
    },
  ],
  title: 'Timothy Nyambane · Full Stack Developer',
  meta: [
    {
      name: 'description',
      content:
        'Timothy Nyambane is a full stack developer in Nairobi building campaign platforms, web apps and mobile apps with Vue, Nuxt, Laravel, Nest and Flutter.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Timothy Nyambane' },
    {
      property: 'og:title',
      content: 'Timothy Nyambane · Full Stack Developer',
    },
    {
      property: 'og:description',
      content:
        'Full stack developer building campaign platforms, web apps, and mobile apps that stay fast under load.',
    },
    { property: 'og:url', content: siteUrl + '/' },
    { property: 'og:image', content: siteUrl + '/og-image.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Timothy Nyambane logo' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Timothy Nyambane · Full Stack Developer',
    },
    {
      name: 'twitter:description',
      content:
        'Full stack developer building campaign platforms, web apps, and mobile apps that stay fast under load.',
    },
    { name: 'twitter:image', content: siteUrl + '/og-image.png' },
  ],
  link: [{ rel: 'canonical', href: siteUrl + '/' }],
})
</script>

<template>
  <NuxtPage />
</template>
