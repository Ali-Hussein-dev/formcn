"use client";
import { Button } from "@/components/ui/button";

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="p-4 border border-destructive/30 rounded-md bg-destructive/10">
      <h3 className="text-destructive-foreground font-semibold mb-2">
        Form Rendering Error
      </h3>
      <p className="text-destructive-foreground/60 text-sm mb-3">
        {error.message}
      </p>
      <Button onClick={resetErrorBoundary} variant={"destructive"}>
        Try Again
      </Button>
    </div>
  );
}
