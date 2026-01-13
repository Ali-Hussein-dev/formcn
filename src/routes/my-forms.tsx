import { createFileRoute } from '@tanstack/react-router'
import { MdInfo } from "react-icons/md"
import { MyForms } from "@/form-builder/components/my-forms"

export const Route = createFileRoute("/my-forms")({
	validateSearch: (search: Record<string, unknown>) => ({
		id: (search.id as string) || undefined,
	}),
	component: RouteComponent,
})

function RouteComponent() {
  return (
			<div>
				<div className="md:hidden text-center py-2 bg-accent text-destructive mb-2">
					<MdInfo className="inline mr-2 size-5" />
					The form builder works best on desktop
				</div>
				<MyForms />
			</div>
		)
}
