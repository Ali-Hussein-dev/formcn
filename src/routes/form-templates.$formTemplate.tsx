import { createFileRoute } from '@tanstack/react-router'
import { MyForms } from '@/form-builder/components/my-forms'
import { templates } from '@/form-builder/constant/templates'

/** Template-specific meta descriptions for SEO (≤160 chars) */
const templateDescriptions: Record<string, string> = {
	'template-signup':
		'Free signup form template with email, password & social login. Build production-ready shadcn forms with Formcn.',
	'template-credit-card':
		'Credit card payment form template. Secure checkout form with shadcn components. Customize and deploy in minutes.',
	'template-login':
		'Login form template with email, password & social auth. Copy-paste ready shadcn form for your React app.',
	'template-employee-onboarding':
		'Multi-step employee onboarding form. Collect personal info, employment details & documents with shadcn stepper.',
	'template-feedback-form':
		'Feedback form template for collecting user insights. Simple, accessible shadcn form you can customize and export.',
	'template-waitlist':
		'Waitlist signup form template. Grow your audience with a clean email capture form built with shadcn.',
	'template-contact-us':
		'Contact form template with name, email & message fields. Production-ready shadcn form for your website.',
	'template-multi-step-form':
		'Multi-step survey form template. Guide users through personal details, contact info & preferences with shadcn.',
	'template-job-application':
		'Job application form with resume upload. Professional hiring form template built with shadcn components.',
	'template-job-application-multistep':
		'Multi-step job application form. Collect candidate info, experience & portfolio across guided steps.',
	'template-event-registration':
		'Event registration form template. Ticket types, attendee details & special requirements with shadcn.',
	'template-product-order':
		'Product order form with billing and payment options. E-commerce checkout form template.',
	'template-customer-support':
		'Customer support ticket form. Issue categories, priority levels & description with shadcn form builder.',
}

const DEFAULT_DESCRIPTION =
	'Build and customize this form with Formcn. Free shadcn form templates you can edit and export for your React app.'

export const Route = createFileRoute('/form-templates/$formTemplate')({
	component: FormTemplateRouteComponent,
	head: ({ params }) => {
		const template = templates.find((t) => t.id === params.formTemplate)
		const title = template?.title ?? 'Form'
		const fullTitle = `${title} | Formcn`
		const description =
			templateDescriptions[params.formTemplate] ?? DEFAULT_DESCRIPTION

		return {
			meta: [
				{ title: fullTitle },
				{ name: 'description', content: description },
				{ property: 'og:title', content: fullTitle },
				{ property: 'og:description', content: description },
				{ property: 'og:type', content: 'website' },
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: fullTitle },
				{ name: 'twitter:description', content: description },
			],
		}
	},
})

function FormTemplateRouteComponent() {
	return <MyForms />
}
