import { AiFormGenerator } from "@/form-builder/components/ai/ai-form-generator";

export const metadata = {
  title: "Formcn AI",
  description:
    "AI form generator to generate forms using AI and shadcn components, without having to start from scratch",
};

//======================================
export default function AiGeneratedFormPage() {
  return (
    <div className="pb-20 max-w-3xl mx-auto w-full p-6">
      <h1 className="text-3xl font-bold mb-1">Formcn AI</h1>
      <p className="mb-6 text-muted-foreground text-sm">
        Generate forms using AI, without having to start from scratch
      </p>
      <AiFormGenerator />
    </div>
  );
}
