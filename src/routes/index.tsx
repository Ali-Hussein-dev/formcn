import { createFileRoute, Link } from '@tanstack/react-router'
import { BsPatchCheck, BsStars } from 'react-icons/bs'
import { FaGithub, FaWandMagicSparkles } from 'react-icons/fa6'
import { FiArrowRight, FiGitCommit } from 'react-icons/fi'
import {
	SiFramer,
	SiReact,
	SiReacthookform,
	SiShadcnui,
	SiTailwindcss,
	SiTypescript,
	SiZod,
} from 'react-icons/si'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { SponsorsSection } from '@/components/sponsors-section'
import { Button } from '@/components/ui/button'
import { CardDescription, CardTitle } from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { urls } from '@/constants/urls'
import { cn } from '@/lib/utils'
export const Route = createFileRoute('/')({ component: App })

const logos = [
	{
		name: 'React 19',
		Logo: SiReact,
	},
	{
		name: 'TypeScript',
		Logo: SiTypescript,
	},
	{
		name: 'Tailwind 4',
		Logo: SiTailwindcss,
	},
	{
		name: 'Shadcn',
		Logo: SiShadcnui,
	},
	{
		name: 'Zod 4',
		Logo: SiZod,
	},
	{
		name: 'React Hook Form',
		Logo: SiReacthookform,
	},
	{
		name: 'Motion',
		Logo: SiFramer,
	},
]

const features = [
	{
		icon: BsPatchCheck,
		title: 'Production-ready code',
		text: 'No inconsistent AI generated code, always consistent battle-tested code and easily maintainable',
	},
	{
		icon: FiGitCommit,
		title: 'Shadcn multi-step form',
		text: 'Easily choose between one step and multi-step forms that suit your needs',
	},
	{
		icon: SiZod,
		title: 'Input validation with Zod',
		text: 'Client/server side validation with Zod',
	},
	{
		icon: FaWandMagicSparkles,
		title: 'Easy to use',
		text: 'You can bring generated code and dependencies to your project with one command, powered by shadcn registry CLI',
	},
	{
		icon: BsStars,
		title: 'Formcn AI',
		text: 'Scaffold your form components instantly without creating each form field manually',
	},
]
const CtaButton = () => (
	<Link
		to="/form-templates/$formTemplate"
		params={{ formTemplate: 'template-signup' }}
	>
		<Button className="font-semibold">Create Form</Button>
	</Link>
)
const CardDecorator = ({ children }: { children: React.ReactNode }) => (
	<div className="mask-radial-from-40% mask-radial-to-60% relative size-32 mx-auto duration-200 [--color-border:color-mix(in_oklab,var(--foreground)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--foreground)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--primary)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--primary)20%,transparent)]">
		<div
			aria-hidden
			className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
		/>

		<div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
			{children}
		</div>
	</div>
)
function App() {
	return (
		<div>
			<Header />
			<div className=" flex flex-col w-full mx-auto px-2 sm:px-4 h-full">
				<div className="border-x container border-dashed mx-auto grow min-h-screen flex flex-col relative">
					<div className="relative">
						{/* <div className="rounded-bl-[9.4rem] border-dashed absolute size-24 border-l border-b left-0 bottom-0"></div> */}
						{/* <div className="rounded-br-[9.4rem] border-dashed absolute size-24 border-r border-b right-0 bottom-0"></div> */}
						<div className="py-5 px-3 sm:py-6 md:py-8 md:px-6 w-full grow">
							<div className="h-[80vh] grid place-items-center">
								<div>
									<Button
										variant="outline"
										className="rounded-full mx-auto py-1 mb-10 w-fit flex h-auto"
										asChild
									>
										<Link to="/changelog">
											New: stepper, tag input, and more...
											<FiArrowRight />
										</Link>
									</Button>
									<h1 className="mb-4 text-3xl sm:text-4xl font-black md:text-5xl lg:text-6xl tracking-tight text-center lg:leading-16 dark:bg-linear-to-b dark:from-white dark:to-white/70 dark:bg-clip-text dark:text-transparent">
										Build production-ready <br /> shadcn form with a few clicks
									</h1>
									<p className="text-muted-foreground text-center text-pretty max-w-xl mx-auto">
										Shadcn multi-step form, validation, accessible with ARIA and
										well-styled shadcn components
									</p>
									<div className="mx-auto pt-6 w-fit flex gap-4 ">
										<a
											href={urls.github}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button variant="outline">
												<FaGithub />
												Star on Github
											</Button>
										</a>
										<CtaButton />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="border-t w-full border-dashed p-1">
						<div className="dark:bg-muted/40 bg-muted text-card-foreground py-6 md:py-8 ">
							<h2 className="text-lg sm:text-xl text-center text-pretty font-bold mb-2 text-primary/85">
								Powered by Tech Stack You Trust
							</h2>
							<div className="flex gap-5 lg:gap-14 md:gap-8 py-5 mx-auto w-fit">
								{logos.map(({ name, Logo }) => {
									const Icon = <Logo className="size-6" />
									return (
										<TooltipProvider key={name}>
											<Tooltip>
												<TooltipTrigger asChild>
													<button
														className="size-full flex justify-center items-center"
														type="button"
													>
														{Icon}
													</button>
												</TooltipTrigger>
												<TooltipContent>
													<p>{name}</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									)
								})}
							</div>
						</div>
					</div>
					<div className="border-t border-dashed w-full">
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center text-pretty font-bold text-primary/85 py-12 border-b border-dashed">
							Build your Forms with Confidence
						</h2>
						<div className="grid md:grid-cols-6 grid-cols-1">
							{features.map((o, i) => (
								<div
									key={o.title}
									className={cn(
										'grow h-full',
										i < 3 && 'md:col-span-2',
										i === 3 && 'md:col-span-3',
										i === 4 && 'md:col-span-3',
									)}
								>
									<div
										className={cn(
											'h-full border-dashed',
											i < 4 && 'border-b md:border-b-0',
											i < 3 && 'md:border-b',
											i === 1 && 'md:border-x',
											i === 2 && 'md:border-r',
											i === 3 && 'md:border-r md:col-span-3',
											i === 4 && 'md:border-r md:col-span-3',
										)}
									>
										<div className="p-4 lg:p-6 rounded-xl">
											<CardDecorator>
												<o.icon className="size-6" />
											</CardDecorator>
											<CardTitle className="mb-3 text-xl gap-2 pt-3 text-center ">
												{o.title}
											</CardTitle>
											<CardDescription className="text-center text-balance">
												{o.text}
											</CardDescription>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<SponsorsSection />
					<div className="w-full border-t border-dashed h-full overflow-hidden p-1">
						<div className="w-full relative py-8 flex justify-center">
							{/* Gradient Diagonal Lines Pattern */}
							<div
								className="absolute inset-0 -z-10 pointer-events-none "
								style={{
									backgroundImage: `
                      repeating-linear-gradient(45deg, 
                        var(--muted) 0px, 
                        var(--muted) 1px, 
                        transparent 1px, 
                        transparent 5px)`,
								}}
							/>
							<CtaButton />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
