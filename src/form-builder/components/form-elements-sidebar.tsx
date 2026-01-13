import { Button } from '@/components/ui/button'
import { type FormElement } from '@/form-builder/form-types'
import { formElementsList } from '@/form-builder/constant/form-elements-list'
import useFormBuilderStore from '@/form-builder/hooks/use-form-builder-store'
import { Badge } from '@/components/ui/badge'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

const renderElementButton = (o: (typeof formElementsList)[0]) => {
	const appendElement = useFormBuilderStore((s) => s.appendElement)
	const formElements = useFormBuilderStore((s) => s.formElements)
	const isMS = useFormBuilderStore((s) => s.isMS)
	const Icon = o.icon
	return (
		<Button
			key={o.name}
			variant="ghost"
			onClick={() => {
				appendElement({
					fieldType: o.fieldType as FormElement['fieldType'],
					stepIndex: isMS ? formElements.length - 1 : undefined,
				})
			}}
			className="gap-1 justify-start w-fit lg:w-full py-1.5"
		>
			<div className="flex items-center justify-start gap-1.5 text-accent-foreground">
				<span className="border rounded-xl size-8 border-dashed bg-accent/40 grid place-items-center">
					<Icon className="size-4 text-muted-foreground" />
				</span>
				<div className="flex flex-col justify-start items-start">
					<div className="text-xs">
						{o.name}
						{o?.isNew! && (
							<Badge
								className="text-[9px] font-medium rounded-2xl ml-1"
								variant="destructive"
							>
								New
							</Badge>
						)}
					</div>
				</div>
			</div>
		</Button>
	)
}

type GroupedElements = Record<string, typeof formElementsList>

const SidebarContent = ({
	groupedElements,
}: {
	groupedElements: GroupedElements
}) => (
	<div className="py-2 space-y-3">
		{/* Display Elements Group */}
		{groupedElements.display && (
			<div className="mb-3">
				<h3 className="text-xs font-medium text-muted-foreground mb-1.5 pl-4">
					Display Elements
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
					{groupedElements.display.map(renderElementButton)}
				</div>
			</div>
		)}
		{/* Field Elements Group */}
		{groupedElements.field && (
			<div>
				<h3 className="text-xs font-medium text-muted-foreground mb-2 pl-4">
					Field Elements
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
					{groupedElements.field.map(renderElementButton)}
				</div>
			</div>
		)}
	</div>
)

// Group elements by their group property
const groupedElements = formElementsList.reduce((acc, element) => {
	const group = element.group || 'other'
	if (!acc[group]) {
		acc[group] = []
	}
	acc[group].push(element)
	return acc
}, {} as GroupedElements)
//======================================
export const FormElementsSidebar = () => {
	return (
		<div className="w-full h-full max-h-full relative md:pl-2 lg:px-0">
			{/* Desktop / large screens: inline sidebar as before */}
			<div className="hidden lg:block">
				<SidebarContent groupedElements={groupedElements} />
			</div>
			{/* Mobile / tablet: open elements inside a drawer */}
			<div className="lg:hidden">
				<Drawer direction="bottom">
					<DrawerTrigger asChild>
						<Button variant="outline" className="mb-2 w-full">
							Form elements
						</Button>
					</DrawerTrigger>
					<DrawerContent className="bg-glass data-[vaul-drawer-direction=left]:sm:max-w-sm">
						<DrawerHeader className="px-4 pb-1">
							<DrawerTitle className="text-sm">Form elements</DrawerTitle>
						</DrawerHeader>
						<div className="h-full px-3 pb-4 overflow-y-auto">
							<SidebarContent groupedElements={groupedElements} />
						</div>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	)
}
