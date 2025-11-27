import { AiFormGenerator } from "@/form-builder/components/ai/ai-form-generator";

export const metadata = {
  title: "Formcn AI",
  description:
    "AI form generator to generate forms using AI and shadcn components, without having to start from scratch",
};

//======================================
export default function AiGeneratedFormPage() {
  return (
    <div className="pt-6 max-w-5xl w-full mx-auto px-2 border-x bg-muted/20 border-dashed h-full min-h-[calc(100vh-4rem)] ">
      <div className=" w-full p-2 sm:p-6 md:px-10 lg:px-16">
        <h1 className="text-3xl font-bold mb-1 text-center">
          Formcn AI{" "}
          <span className="text-[11px] font-medium ml-1 rounded-full py-1 px-2 dark:bg-orange-950 bg-orange-600 text-orange-50">
            Beta
          </span>
        </h1>
        <p className="mb-6 text-muted-foreground text-sm text-center">
          Generate production-ready forms using AI
        </p>
        <AiFormGenerator />
      </div>
    </div>
  )
}
