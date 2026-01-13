import * as React from 'react'
import { SiBun, SiNpm, SiPnpm, SiYarn } from 'react-icons/si'
import { CopyButton } from '@/components/copy-button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const prefixes = {
	pnpm: 'pnpx shadcn@latest add',
	npm: 'npx shadcn@latest add',
	yarn: 'yarn shadcn@latest add',
	bun: 'bun x shadcn@latest add',
}

export const PackagesManagerTabs = ({ packages }: { packages: string }) => {
	const list = [
		{ value: packages, command: 'pnpm', Icon: <SiPnpm className="size-3" /> },
		{ value: packages, command: 'bun', Icon: <SiBun className="size-3" /> },
		{ value: packages, command: 'npm', Icon: <SiNpm className="size-3" /> },
		{ value: packages, command: 'yarn', Icon: <SiYarn className="size-3" /> },
	].map((o) => ({
		...o,
		value: prefixes[o.command as keyof typeof prefixes] + ' ' + o.value,
	}))
	const [activeTab, setActiveTab] = React.useState('pnpm')
	return (
		<Tabs
			defaultValue="pnpm"
			className="bg-accent/50 rounded-sm"
			value={activeTab}
			onValueChange={setActiveTab}
		>
			<TabsList
				className="w-full justify-between border-b rounded-none bg-accent h-10"
				variant="default"
			>
				<div className="flex gap-2 justify-start">
					{list.map(({ command, Icon }) => (
						<TabsTrigger
							key={command}
							value={command}
							className="rounded-sm py-1"
						>
							<span className="">{Icon}</span>
							{command}
						</TabsTrigger>
					))}
				</div>
				<CopyButton text={list.find((o) => o.command === activeTab)?.value!} />
			</TabsList>
			{list.map(({ value, command }) => {
				return (
					<TabsContent
						key={command}
						value={command}
						className="pt-3 pb-5 flex gap-2"
					>
						<pre className="px-2 text-muted-foreground text-wrap">{value}</pre>
					</TabsContent>
				)
			})}
		</Tabs>
	)
}
