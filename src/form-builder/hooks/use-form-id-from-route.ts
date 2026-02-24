import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { templates } from '@/form-builder/constant/templates'

/**
 * Returns the current form ID from path params (form-templates) or search params (my-forms).
 * Prefers path-based routing for better SEO.
 */
export function useFormIdFromRoute() {
	const navigate = useNavigate()
	const formTemplateParam = useParams({
		strict: false,
		shouldThrow: false,
	})?.formTemplate

	const searchParams = useSearch({
		strict: false,
		shouldThrow: false,
	})

	// Path param when on form-templates; search param when on my-forms
	const formId = formTemplateParam ?? searchParams?.id

	const navigateToForm = useCallback(
		(id: string) => {
			navigate({
				to: '/form-templates/$formTemplate',
				params: { formTemplate: id },
			})
		},
		[navigate],
	)

	return useMemo(() => ({ formId, navigateToForm }), [formId, navigateToForm])
}

/**
 * Hook to get the default template for redirects
 */
export function useDefaultTemplateId() {
	return templates[0].id
}
