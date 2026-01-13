import { Loader2 } from 'lucide-react'

export function Loader() {
	return (
		<div className="flex h-full items-center justify-center pt-8">
			<Loader2 className="animate-spin" />
		</div>
	)
}
