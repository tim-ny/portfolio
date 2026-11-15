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
    { property: 'og:image', content: siteUrl + '/og/og-default.png' },
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
    { name: 'twitter:image', content: siteUrl + '/og/twitter-card-light.png' },
    { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#001840', media: '(prefers-color-scheme: dark)' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl + '/' },
    { rel: 'icon', href: '/favicons/favicon-light.ico', sizes: 'any', media: '(prefers-color-scheme: light)' },
    { rel: 'icon', href: '/favicons/favicon-dark.ico', sizes: 'any', media: '(prefers-color-scheme: dark)' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32-light.png', media: '(prefers-color-scheme: light)' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicons/favicon-32-dark.png', media: '(prefers-color-scheme: dark)' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16-light.png', media: '(prefers-color-scheme: light)' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicons/favicon-16-dark.png', media: '(prefers-color-scheme: dark)' },
    { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicons/favicon.ico', sizes: 'any' },
  ],
})
</script>

<template>
  <NuxtPage />
</template>
