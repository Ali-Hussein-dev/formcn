'use client'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'motion/react'
import * as React from 'react'
import { toast } from 'sonner'
import { CopyButton } from '@/components/copy-button'
import { CodeViewer } from '@/components/shared/code-viewer'
import { PackagesManagerTabs } from '@/components/shared/package-manager-tabs'
import { Button } from '@/components/ui/button'
import {
	CodeBlock,
	CodeBlockCode,
	CodeBlockGroup,
} from '@/components/ui/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Placeholder } from '@/form-builder/components/placeholder'
import type {
	FormElement,
	FormElementOrList,
	FormStep,
} from '@/form-builder/form-types'
import useFormBuilderStore from '@/form-builder/hooks/use-form-builder-store'
import { flattenFormSteps } from '@/form-builder/lib/form-elements-helpers'
import { generateFormCode } from '@/form-builder/lib/generate-form-code'
import { genFormZodSchemaCode } from '@/form-builder/lib/generate-zod-schema'
import { convertToKababCase } from '@/lib/utils'
import { GeneratedCodeInfoCard } from './tech-stack-info-card'

const Wrapper = ({
	children,
	language,
	title,
}: {
	language: string
	children: string
	title: string
}) => {
	return (
		<CodeBlock className="my-0 w-full">
			<CodeBlockGroup className="border-border border-b px-4 py-2">
				<div className="bg-muted py-1 px-1.5 rounded-sm text-muted-foreground text-sm">
					{title}
				</div>
				<CopyButton text={children} />
			</CodeBlockGroup>
			<div
				style={{ height: '100%', maxHeight: '50vh' }}
				className="*:mt-0 [&_pre]:p-3 w-full overflow-y-auto dark:bg-accent! bg-accent/5!"
			>
				<CodeBlockCode code={children} language={language} />
			</div>
		</CodeBlock>
	)
}

export const JsonViewer = ({
	json,
	isMS,
}: {
	json: FormElementOrList[] | FormStep[] | Record<string, unknown>
	isMS: boolean
}) => {
	if (Array.isArray(json)) {
		json = (
			isMS
				? flattenFormSteps(json as FormStep[]).flat()
				: (json as FormElementOrList[])
		).filter((element) => !('static' in element && element.static))
	}

	return (
		<Wrapper title="Form JSON" language="json">
			{JSON.stringify(json || {}, null, 2)}
		</Wrapper>
	)
}

const installableShadcnComponents: Partial<
	Record<FormElement['fieldType'], string>
> = {
	Input: 'input',
	Textarea: 'textarea',
	Checkbox: 'checkbox',
	Select: 'select',
	Combobox: 'popover command',
	Slider: 'slider',
	Switch: 'switch',
	OTP: 'input-otp',
	RadioGroup: 'radio-group',
	ToggleGroup: 'toggle-group',
	DatePicker: 'popover calendar',
	Separator: 'separator',
	// none-shadcn components
	MultiSelect: '@formcn/multi-select',
	Password: '@formcn/password',
	FileUpload: '@formcn/file-upload',
	Rating: '@formcn/rating',
	TagInput: '@formcn/tag-input',
}

//======================================
const Cli = ({
	registryDependencies,
	tsx,
	zodSchema,
	meta,
	isMS,
}: {
	registryDependencies: string[]
	tsx: { file: string; code: string }[]
	zodSchema: string
	meta: { id: string; name: string }
	isMS: boolean
}) => {
	const res = useMutation({
		mutationKey: ['registry', meta.id],
		mutationFn: async () => {
			const name = convertToKababCase(meta.name)
			const key = name + '-' + meta.id.split('-').slice(0, 2).join('-')
			const res = await fetch(`/r/${key}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					key,
					dependencies: [
						'react-hook-form',
						'zod',
						'@hookform/resolvers',
						'motion',
					],
					registryDependencies: isMS
						? [...registryDependencies, '@formcn/stepper']
						: registryDependencies,
					files: [
						{
							path: `components/${name}.tsx`,
							content: tsx[0].code,
							type: 'registry:component',
							target: '',
						},
						{
							path: `lib/form-schema.ts`,
							content: zodSchema,
							type: 'registry:lib',
							target: '',
						},
					],
				}),
			})
			return res.json()
		},
	})
	const { status, data } = res
	return (
		<div>
			<Button
				onClick={() => {
					if (meta.id && meta.name) {
						res.mutate()
					} else {
						toast.error('Please fill in the form name and id')
					}
				}}
				disabled={res.status === 'pending'}
				className="w-full active:scale-100 active:translate-y-0.5 mb-4"
			>
				{status === 'pending'
					? 'Generating command...'
					: 'Generate CLI command'}
			</Button>
			{status === 'error' && (
				<div className="text-destructive text-center py-2">
					{res.error?.message}
				</div>
			)}
			{status === 'success' && data?.data?.id && (
				<motion.div
					initial={{ opacity: 0, y: -15 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<PackagesManagerTabs packages={data.data.id} />
				</motion.div>
			)}
		</div>
	)
}
//======================================
export function CodeBlockPackagesInstallation({
	depenedencies,
	registryDependecies,
}: {
	depenedencies: string
	registryDependecies: string
}) {
	return (
		<div className="w-full py-5 max-w-full">
			<h2 className="font-sembold text-start mb-2 text-foreground">
				Install npm packages
			</h2>
			<PackagesManagerTabs packages={depenedencies} />
			<h2 className="font-sembold text-start mt-4 mb-2 text-foreground">
				Install registry components
			</h2>
			<PackagesManagerTabs packages={registryDependecies} />
		</div>
	)
}

const useGenerateCode = () => {
	const formElements = useFormBuilderStore((s) => s.formElements)
	const meta = useFormBuilderStore((s) => s.meta)
	const isMS = useFormBuilderStore((s) => s.isMS)
	const tsx = generateFormCode({
		formElements: formElements as FormElementOrList[],
		isMS,
	})
	const parsedFormElements = isMS
		? flattenFormSteps(formElements as FormStep[]).flat()
		: formElements.flat()
	const zodSchema = genFormZodSchemaCode(parsedFormElements as FormElement[])
	const processedFormElements = isMS
		? flattenFormSteps(formElements as FormStep[])
		: formElements
	const formElementTypes = (processedFormElements.flat() as FormElement[])
		.filter((el) => !('static' in el && el.static))
		.map((el) => el.fieldType)
		.map((str) => installableShadcnComponents[str])
		.filter((str) => str && str.length > 0)

	const packagesSet = new Set(formElementTypes)
	let registryDependencies = ['field', ...Array.from(packagesSet)].join(' ')
	if (isMS) {
		registryDependencies += ' @formcn/multi-step-viewer @formcn/stepper'
	}
	const dependencies = 'react-hook-form zod @hookform/resolvers motion'
	return {
		tsx,
		zodSchema,
		meta,
		registryDependencies,
		dependencies,
		isMS,
	}
}

//======================================
export function CodePanel() {
	const formElements = useFormBuilderStore((s) => s.formElements)
	const { zodSchema, tsx, registryDependencies, dependencies, meta, isMS } =
		useGenerateCode()
	if (formElements.length < 1) {
		return (
			<Placeholder className="p-10 border rounded-lg max-w-full">
				No form fields, add fields first to see the code
			</Placeholder>
		)
	}
	return (
		<div className="w-full min-w-full">
			<div className="flex justify-between items-center mb-4">
				<h2 className="font-semibold text-secondary-foreground">
					Install with CLI
				</h2>
				<GeneratedCodeInfoCard />
			</div>
			<Cli
				registryDependencies={registryDependencies.split(' ')}
				tsx={tsx}
				zodSchema={zodSchema}
				meta={meta}
				isMS={isMS}
			/>
			<Tabs defaultValue="tsx" className="w-full min-w-full pt-3">
				<div className="flex justify-between items-center">
					<h2 className="font-semibold text-secondary-foreground">
						Manual installation
					</h2>
					<TabsList>
						<TabsTrigger value="tsx">TSX</TabsTrigger>
						<TabsTrigger value="schema">Schema</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="tsx" tabIndex={-1}>
					<CodeViewer code={tsx} />
					<div className="border-t border-dashed w-full mt-6" />
					<CodeBlockPackagesInstallation
						depenedencies={dependencies}
						registryDependecies={registryDependencies}
					/>
				</TabsContent>
				<TabsContent value="schema" tabIndex={-1}>
					<CodeViewer code={[{ file: 'schema.ts', code: zodSchema }]} />
				</TabsContent>
			</Tabs>
		</div>
	)
}
