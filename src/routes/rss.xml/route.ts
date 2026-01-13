import { createFileRoute } from '@tanstack/react-router'
import { generateRegistryRssFeed } from '@wandry/analytics-sdk'

export const Route = createFileRoute('/rss/xml')({
	server: {
		handlers: {
			GET: async ({ request }: { request: Request }) => {
				const baseUrl = new URL(request.url).origin

				const rssXml = await generateRegistryRssFeed({
					baseUrl,
					rss: {
						title: '@formcn',
						description: 'Subscribe to @formcn updates',
						link: 'https://formcn.dev',
						pubDateStrategy: 'githubLastEdit',
					},
					github: {
						owner: 'ali-Hussein-dev',
						repo: 'formcn',
						token: process.env.GITHUB_TOKEN ?? '',
					},
				})

				if (!rssXml) {
					return new Response('RSS feed not available', {
						status: 404,
						headers: { 'Content-Type': 'text/plain' },
					})
				}

				return new Response(rssXml, {
					headers: {
						'Content-Type': 'application/rss+xml; charset=utf-8',
						'Cache-Control':
							'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
					},
				})
			},
		},
	},
})
