import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type ThemeMode = "dark" | "light"

function useThemeMode() {
	const [mode, setMode] = useState<ThemeMode>("dark")

	useEffect(() => {
		if (typeof document === "undefined") {
			return
		}

		const stored = window.localStorage.getItem("theme-mode") as ThemeMode | null
		const initial = stored ?? "dark"
		setMode(initial)
	}, [])

	useEffect(() => {
		if (typeof document === "undefined") {
			return
		}

		const root = document.documentElement
		root.classList.toggle("dark", mode === "dark")
		window.localStorage.setItem("theme-mode", mode)
	}, [mode])

	const toggleMode = () =>
		setMode((current) => (current === "dark" ? "light" : "dark"))

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
				<title>Theme</title>
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
