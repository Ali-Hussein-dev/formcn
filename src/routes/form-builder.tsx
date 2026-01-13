import { createFileRoute } from "@tanstack/react-router"
import { MdInfo } from "react-icons/md"
import { FormBuilder } from "@/form-builder/components/form-builder"

export const Route = createFileRoute("/form-builder")({
	validateSearch: (search: Record<string, unknown>) => ({
		id: (search.id as string) || undefined,
	}),
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="max-w-8xl mx-auto w-full relative ">
			<div className="lg:hidden text-center py-2 bg-accent text-destructive">
				<MdInfo className="inline mr-2 size-5" />
				The form builder works best on desktop
			</div>
			<FormBuilder />
		</div>
	)
}
