import { FormBuilder } from "@/form-builder/components/form-builder";

export const metadata = {
  title: "Modern Form Builder for Shadcn | formcn",
  description:
    "Easily build single- and multi-step forms with auto-generated client- and server-side code.",
};
//======================================
export default function FormBuilderPage() {
  return (
    <div className="mx-auto px-2 sm:px-4 py-8 container">
      <FormBuilder />
    </div>
  );
}
