import * as React from "react";

export const metadata = {
  title: "Form Editor | formcn",
  description:
    "Easily build single- and multi-step forms with auto-generated client- and server-side code.",
};
//======================================
export default function FormEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <React.Suspense>{children}</React.Suspense>;
}
