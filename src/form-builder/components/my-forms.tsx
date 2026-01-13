import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Check, Pencil, Trash, X } from 'lucide-react'
import { motion } from 'motion/react'
import * as React from 'react'
import { BsStars } from 'react-icons/bs'
import { toast } from 'sonner'
import { SponsorBanner } from '@/components/sponsor-banner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { templates } from '@/form-builder/constant/templates'
import { useLocalForms } from '@/form-builder/hooks/use-local-forms'
import { usePreviewForm } from '@/form-builder/hooks/use-preview-form'
import type { FormElementOrList } from '../form-types'
import useFormBuilderStore from '../hooks/use-form-builder-store'
import { flattenFormElementOrList } from '../lib/form-elements-helpers'
import { LocalFormsSidebar } from './local-forms-sidebar'
import { FormPreview } from './preview/form-preview'
import { WebPreview } from './web-preview'

function DeleteButtonWithConfim({ cb }: { cb: () => void }) {
	const [open, setOpen] = React.useState(false)
	return open ? (
		<div className="flex gap-2 items-center">
			<Button
				variant="destructive"
				onClick={() => {
					cb()
					setOpen(false)
				}}
			>
				Confirm
			</Button>
			<Button variant="ghost" onClick={() => setOpen(false)}>
				Cancel
			</Button>
		</div>
	) : (
		<Button variant="destructive" onClick={() => setOpen(true)}>
			<Trash className="size-4" />
			Delete form
		</Button>
	)
}

// Show form name, edit and delete
function SavedFormCard(props: { name: string; id: string }) {
	const updateForm = useLocalForms((s) => s.updateForm)
	const deleteForm = useLocalForms((s) => s.deleteForm)
	const [editMode, setEditMode] = React.useState(false)
	const [name, setName] = React.useState(props.name)
	const navigate = useNavigate()

	// Reset state when props change
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		setEditMode(false)
		setName(props.name)
	}, [props.id, props.name])

	// on esc press, close the edit mode
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setEditMode(false)
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	function handleEdit() {
		updateForm({ id: props.id, name })
		setEditMode(false)
	}
	function handleDelete() {
		deleteForm(props.id)
		toast('Form deleted successfully')
		navigate({ to: '/my-forms', search: { id: templates[0].id } })
	}

	return (
		<div className="flex items-center gap-2 w-full justify-between">
			{editMode ? (
				<div className="flex gap-2 items-center w-full">
					<Input
						// ref={inputRef}
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="bg-background dark:bg-background"
					/>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setEditMode(false)}
					>
						<X className="size-4" />
					</Button>
					<Button variant="ghost" size="icon" onClick={() => handleEdit()}>
						<Check className="size-4" />
					</Button>
				</div>
			) : (
				<h2
					className="font-semibold pl-2 hover:cursor-pointer"
					onClick={() => setEditMode(true)}
				>
					{name}
				</h2>
			)}
			<div className="flex gap-3 items-center">
				<DeleteButtonWithConfim cb={handleDelete} />
				<Button variant="outline" onClick={() => setEditMode(true)}>
					<Pencil className="size-4" />
					Rename
				</Button>
			</div>
		</div>
	)
}
// migrate local forms to flat nested form elements
const useMigrateLocalForms = () => {
	const forms = useLocalForms((s) => s.forms)
	const updateForm = useLocalForms((s) => s.updateForm)
	React.useEffect(() => {
		forms.forEach((form) => {
			// use to handle nested form elements
			const flattenElements = flattenFormElementOrList(
				form.formElements as FormElementOrList[],
			)
			if (flattenElements) {
				updateForm({ id: form.id, formElements: flattenElements })
			}
		})
	}, [])
	return {}
}

const useSelectedForm = () => {
	const searchParams = useSearch({ from: '/my-forms' })
	const PreviewFormId = searchParams.id
	const getFormById = useLocalForms((s) => s.getFormById)

	const isSelectedFormTemplate =
		!!PreviewFormId && PreviewFormId.startsWith('template-')

	const selectedForm = isSelectedFormTemplate
		? templates.find((t) => t.id === PreviewFormId)
		: getFormById(PreviewFormId!)
	return { selectedForm, PreviewFormId, isSelectedFormTemplate }
}
//======================================
export function MyForms() {
	useMigrateLocalForms()
	const previewForm = usePreviewForm()
	const setFormElements = useFormBuilderStore((s) => s.setFormElements)
	const setForm = useLocalForms((s) => s.setForm)
	const getFormById = useLocalForms((s) => s.getFormById)
	const updateForm = useLocalForms((s) => s.updateForm)

	const { selectedForm, PreviewFormId, isSelectedFormTemplate } =
		useSelectedForm()
	const meta = useFormBuilderStore((s) => s.meta)
	const formElements = useFormBuilderStore((s) => s.formElements)
	const navigate = useNavigate()

	// Redirect to first template if the requested template/form is not found
	React.useEffect(() => {
		if (PreviewFormId && !selectedForm) {
			navigate({
				to: '/my-forms',
				search: { id: templates[0].id },
				replace: true,
			})
		}
	}, [PreviewFormId, selectedForm, navigate])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		// reset form each time the form id changes
		previewForm.form.reset()
	}, [PreviewFormId])

	function handleUseForm() {
		toast.message('Redirecting...', { duration: 1000 })
		// save form from form builder into local forms
		if (meta.id) {
			updateForm({
				id: meta.id,
				formElements: formElements,
			})
		}
		if (isSelectedFormTemplate) {
			const template = templates.find((t) => t.id === PreviewFormId)
			if (template) {
				const id = crypto.randomUUID()
				const date = new Date().toISOString()
				const formObject = {
					id,
					name: template.title + ' Template',
					isMS: template.isMS,
					formElements: template.formElements as FormElementOrList[],
					createdAt: date,
					updatedAt: date,
				}
				// add form template to local Forms
				setFormElements(formObject.formElements, {
					isMS: formObject.isMS,
					id,
					name: formObject.name,
				})
				setForm(formObject)
				navigate({ to: '/form-builder', search: { id } })
				return
			}
		} else {
			const savedForm = getFormById(PreviewFormId!)
			if (savedForm) {
				setFormElements(savedForm.formElements, {
					isMS: savedForm.isMS,
					id: savedForm.id,
					name: savedForm.name,
				})
			}
			navigate({ to: '/form-builder', search: { id: PreviewFormId } })
		}
	}

	return (
		<div className="grid md:grid-cols-12 relative">
			<div className="lg:col-span-2 hidden md:block md:col-span-3">
				<LocalFormsSidebar />
			</div>
			<div className="lg:col-span-10 md:col-span-9">
				<SponsorBanner />
				<div className="lg:pt-3">
					<div className="flex justify-between px-4 py-4 lg:px-6 gap-3">
						<Link to="/ai-form-generator">
							<Button variant="default">
								<BsStars />
								Formcn AI
							</Button>
						</Link>
						<div className="flex items-center gap-2">
							<Button onClick={handleUseForm} variant="secondary">
								{isSelectedFormTemplate ? 'Clone template' : 'Edit form'}
							</Button>
						</div>
					</div>
					<div className="md:px-4 lg:px-6">
						{PreviewFormId && (
							<>
								<WebPreview>
									<div className="p-2 lg:px-8 md:py-6 md:p-4 @container/my-forms">
										<motion.div
											key={PreviewFormId}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ type: 'keyframes', duration: 0.35 }}
										>
											<FormPreview
												formElements={
													(selectedForm?.formElements ??
														[]) as FormElementOrList[]
												}
												isMS={selectedForm?.isMS || false}
												className="bg-background squircle rounded-3xl"
												{...previewForm}
											/>
										</motion.div>
									</div>
								</WebPreview>
								<div className="py-4 flex justify-end">
									{!isSelectedFormTemplate && (
										<div className="grow pr-2">
											<SavedFormCard
												id={PreviewFormId}
												name={getFormById(PreviewFormId)?.name || 'Form'}
											/>
										</div>
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
