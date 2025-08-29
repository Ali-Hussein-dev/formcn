import { FormBuilder } from "@/form-builder/components/form-builder";
import { MdInfo } from "react-icons/md";

export const metadata = {
  title: "Modern Form Builder for Shadcn | formcn",
  description:
    "Easily build single- and multi-step forms with auto-generated client- and server-side code.",
};
//======================================
export default function FormBuilderPage() {
  return (
    <div className="mx-auto px-2 pt-4 pb-10 max-w-7xl w-full">
      <div className="lg:hidden text-center py-6 bg-accent text-accent-foreground">
        <MdInfo className="inline mr-1 size-5" />
        The form builder works best on desktop
      </div>
      <FormBuilder />
    </div>
  );
}
