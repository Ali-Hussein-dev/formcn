/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: Required to prevent theme flash before React hydrates */
import type React from 'react'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'
import { cn } from '@/lib/utils'

export type CodeBlockProps = {
	children?: React.ReactNode
	className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
	return (
		<div
			className={cn(
				'not-prose flex w-full flex-col overflow-clip border',
				'border-border bg-card text-card-foreground',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export type CodeBlockCodeProps = {
	code: string
	language?: string
	theme?: string
	className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlockCode({
	code,
	language = 'tsx',
	className,
	...props
}: CodeBlockCodeProps) {
	const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)
	const [theme, setTheme] = useState<'dark' | 'light'>('dark')

	useEffect(() => {
		if (typeof document === 'undefined') return

		const updateTheme = () => {
			const isDark = document.documentElement.classList.contains('dark')
			setTheme(isDark ? 'dark' : 'light')
		}

		// Initial theme
		updateTheme()

		// Watch for theme changes
		const observer = new MutationObserver(updateTheme)
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		})

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		async function highlight() {
			if (!code) {
				setHighlightedHtml('<pre><code></code></pre>')
				return
			}

			const html = await codeToHtml(code, {
				lang: language,
				theme: theme === 'light' ? 'github-light' : 'vesper',
			})
			setHighlightedHtml(html)
		}
		highlight()
	}, [code, language, theme])

	const classNames = cn(
		'w-full text-[13px] [&>pre]:px-4 [&>pre]:py-4 dark:[&>pre]:bg-accent! focus:outline-none focus-visible:outline-none [&>pre]:text-wrap',
		className,
	)

	// SSR fallback: render plain code if not hydrated yet
	return highlightedHtml ? (
		<div
			className={classNames}
			dangerouslySetInnerHTML={{ __html: highlightedHtml }}
			{...props}
		/>
	) : (
		<div className={classNames} {...props}>
			<pre>
				<code>{code}</code>
			</pre>
		</div>
	)
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>

function CodeBlockGroup({
	children,
	className,
	...props
}: CodeBlockGroupProps) {
	return (
		<div
			className={cn('flex items-center justify-between', className)}
			{...props}
		>
			{children}
		</div>
	)
}

export { CodeBlockGroup, CodeBlockCode, CodeBlock }
