import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxt/content', '@nuxt/image'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/about'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#082052', media: '(prefers-color-scheme: dark)' },
        { name: 'theme-color', content: '#F8F0E5', media: '(prefers-color-scheme: light)' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
        },
      ],
      script: [
        {
          innerHTML:
            "try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){}",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://timny.dev',
    },
  },
})