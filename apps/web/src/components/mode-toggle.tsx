"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

export function ModeToggleBase() {
  const { resolvedTheme: theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="icon"
      variant="outline"
      aria-label="Theme"
      type="button"
      className="size-8"
    >
      <svg
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="currentcolor"
        // style="display: block;"
        className="block"
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="currentcolor"
          strokeWidth="4"
        ></circle>
        <path
          d="
        M 16 0
        A 16 16 0 0 0 16 32
        z"
        ></path>
      </svg>
    </Button>
  );
}

export const ModeToggle = dynamic(
  () => import("./mode-toggle").then((mod) => mod.ModeToggleBase),
  {
    ssr: false,
  }
);
