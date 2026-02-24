import { createFileRoute, Outlet } from '@tanstack/react-router'
import { MdInfo } from 'react-icons/md'

export const Route = createFileRoute('/form-templates')({
	component: FormTemplatesLayout,
})

function FormTemplatesLayout() {
	return (
		<div>
			<div className="md:hidden text-center py-2 bg-accent text-destructive mb-2">
				<MdInfo className="inline mr-2 size-5" />
				The form builder works best on desktop
			</div>
			<Outlet />
		</div>
	)
}
