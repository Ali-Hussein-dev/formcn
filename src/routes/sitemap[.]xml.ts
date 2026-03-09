import { createFileRoute } from '@tanstack/react-router'
import { templates } from '@/form-builder/constant/templates'

const BASE_URL = 'https://formcn.dev'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().split('T')[0]

        const staticPaths = [
          '/',
          '/ai-form-generator',
          '/changelog',
          '/form-builder',
          '/form-templates',
          '/form-templates/',
          '/my-forms',
          '/my-forms/',
        ]

        const templatePaths = templates.map(
          (template) => `/form-templates/${template.id}`,
        )

        const allPaths = [...staticPaths, ...templatePaths]

        const urlsXml = allPaths
          .map(
            (path) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
          )
          .join('')

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
          },
        })
      },
    },
  },
})
