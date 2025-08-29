//======================================
import { MyForms } from "@/form-builder/components/my-forms";
import { MdInfo } from "react-icons/md";
export default function MyFormsPage() {
  return (
    <div className="mx-auto px-2 py-8 max-w-7xl w-full">
      <div className="lg:hidden text-center py-6 bg-accent text-accent-foreground mb-2">
        <MdInfo className="inline mr-1 size-5" />
        The form builder works best on desktop
      </div>
      <MyForms />
    </div>
  );
}
