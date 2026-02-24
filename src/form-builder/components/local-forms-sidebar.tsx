import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import { CgFileDocument } from 'react-icons/cg'
import { GoGitCommit } from 'react-icons/go'
import { Button } from '@/components/ui/button'
import { FieldSeparator } from '@/components/ui/field'
import { SidebarWrapper } from '@/form-builder/components/sidebar-wrapper'
import { templates } from '@/form-builder/constant/templates'
import { useFormIdFromRoute } from '@/form-builder/hooks/use-form-id-from-route'
import useLocalForms from '@/form-builder/hooks/use-local-forms'
import { NewForm } from './new-form'

export function LocalFormsSidebar() {
	const allForms = useLocalForms((s) => s.forms)
	const { formId, navigateToForm } = useFormIdFromRoute()
	const navigate = useNavigate()

	React.useEffect(() => {
		if (!formId) {
			navigate({ to: '/form-templates/$formTemplate', params: { formTemplate: templates[0].id } })
		}
	}, [formId, navigate])

	function setQueryState(id: string) {
		navigateToForm(id)
	}

	return (
		<SidebarWrapper>
			<div className="px-3 py-2 flex flex-col gap-2">
				<NewForm />

				{allForms.length > 0 && (
					<div className="flex md:flex-col flex-wrap gap-1.5 flex-row pt-2">
						<p className="text-xs uppercase">Drafts</p>
						<div className="flex flex-col gap-2">
							{allForms.map((savedForm) => (
								<Button
									key={savedForm.id}
									onClick={() => setQueryState(savedForm.id)}
									className="justify-start text-sm @container/form-button"
									variant={formId === savedForm.id ? 'secondary' : 'ghost'}
								>
									<div className="flex gap-2 items-center @xs/form-button:max-w-[100px] max-w-[190px]">
										{savedForm.isMS ? (
											<GoGitCommit className="size-4 text-secondary-foreground/50" />
										) : (
											<CgFileDocument className="size-4 text-secondary-foreground/50" />
										)}
										<span className="truncate">{savedForm.name}</span>
									</div>
								</Button>
							))}
						</div>
					</div>
				)}
				<div className="flex md:flex-col flex-wrap gap-1.5 flex-row pb-2">
					<p className="text-xs uppercase">Template</p>
					{templates.map(({ id, title, isMS }) => (
						<Button
							key={id}
							onClick={() => setQueryState(id)}
							className="justify-start text-sm"
							variant={formId === id ? 'secondary' : 'ghost'}
						>
							{isMS ? (
								<GoGitCommit className="size-4 text-secondary-foreground/50" />
							) : (
								<CgFileDocument className="size-4 text-secondary-foreground/50" />
							)}
							{title}
						</Button>
					))}
				</div>
			</div>
		</SidebarWrapper>
	)
}
