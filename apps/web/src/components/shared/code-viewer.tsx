"use client";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from "@/components/ui/code-block";
import { CopyButton } from "../copy-button";
import { formatCode } from "@/form-builder/lib/utils";
import * as React from "react";
import { ErrorFallback } from "./error-fallback"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "sonner"

export const CodeViewer = ({
  code,
}: {
  code: { file: string; code: string }[]
}) => {
  const [formattedCode, setFormattedCode] = React.useState<
    { file: string; code: string; error?: string }[]
  >([])
  const [formattingErrors, setFormattingErrors] = React.useState<
    { file: string; error: string }[]
  >([])
  
  React.useEffect(() => {
    const errors: { file: string; error: string }[] = []
    Promise.all(
      code.map(async (item) => ({
        ...item,
        code: await formatCode(item.code)
          .then((code) => code)
          .catch((e) => {
            const errorMessage = e?.message || "Failed to format code"
            errors.push({ file: item.file, error: errorMessage })
            toast.error(`Formatting failed for ${item.file}: ${errorMessage}`)
            return item.code
          }),
      }))
    ).then((result) => {
      setFormattedCode(result)
      setFormattingErrors(errors)
    })
  }, [code])
  
  if (!formattedCode.length)
    return <p className="text-center text-lg">code formatting...</p>
  return (
    <div className="relative max-w-full flex flex-col gap-y-5">
      {formattingErrors.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
          <h3 className="text-destructive font-semibold mb-2">Formatting Errors</h3>
          <ul className="space-y-1">
            {formattingErrors.map((error, i) => (
              <li key={i} className="text-sm text-destructive/90">
                <span className="font-medium">{error.file}:</span> {error.error}
              </li>
            ))}
          </ul>
        </div>
      )}
      {formattedCode.map((item, i) => {
        const error = formattingErrors.find((e) => e.file === item.file)
        return (
          <CodeBlock key={i} className="my-0 w-full bg-transparent border-none">
            <CodeBlockGroup className="bg-secondary pr-2">
              <div className="bg-muted py-2 px-3 text-muted-foreground text-sm border-b border-dashed">
                {item.file}
                {error && (
                  <span className="ml-2 text-destructive text-xs">
                    (Formatting failed - showing unformatted code)
                  </span>
                )}
              </div>
              <CopyButton text={item.code} />
            </CodeBlockGroup>
            <div
              style={{ height: "100%", maxHeight: "50vh" }}
              className="*:mt-0 [&_pre]:p-3 w-full overflow-y-auto dark:bg-accent! bg-accent/5!"
            >
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <CodeBlockCode code={item.code} language="tsx" />
              </ErrorBoundary>
            </div>
          </CodeBlock>
        )
      })}
    </div>
  )
}
