import type {
	FormElement,
	FormElementOrList,
	FormStep,
} from '@/form-builder/form-types'
import * as React from 'react'
import { Reorder } from 'motion/react'
import { MdDelete } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { FieldCustomizationView } from '@/form-builder/components/edit/field-edit'
import useFormBuilderStore from '@/form-builder/hooks/use-form-builder-store'
import type { Transition } from 'motion'
import { StepItem } from '@/form-builder/components/edit/step-item'
import { formFieldsIcons } from '@/form-builder/constant/form-elements-list'

type EditFormItemProps = {
	element: FormElement
	/**
	 * Index of the main array
	 */
	fieldIndex: number
	/**
	 * Index of the nested array element
	 */
	j?: number
	stepIndex?: number
}

const EditFormItem = (props: EditFormItemProps) => {
	const { element, fieldIndex } = props
	const dropElement = useFormBuilderStore((s) => s.dropElement)
	let DisplayName =
		'static' in element && element.static
			? element.content
			: element.label || element.name
	const Icon = formFieldsIcons[element.fieldType]
	return (
		<div className="w-full group">
			<div className="flex items-center justify-between px-2">
				<div className="flex items-center justify-start gap-1 size-full">
					<div className="size-6 grid place-items-center">
						{Icon && (
							<Icon className="size-4 dark:text-muted-foreground text-muted-foreground " />
						)}
					</div>
					<span className="truncate max-w-xs md:max-w-sm">{DisplayName}</span>
				</div>
				<div className="flex items-center justify-end opacity-0 group-hover:opacity-100 duration-100">
					<FieldCustomizationView
						formElement={element as FormElement}
						fieldIndex={fieldIndex}
						j={props?.j}
						stepIndex={props?.stepIndex}
					/>

					<Button
						size="icon"
						variant="ghost"
						onClick={() => {
							dropElement({
								fieldIndex,
								j: props?.j,
								stepIndex: props?.stepIndex,
							})
						}}
						className="rounded-xl h-9"
					>
						<MdDelete />
					</Button>
				</div>
			</div>
		</div>
	)
}

export const animateVariants = {
	initial: { opacity: 0, y: -10 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0 },
	transition: {
		duration: 0.2,
	} as Transition,
}
const getTransitionProps = (isLayoutTransitioning: boolean) => ({
	// ...animateVariants,
	transition: isLayoutTransitioning
		? { duration: 0 } // Disable animations during layout transitions
		: animateVariants.transition,
})

const useLayoutTracker = () => {
	const containerRef = React.useRef<HTMLUListElement>(null)
	const [isLayoutTransitioning, setIsLayoutTransitioning] =
		React.useState(false)

	React.useEffect(() => {
		const container = containerRef.current
		if (!container) return

		let resizeTimeout: NodeJS.Timeout

		const resizeObserver = new ResizeObserver(() => {
			// Set transitioning state when resize starts
			setIsLayoutTransitioning(true)

			// Clear existing timeout
			if (resizeTimeout) clearTimeout(resizeTimeout)

			// Reset transitioning state after transition completes
			resizeTimeout = setTimeout(() => {
				setIsLayoutTransitioning(false)
			}, 350) // Slightly longer than our CSS transition duration
		})

		resizeObserver.observe(container)

		return () => {
			resizeObserver.disconnect()
			if (resizeTimeout) clearTimeout(resizeTimeout)
		}
	}, [])
	return { isLayoutTransitioning, containerRef }
}

const StepsWrapper = () => {
	const reorderSteps = useFormBuilderStore((s) => s.reorderSteps)
	const formElements = useFormBuilderStore((s) => s.formElements)
	const reorder = useFormBuilderStore((s) => s.reorder)
	const { isLayoutTransitioning, containerRef } = useLayoutTracker()
	return (
		<Reorder.Group
			values={formElements as FormStep[]}
			onReorder={(newOrder) => {
				reorderSteps(newOrder)
			}}
			className="flex flex-col gap-4 px-1 py-2"
			layout
			ref={containerRef}
		>
			{(formElements as FormStep[]).map((step, stepIndex) => (
				<StepItem
					stepIndex={stepIndex}
					step={step}
					key={step.id}
					transitionProps={getTransitionProps(isLayoutTransitioning)}
				>
					<Reorder.Group
						axis="y"
						onReorder={(newOrder) => {
							reorder({ newOrder, stepIndex })
						}}
						values={step.stepFields}
						className="flex flex-col gap-3"
						tabIndex={-1}
					>
						{step.stepFields.flat().map((element, fieldIndex) => {
							return (
								<Reorder.Item
									key={element.id}
									value={element}
									className="reorderItem"
									{...getTransitionProps(isLayoutTransitioning)}
								>
									<EditFormItem
										fieldIndex={fieldIndex}
										element={element}
										stepIndex={stepIndex}
									/>
								</Reorder.Item>
							)
						})}
					</Reorder.Group>
				</StepItem>
			))}
		</Reorder.Group>
	)
}
const SingleStepWrapper = () => {
	const formElements = useFormBuilderStore((s) => s.formElements)
	const reorder = useFormBuilderStore((s) => s.reorder)
	const { isLayoutTransitioning, containerRef } = useLayoutTracker()
	return (
		<Reorder.Group
			axis="y"
			onReorder={(newOrder) => {
				reorder({ newOrder, fieldIndex: null })
			}}
			values={formElements as FormElementOrList[]}
			className="flex flex-col gap-3 rounded-lg px-1 py-2 bg-background"
			tabIndex={-1}
			ref={containerRef}
			layout
		>
			{(formElements as FormElement[]).flat().map((element, i) => (
				<Reorder.Item
					key={element.id}
					value={element}
					className="reorderItem"
					{...getTransitionProps(isLayoutTransitioning)}
				>
					<EditFormItem key={element.id} fieldIndex={i} element={element} />
				</Reorder.Item>
			))}
		</Reorder.Group>
	)
}
//======================================
export function FormEdit() {
	const isMS = useFormBuilderStore((s) => s.isMS)
	if (isMS) {
		return <StepsWrapper />
	}
	return <SingleStepWrapper />
}
