import { MyFormSkeleton } from "@/form-builder/components/form-skeleton";
import * as React from "react";
import { MdInfo } from "react-icons/md";

export const metadata = {
  title: "Shadcn Form Templates | Formcn",
  description:
    "A collection of production-ready shadcn form templates to get you started",
}
//======================================
export default function MyFormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="md:hidden text-center py-2 bg-accent text-destructive">
        <MdInfo className="inline mr-2 size-5" />
        The form builder works best on desktop
      </div>
      <React.Suspense fallback={<MyFormSkeleton />}>{children}</React.Suspense>
    </div>
  )
}
