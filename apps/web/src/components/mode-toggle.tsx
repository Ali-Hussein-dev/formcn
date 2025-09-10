"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
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
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}

export const ModeToggle = dynamic(
  () => import("./mode-toggle").then((mod) => mod.ModeToggleBase),
  {
    ssr: false,
  }
);
