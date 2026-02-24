import { createFileRoute, Navigate } from '@tanstack/react-router'
import { templates } from '@/form-builder/constant/templates'

export const Route = createFileRoute('/form-templates/')({
	component: FormTemplatesIndexRedirect,
})

function FormTemplatesIndexRedirect() {
	return (
		<Navigate
			to="/form-templates/$formTemplate"
			params={{ formTemplate: templates[0].id }}
			replace
		/>
	)
}
