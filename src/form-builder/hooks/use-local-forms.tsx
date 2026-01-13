import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FormElementOrList, FormStep } from '@/form-builder/form-types'

/**
 * When action should be applied
 *
 */

// type FormElementswithSteps = {
//   isMS: true;
//   formElements: FormStep[];
// };

// type FormElementswithoutSteps = {};
export type RootForm = {
	id: string
	name: string
	createdAt: string
	updatedAt: string
	isMS: boolean
	formElements: FormElementOrList[] | FormStep[]
}
// & (FormElementswithSteps | FormElementswithoutSteps);

interface SavedFormsState {
	forms: RootForm[]

	// Actions
	// getForms: () => RootForm[];
	getFormById: (id: string) => RootForm | undefined
	deleteForm: (id: string) => void
	updateForm: (form: Partial<RootForm>) => void
	setForm: (form: RootForm) => void

	initializeForm: (name: string, options: { isMS: boolean }) => RootForm
}

export const useLocalForms = create<SavedFormsState>()(
	persist(
		(set, get) => ({
			forms: [],
			setForm: (form) => {
				set((state) => ({
					forms: [...state.forms, form],
				}))
			},

			// Get a specific form by ID
			getFormById: (id: string) => {
				const { forms } = get()
				return forms.find((form) => form.id === id) as RootForm
			},

			// Delete a form by ID
			deleteForm: (id: string) => {
				set((state) => ({
					forms: state.forms.filter((form) => form.id !== id),
				}))
			},

			// Update an existing form
			updateForm: ({ id, name, formElements }) => {
				set(({ forms }) => {
					const updatedForms = [...forms].map((form: RootForm) => {
						if (form.id === id) {
							return {
								...form,
								name: name || form.name,
								formElements: formElements || form.formElements,
								updatedAt: new Date().toISOString(),
							} as RootForm
						}
						return form
					}) as RootForm[]
					return {
						forms: updatedForms,
					}
				})
			},
			// create a new form
			initializeForm: (name, { isMS }) => {
				const now = new Date().toISOString()
				const newForm: RootForm = {
					id: crypto.randomUUID(),
					name,
					formElements: [],
					isMS,
					createdAt: now,
					updatedAt: now,
				} as RootForm
				set((state) => ({
					forms: [...state.forms, newForm],
				}))

				return newForm
			},
		}),
		{
			name: 'formcn-forms-list', // localStorage key
			version: 1, // version for migration support
		},
	),
)

export default useLocalForms
