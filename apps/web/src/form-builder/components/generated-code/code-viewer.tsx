"use client";
import * as React from "react";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  FormElement,
  FormElementOrList,
  FormStep,
} from "@/form-builder/form-types";
import { formatCode } from "@/form-builder/lib/utils";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { flattenFormSteps } from "@/form-builder/lib/form-elements-helpers";
import { genFormZodSchemaCode } from "@/form-builder/lib/generate-zod-schema";
import { generateFormCode } from "@/form-builder/lib/generate-form-code";
import { generateServerActionCode } from "@/form-builder/lib/generate-server-action-code";
import { CopyButton } from "@/components/copy-button";
import { GeneratedCodeInfoCard } from "./tech-stack-info-card";
import { IoTerminal } from "react-icons/io5";
import { Placeholder } from "@/form-builder/components/placeholder";

const Wrapper = ({
  children,
  language,
  title,
}: {
  language: string;
  children: string;
  title: string;
}) => {
  return (
    <CodeBlock className="my-0 w-full">
      <CodeBlockGroup className="border-border border-b px-4 py-2">
        <div className="bg-muted py-1 px-1.5 rounded-sm text-muted-foreground text-sm">
          {title}
        </div>
        <CopyButton text={children} />
      </CodeBlockGroup>
      <div
        style={{ height: "100%", maxHeight: "50vh" }}
        className="*:mt-0 [&_pre]:p-3 w-full overflow-y-auto"
      >
        <CodeBlockCode code={children} language={language} />
      </div>
    </CodeBlock>
  );
};

export const JsonViewer = ({
  json,
  isMS,
}: {
  json: FormElementOrList[] | FormStep[] | Record<string, unknown>;
  isMS: boolean;
}) => {
  if (Array.isArray(json)) {
    json = (
      isMS
        ? flattenFormSteps(json as FormStep[]).flat()
        : (json as FormElementOrList[])
    ).filter((element) => !("static" in element && element.static));
  }

  return (
    <Wrapper title="Form JSON" language="json">
      {JSON.stringify(json || {}, null, 2)}
    </Wrapper>
  );
};

const installableShadcnComponents: Partial<
  Record<FormElement["fieldType"], string>
> = {
  Input: "input",
  Textarea: "textarea",
  Checkbox: "checkbox",
  Select: "select",
  Slider: "slider",
  Switch: "switch",
  OTP: "otp",
  RadioGroup: "radio-group",
  ToggleGroup: "toggle-group",
  DatePicker: "popover calendar",
  Separator: "separator",
  // none-shadcn components
  MultiSelect: "https://formcn.dev/r/multi-select.json",
  Password: "https://formcn.dev/r/password.json",
  FileUpload: "https://formcn.dev/r/file-upload.json",
};
//======================================
export function CodeBlockPackagesInstallation() {
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const [activeTab, setActiveTab] = React.useState("bun"); // Default to bun since project uses it
  const processedFormElements = isMS
    ? flattenFormSteps(formElements as FormStep[])
    : formElements;
  const formElementTypes = (processedFormElements.flat() as FormElement[])
    .filter((el) => !el.static)
    .map((el) => el.fieldType)
    .map((str) => installableShadcnComponents[str])
    .filter((str) => str && str.length > 0);

  const packagesSet = new Set(formElementTypes);
  const packages = Array.from(packagesSet).join(" ");
  const otherPackages = "react-hook-form zod @hookform/resolvers motion";
  const tabsData = [
    {
      value: "pnpm",
      shadcn: `pnpm add shadcn@latest add ${packages}`,
      base: `pnpm add ${otherPackages}`,
    },
    {
      value: "npm",
      shadcn: `npx shadcn@latest add ${packages}`,
      base: `npx i ${otherPackages}`,
    },
    {
      value: "yarn",
      shadcn: `yarn shadcn@latest add ${packages}`,
      base: `yarn add ${otherPackages}`,
    },
    {
      value: "bun",
      shadcn: `bunx --bun shadcn@latest add ${packages}`,
      base: `bunx --bun add ${otherPackages}`,
    },
  ];

  return (
    <div className="w-full py-5 max-w-full">
      <h2 className="font-sembold text-start">Install base packages</h2>
      <Tabs
        defaultValue="bun"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mt-2 rounded-md bg-accent py-2 px-1"
      >
        <div className="flex justify-between border-b border-dashed pb-1 px-2">
          <TabsList>
            <IoTerminal className="mr-1.5" />
            {tabsData.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.value}
              </TabsTrigger>
            ))}
          </TabsList>
          <CopyButton
            text={tabsData.find((item) => item.value === activeTab)?.base || ""}
          />
        </div>
        {tabsData.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            <div>
              <pre className="px-3 py-2 text-accent-foreground/80 text-wrap">
                {item.base}
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <h2 className="font-sembold text-start mt-4">
        Install required form components
      </h2>
      <Tabs
        defaultValue="bun"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mt-2 rounded-md bg-accent py-2 px-1"
      >
        <div className="flex justify-between border-b border-dashed pb-1 px-2">
          <TabsList>
            <IoTerminal className="mr-1.5" />
            {tabsData.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.value}
              </TabsTrigger>
            ))}
          </TabsList>
          <CopyButton
            text={tabsData.find((item) => item.value === activeTab)?.base || ""}
          />
        </div>
        {tabsData.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            <pre className="px-3 py-2 text-accent-foreground/80 text-wrap">
              {item.shadcn}
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
const CodeBlockTSX = () => {
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const generatedCode = generateFormCode({
    formElements: formElements as FormElementOrList[],
    isMS,
  });
  const formattedCode = generatedCode.map((item) => ({
    ...item,
    code: formatCode(item.code),
  }));
  return (
    <div className="relative max-w-full flex flex-col gap-y-5">
      {formattedCode.map((item) => (
        <Wrapper key={item.file} title={item.file} language="tsx">
          {item.code}
        </Wrapper>
      ))}
    </div>
  );
};
const CodeBlockZodSchema = () => {
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const parsedFormElements = isMS
    ? flattenFormSteps(formElements as FormStep[])
    : formElements.flat();
  const generatedCode = genFormZodSchemaCode(
    parsedFormElements as FormElement[]
  );
  const formattedCode = formatCode(generatedCode);
  return (
    <div className="relative max-w-full">
      <Wrapper title="schema.ts" language="typescript">
        {formattedCode}
      </Wrapper>
    </div>
  );
};

const CodeBlockServerAction = () => {
  const generatedCode = generateServerActionCode();
  const formattedCode = generatedCode.map((item) => ({
    ...item,
    code: formatCode(item.code),
  }));
  return (
    <div className="relative max-w-full flex flex-col gap-y-5">
      {formattedCode.map((item) => (
        <Wrapper key={item.file} title={item.file} language="typescript">
          {item.code}
        </Wrapper>
      ))}
    </div>
  );
};

//======================================
export function GeneratedFormCodeViewer() {
  const formElements = useFormBuilderStore((s) => s.formElements);
  if (formElements.length < 1) {
    return (
      <Placeholder>
        No form fields, add fields first to see the code
      </Placeholder>
    );
  }
  return (
    <Tabs defaultValue="tsx" className="w-full min-w-full">
      <div className="flex justify-between">
        <TabsList>
          <TabsTrigger value="tsx">TSX</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="server-action">Server action</TabsTrigger>
        </TabsList>
        <GeneratedCodeInfoCard />
      </div>
      <TabsContent value="tsx" tabIndex={-1}>
        <CodeBlockTSX />
        <div className="border-t border-dashed w-full mt-6" />
        <CodeBlockPackagesInstallation />
      </TabsContent>
      <TabsContent value="schema" tabIndex={-1}>
        <CodeBlockZodSchema />
      </TabsContent>
      <TabsContent value="server-action" tabIndex={-1}>
        <CodeBlockServerAction />
      </TabsContent>
    </Tabs>
  );
}
