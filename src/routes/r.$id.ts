import { createFileRoute } from '@tanstack/react-router'
import { Redis } from '@upstash/redis'

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const responseHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Content-Type': 'application/json',
}

export const Route = createFileRoute('/r/$id' as any)({
	validateSearch: () => ({}),
	server: {
		handlers: {
			GET: async ({ params }: { params: { id: string } }) => {
				const { id } = params

				// Strip .json extension if present
				const registryId = id.endsWith('.json') ? id.slice(0, -5) : id

				try {
					const registryItem = await redis.get(registryId)
					if (!registryItem) {
						return new Response('Registry item not found', {
							status: 404,
							headers: responseHeaders,
						})
					}
					return new Response(JSON.stringify(registryItem), {
						status: 200,
						headers: responseHeaders,
					})
				} catch (error) {
					console.error(error)
					return new Response('Something went wrong', {
						status: 500,
						headers: responseHeaders,
					})
				}
			},
			POST: async ({
				params,
				request,
			}: {
				params: { id: string }
				request: Request
			}) => {
				try {
					const body = await request.json()
					const { registryDependencies, dependencies, files, name } = body
					const { id: key } = params
					const registry = {
						$schema: 'https://ui.shadcn.com/schema/registry.json',
						homepage: 'https://formcn.dev',
						author: 'formcn (https://formcn.dev)',
						name,
						dependencies,
						registryDependencies,
						type: 'registry:block',
						files,
					}

					// Use Redis for both dev and production since file system APIs aren't available
					await redis.set(key, JSON.stringify(registry), {
						ex: 60 * 60, // 1 hour
					})

					const isDev = process.env.NODE_ENV === 'development'
					const registryId = isDev
						? `http://localhost:3000/r/${key}.json`
						: `@formcn/${key}`

					return new Response(
						JSON.stringify({
							data: {
								id: registryId,
							},
							error: null,
						}),
						{
							status: 200,
							headers: responseHeaders,
						},
					)
				} catch (error) {
					console.error(error)
					return new Response(
						JSON.stringify({
							data: null,
							error: error instanceof Error ? error.message : String(error),
						}),
						{
							status: 500,
							headers: responseHeaders,
						},
					)
				}
			},
		},
	},
})
