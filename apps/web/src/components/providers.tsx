"use client";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const NEXT_PUBLIC_POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
        person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
        defaults: "2025-05-24",
      });
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <PHProvider client={posthog}>{children}</PHProvider>
      </NuqsAdapter>
      <Toaster richColors />
    </ThemeProvider>
  );
}
