import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: 'pages/*.md',
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string(),
        period: z.string(),
        description: z.string(),
        url: z.string().optional().default(''),
        image: z.string().optional().default(''),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        order: z.number().default(0),
      }),
    }),
    experience: defineCollection({
      type: 'data',
      source: 'experience/*.yml',
      schema: z.object({
        role: z.string(),
        company: z.string(),
        period: z.string(),
        location: z.string().optional(),
        bullets: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        order: z.number().default(0),
      }),
    }),
    skills: defineCollection({
      type: 'data',
      source: 'skills/*.yml',
      schema: z.object({
        category: z.string(),
        items: z.array(z.string()).default([]),
        order: z.number().default(0),
      }),
    }),
    socials: defineCollection({
      type: 'data',
      source: 'socials/*.yml',
      schema: z.object({
        label: z.string(),
        url: z.string(),
        order: z.number().default(0),
      }),
    }),
    site: defineCollection({
      type: 'data',
      source: 'site.yml',
      schema: z.object({
        name: z.string(),
        role: z.string(),
        location: z.string(),
        email: z.string(),
        url: z.string(),
        headline: z.string(),
        intro: z.string(),
        about: z.array(z.string()).default([]),
        education: z.string().optional(),
        employer: z.string().optional(),
        footer: z.string().optional(),
      }),
    }),
  },
})