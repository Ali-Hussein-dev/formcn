'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { aiFormSchema } from '@/form-builder/lib/ai-form-schema'
import { Form } from '@/components/ui/form'
import { useForm, type UseFormReturn } from 'react-hook-form'
import { ErrorBoundary } from 'react-error-boundary'
import useFormBuilderStore from '@/form-builder/hooks/use-form-builder-store'
import React from 'react'
import { ArrowLeft, ArrowUp, Info, Pencil } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import useLocalForms from '@/form-builder/hooks/use-local-forms'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ErrorFallback } from '@/components/shared/error-fallback'
import {
	fieldTypes,
	formFieldTypeWithOptions,
	type FormFieldTypeWithOptions,
	type FormElement,
	type FormFieldType,
	type FormStep,
} from '@/form-builder/form-types'
import { RenderFormElement } from '@/form-builder/components/edit/render-form-element'
import { MdOutlineReplay } from 'react-icons/md'
import { MultiStepFormPreview } from '../preview/multi-step-form-preview'

// const list = [];
function RenderFormWhileStreaming({
	list,
	form,
}: {
	list: FormElement[] | undefined
	form: any
}) {
	if (!list) return null
	return (
		<div className="space-y-3">
			{list.map((element, i) => {
				if (
					!fieldTypes.includes(element.fieldType as FormFieldType) ||
					(!element?.name && !('content' in element))
				)
					return <span key={crypto.randomUUID()}>streaming...</span>
				if (
					formFieldTypeWithOptions.includes(
						element.fieldType as FormFieldTypeWithOptions,
					) &&
					// @ts-expect-error options exists
					(!element.options || element.options?.length < 1)
				) {
					return <span key={crypto.randomUUID()}>streaming...</span>
				}
				if (element.fieldType == 'SocialMediaButtons') {
					if (!element.links || element.links?.length < 1) {
						return <span key={crypto.randomUUID()}>streaming...</span>
					}
				}
				return (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: -12, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.3 }}
					>
						<ErrorBoundary FallbackComponent={ErrorFallback}>
							<RenderFormElement formElement={element} form={form} />
						</ErrorBoundary>
					</motion.div>
				)
			})}
		</div>
	)
}

const promptExamples = [
	{
		label: 'RSVP Event',
		prompt:
			'Create a form that allows users to RSVP for an event. The form should collect attendee names, contact information (email and phone), number of guests, and include any special requirements or comments. Add a date/time picker for the event, and a field for selecting attendance (Yes/No/Maybe).',
	},
	{
		label: 'New Employee',
		prompt:
			'a new employee professional form for startup Acme works in IoT. split it into two sections',
	},
	{
		label: 'Survey Form',
		prompt: `Create a survey form for React library that includes these sections:  
    First, multiple choice questions where users pick from several options. Next, include at least one open-ended question for written feedback. Finally, add a rating scale question so users can rate their experience numerically. Label each section clearly and make sure all three types are present.`,
	},
	{
		label: 'Booking/Reservation Form',
		prompt:
			'create a hotel booking form to collect guest details including title, description, name, contact info, check-in and check-out dates, room type selection, and any additional requests',
	},
	{
		label: 'Multi-Step: Customer Onboarding',
		prompt: `Generate a multi‑step customer onboarding form for a SaaS subscription product.
Step 1: Account info (company name, company size dropdown, industry dropdown, work email, password + confirm password).
Step 2: Billing details (billing contact name, email, country dropdown, tax/VAT ID optional, billing address fields).
Step 3: Plan selection (radio buttons: Starter, Pro, Enterprise with short descriptions) and number of seats (number).
Step 4: Usage preferences (checkboxes: email notifications, product updates, marketing emails; preferred support channel radio: email, chat, phone).
Include validations for email, password strength, required fields, and show clear step titles for each page`,
	},
	{
		label: 'Multi-Step: Job Application',
		prompt: `Generate a multi‑step job application form for a job posting.
Step 1: Personal info (name, email, phone, address).
Step 2: Education (school name, degree, graduation year).
Step 3: Work experience (company name, job title, start and end dates).
Step 4: Skills (checkboxes: HTML, CSS, JavaScript, React, Node.js, etc.).
Include validations for required fields, and show clear step titles for each page`,
	},
]
const useAiFormGenerator = () => {
	const [prompt, setPrompt] = useState('')
	const inputRef = React.useRef<HTMLTextAreaElement | null>(null)

	const { object, submit, isLoading, error, stop } = useObject({
		api: `/api/generate?prompt=${encodeURIComponent(prompt)}`,
		// @ts-ignore error message is verbose and messy
		schema: aiFormSchema,
		// initialValue: {
		//   form: {
		//     title: "New Form",
		//     fields: list,
		//   },
		// },
	})

	const handleGenerate = async () => {
		if (!prompt.trim()) return
		submit({ prompt })
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			if (!isLoading && prompt.trim()) {
				handleGenerate()
			}
		}
	}

	const form = useForm()
	const setFormElements = useFormBuilderStore((s) => s.setFormElements)
	const saveForm = useLocalForms((s) => s.setForm)
	const router = useRouter()

	const handleSave = () => {
		toast.message('Saving form...')
		const isMS = object?.form?.isMS ?? false
		const fields = object?.form?.fields

		const formElements = isMS
			? // Multi‑step form: normalize each step and its fields
				((fields ?? []) as FormStep[]).map((step) => ({
					id: step.id ?? crypto.randomUUID(),
					stepFields:
						step.stepFields
							?.filter((o: any) =>
								fieldTypes.includes(o.fieldType as FormFieldType),
							)
							.map((o: any) => ({
								...o,
								id: o?.id ? o.id : crypto.randomUUID(),
							})) ?? [],
				}))
			: // Single‑step form: flat list of fields
				((fields as FormElement[] | undefined)
					?.filter((o) => fieldTypes.includes(o.fieldType as FormFieldType))
					.map((o: FormElement) => ({
						...o,
						id: o?.id ? o.id : crypto.randomUUID(),
					})) ?? [])

		const formId = crypto.randomUUID()
		const date = new Date().toISOString()
		const formName = object?.form?.title ?? 'New Form ' + date
		setFormElements(formElements, {
			id: formId,
			name: formName,
			isMS,
		})
		// now save in locatForms
		saveForm({
			id: formId,
			name: formName,
			formElements,
			createdAt: date,
			updatedAt: date,
			isMS,
		})
		router.push(`/form-builder?id=${formId}`)
	}
	const handleNew = () => {
		setPrompt('')
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}

	return {
		prompt,
		setPrompt,
		handleGenerate,
		fields: object?.form?.fields,
		isMS: object?.form?.isMS,
		form,
		error,
		isLoading,
		stop,
		handleSave,
		handleNew,
		inputRef,
		response: object,
		handleKeyDown,
	}
}
export function AiFormGenerator() {
	const {
		prompt,
		setPrompt,
		handleGenerate,
		fields,
		isMS,
		form,
		error,
		isLoading,
		stop,
		handleSave,
		handleNew,
		inputRef,
		handleKeyDown,
	} = useAiFormGenerator()
	const router = useRouter()

	return (
		<div className="h-full">
			<div className="w-full flex flex-col justify-end mb-5 md:mb-8">
				<div className="w-full border border-dashed focus-within:border-solid rounded-3xl p-4 focus-within:bg-secondary/30 transition-colors duration-200 squircle">
					<Textarea
						id="prompt-area"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="e.g., a contact form with name, email, and message fields"
						className="bg-transparent dark:bg-transparent border-none resize-none focus-visible:ring-0 shadow-none md:text-base text-secondary-foreground"
						autoFocus
						ref={inputRef}
					/>
					<div className="flex justify-end pt-3">
						<AnimatePresence mode="wait">
							{isLoading && (
								<motion.div
									key="generate-button"
									initial={{ opacity: 0, y: -8, scale: 0.97 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: -8, scale: 0.95 }}
									transition={{ duration: 0.3, delay: 0.1 }}
								>
									<Button
										onClick={stop}
										className="w-fit"
										size="sm"
										variant="secondary"
									>
										<span className="size-4 rounded bg-foreground" />
										Stop
									</Button>
								</motion.div>
							)}
							{!isLoading && (
								<motion.div
									key="generate-button"
									initial={{ opacity: 0, y: -8, scale: 0.97 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: -8, scale: 0.95 }}
									transition={{ duration: 0.3, delay: 0.1 }}
								>
									<Button
										onClick={handleGenerate}
										className="w-fit"
										size="sm"
										disabled={!prompt}
									>
										Generate <ArrowUp />
									</Button>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
			{fields && (
				<ErrorBoundary
					FallbackComponent={ErrorFallback}
					onError={(error, errorInfo) => {
						console.error('Form rendering error:', error, errorInfo)
						console.log(fields)
					}}
				>
					<div className="border rounded-4xl squircle md:p-6 p-4 mb-4 md:mb-8 bg-muted/30">
						{isMS ? (
							<MultiStepFormPreview
								formElements={fields as unknown as FormStep[]}
								form={form as unknown as UseFormReturn<any, any, undefined>}
							/>
						) : (
							<form
								onSubmit={async (e) => {
									e.preventDefault()
								}}
								className="flex flex-col w-full gap-8"
							>
								<RenderFormWhileStreaming
									list={fields as FormElement[]}
									form={form}
								/>
							</form>
						)}
					</div>
				</ErrorBoundary>
			)}
			{error && (
				<div className="text-destructive-foreground pt-3 text-center">
					{error.message}
				</div>
			)}
			{fields && !isLoading && !error && (
				<div className="flex justify-between gap-4 pt-4 mt-3 border-t border-dashed ">
					<Button onClick={() => router.back()} type="button" variant="ghost">
						<ArrowLeft className="size-4" />
						Back
					</Button>
					<div className="flex gap-4 ">
						<Button onClick={handleNew} type="button" variant="secondary">
							<MdOutlineReplay className="size-4" />
							Retry
						</Button>
						<Button onClick={handleSave} type="button">
							<Pencil className="size-4" />
							Edit
						</Button>
					</div>
				</div>
			)}
			<div hidden={!!fields || !!error?.message}>
				<h2 className="text-xl font-bold mb-1">Form Examples</h2>
				<div className="flex gap-2 pt-1 w-full justify-start flex-wrap">
					{promptExamples.map((o) => (
						<Button
							variant="outline"
							key={o.prompt}
							onClick={() => setPrompt(o.prompt)}
						>
							{o.label}
						</Button>
					))}
				</div>
			</div>
		</div>
	)
}
