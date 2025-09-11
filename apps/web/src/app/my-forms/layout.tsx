import { MyFormSkeleton } from "@/form-builder/components/form-skeleton";
import * as React from "react";
import { MdInfo } from "react-icons/md";

export const metadata = {
  title: "My Forms | formcn",
  description:
    "Easily build single- and multi-step forms with auto-generated client- and server-side code.",
};
//======================================
export default function MyFormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-8 container">
      <div className="md:hidden text-center py-6 bg-accent text-accent-foreground mb-2">
        <MdInfo className="inline mr-1 size-5" />
        The form builder works best on desktop
      </div>
      <React.Suspense fallback={<MyFormSkeleton />}>{children}</React.Suspense>
    </div>
  );
}
