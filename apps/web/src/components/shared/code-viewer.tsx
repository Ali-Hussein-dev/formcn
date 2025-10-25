"use client";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from "@/components/ui/code-block";
import { CopyButton } from "../copy-button";
import { formatCode } from "@/form-builder/lib/utils";
import * as React from "react";

export const CodeViewer = ({
  code,
}: {
  code: { file: string; code: string }[];
}) => {
  const [formattedCode, setFormattedCode] = React.useState<
    { file: string; code: string }[]
  >([]);
  React.useEffect(() => {
    Promise.all(
      code.map(async (item) => ({
        ...item,
        code: await formatCode(item.code),
      }))
    ).then(setFormattedCode);
  }, []);
  if (!formattedCode)
    return <p className="text-center text-lg">code formatting...</p>;
  return (
    <div className="relative max-w-full flex flex-col gap-y-5">
      {formattedCode.map((item, i) => (
        <CodeBlock key={i} className="my-0 w-full bg-transparent border-none">
          <CodeBlockGroup className="bg-secondary pr-2">
            <div className="bg-muted py-2 px-3 text-muted-foreground text-sm border-b border-dashed">
              {item.file}
            </div>
            <CopyButton text={item.code} />
          </CodeBlockGroup>
          <div
            style={{ height: "100%", maxHeight: "50vh" }}
            className="*:mt-0 [&_pre]:p-3 w-full overflow-y-auto dark:bg-accent! bg-accent/5!"
          >
            <CodeBlockCode code={item.code} language="tsx" />
          </div>
        </CodeBlock>
      ))}
    </div>
  );
};
