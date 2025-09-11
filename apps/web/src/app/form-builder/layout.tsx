import { FormBuilderSkeleton } from "@/form-builder/components/form-skeleton";
import * as React from "react";
import { MdInfo } from "react-icons/md";

export const metadata = {
  title: "Form Editor | formcn",
  description:
    "Easily build single- and multi-step forms with auto-generated client- and server-side code.",
};
//======================================
export default function FormBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-4 pb-10 container">
      <div className="lg:hidden text-center py-6 bg-accent text-accent-foreground">
        <MdInfo className="inline mr-1 size-5" />
        The form builder works best on desktop
      </div>
      <div className="px-2">
        <React.Suspense fallback={<FormBuilderSkeleton />}>
          {children}
        </React.Suspense>
      </div>
    </div>
  );
}
