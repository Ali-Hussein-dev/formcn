import * as React from "react";

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
  return <React.Suspense>{children}</React.Suspense>;
}
