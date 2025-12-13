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
    <div className="max-w-8xl mx-auto w-full relative ">
      <div className="lg:hidden text-center py-2 bg-accent text-destructive">
        <MdInfo className="inline mr-2 size-5" />
        The form builder works best on desktop
      </div>
        <React.Suspense fallback={<FormBuilderSkeleton />}>
          {children}
        </React.Suspense>
    </div>
  )
}
