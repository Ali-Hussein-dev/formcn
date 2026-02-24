import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type ThemeMode = 'dark' | 'light'

export function useThemeMode() {
	// Use lazy initializer to read from localStorage synchronously before first render
	const [mode, setMode] = useState<ThemeMode>(() => {
		if (typeof window === 'undefined') {
			return 'dark'
		}
		const stored = window.localStorage.getItem('theme-mode') as ThemeMode | null
		const initial = stored ?? 'dark'
		// Apply theme immediately before React renders to prevent flash
		document.documentElement.classList.toggle('dark', initial === 'dark')
		return initial
	})

	useEffect(() => {
		if (typeof document === 'undefined') {
			return
		}

		const root = document.documentElement
		root.classList.toggle('dark', mode === 'dark')
		window.localStorage.setItem('theme-mode', mode)
	}, [mode])

	const toggleMode = () =>
		setMode((current) => (current === 'dark' ? 'light' : 'dark'))

	return {
		mode,
		toggleMode,
	}
}

export function ModeToggle() {
	const { toggleMode } = useThemeMode()
	return (
		<Button onClick={toggleMode} size="icon" variant="ghost" type="button">
			<svg
				viewBox="0 0 32 32"
				width="24"
				height="24"
				fill="currentcolor"
				className="block"
			>
				<circle
					cx="16"
					cy="16"
					r="14"
					fill="none"
					stroke="currentcolor"
					strokeWidth="4"
				></circle>
				<path
					d="
        M 16 0
        A 16 16 0 0 0 16 32
        z"
				></path>
			</svg>
		</Button>
	)
}
