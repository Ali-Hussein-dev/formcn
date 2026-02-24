import { createFileRoute } from '@tanstack/react-router'
import { MyForms } from '@/form-builder/components/my-forms'
import { templates } from '@/form-builder/constant/templates'

export const Route = createFileRoute('/form-templates/$formTemplate')({
	component: FormTemplateRouteComponent,
	head: ({ params }) => {
		const template = templates.find((t) => t.id === params.formTemplate)
		// Templates get SEO-friendly titles; drafts use generic title
		const title = template?.title ?? 'Form'
		return {
			meta: [{ title: `${title} | Formcn` }],
		}
	},
})

function FormTemplateRouteComponent() {
	return <MyForms />
}
