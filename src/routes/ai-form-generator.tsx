import { createFileRoute } from '@tanstack/react-router'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { AiFormGenerator } from '@/form-builder/components/ai/ai-form-generator'

export const Route = createFileRoute('/ai-form-generator')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
			<>
				<Header />
				<div className="pt-6 max-w-5xl w-full mx-auto px-2 border-x bg-muted/20 border-dashed h-full min-h-[calc(100vh-4rem)] ">
					<div className=" w-full p-2 sm:p-6 md:px-10 lg:px-16">
						<h1 className="text-3xl font-black tracking-tight mb-1 text-center">
							Formcn AI
						</h1>
						<p className="mb-6 text-muted-foreground text-sm text-center">
							Generate production-ready forms using AI
						</p>
						<AiFormGenerator />
					</div>
				</div>
				<Footer />
			</>
		)
}
