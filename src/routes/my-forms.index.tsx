import { createFileRoute, Navigate } from '@tanstack/react-router'
import { templates } from '@/form-builder/constant/templates'

export const Route = createFileRoute("/my-forms/")({
	component: MyFormsIndexRedirect,
})

function MyFormsIndexRedirect() {
	return (
		<Navigate
			to="/my-forms/$formTemplate"
			params={{ formTemplate: templates[0].id }}
			replace
		/>
	)
}
