# Portfolio

A content-driven portfolio built with [Nuxt 4](https://nuxt.com), [Nuxt Content](https://content.nuxt.com) and [Tailwind CSS v4](https://tailwindcss.com), styled to match the original static design. Hosted on Cloudflare Pages.

## Editing content

All wording, links and structured data live in `content/`. Edit the Markdown/YAML files and rebuild.

| File / folder | What it controls |
| --- | --- |
| `content/site.yml` | Name, role, location, email, headline, about paragraphs, footer |
| `content/socials/*.yml` | Social links in the sidebar |
| `content/skills/*.yml` | Skill groups |
| `content/experience/*.yml` | Career timeline entries |
| `content/projects/*.yml` | Project cards (set `url` to link a project) |
| `content/pages/*.md` | Standalone pages (rendered at `/<slug>`) |

## Theme

Colors are defined as CSS variables in `app/assets/css/main.css` (`:root` for dark, `[data-theme="light"]` for light). Change them there — single source of truth. A toggle in the sidebar switches modes and persists to `localStorage`.

## Resume

Place (or replace) `public/resume.pdf`. The sidebar "Resume" button downloads it.

## Brand

`public/brand.svg` is the logo/favicon/OG image source. Replace it to rebrand.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Production

```bash
npm run generate   # outputs .output/public
```

## Deploy to Cloudflare Pages

1. Push the repository.
2. Create a Pages project from the repo.
3. Build command: `npm run generate`
4. Build output directory: `.output/public`
5. (Optional) set `NUXT_PUBLIC_SITE_URL`.

## Best practices followed

- Content fully decoupled via typed collections and Zod schemas.
- Data fetching centralized in composables.
- Small, single-purpose components; inline icon set.
- Tailwind v4 tokens + custom CSS, theme variables as single source of truth.
- Static generation for Cloudflare Pages.