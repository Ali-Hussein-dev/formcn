/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { Toaster } from '../components/ui/sonner'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import appCss from '../styles.css?url'
import { PostHogProvider } from 'posthog-js/react'
import posthog from '../lib/posthog'

interface MyRouterContext {
	queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: 'Modern shadcn form builder | Formcn',
			},
			{
				description:
					'Build production-ready shadcn form with a few clicks, including shadcn multi-step form.',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				<script
					dangerouslySetInnerHTML={{
						__html: `
						(function() {
							try {
								const theme = localStorage.getItem('theme-mode') || 'dark';
								document.documentElement.classList.toggle('dark', theme === 'dark');
							} catch (e) {}
						})();
					`,
					}}
				/>
			</head>
			<body>
				<PostHogProvider client={posthog}>
					{children}
					<Toaster />
					<TanStackDevtools
						config={{
							position: 'bottom-right',
						}}
						plugins={[
							{
								name: 'Tanstack Router',
								render: <TanStackRouterDevtoolsPanel />, 
							},
							TanStackQueryDevtools,
						]}
					/>
					<Scripts />
				</PostHogProvider>
			</body>
		</html>
	)
}