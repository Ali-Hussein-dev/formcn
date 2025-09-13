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
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { convertToKababCase } from "@/lib/utils";
import { motion } from "motion/react";

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
        className="*:mt-0 [&_pre]:p-3 w-full overflow-y-auto dark:bg-accent! bg-accent/5!"
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
  MultiSelect: "@formcn/multi-select",
  Password: "@formcn/password",
  FileUpload: "@formcn/file-upload",
};

const PackagesInstallation = ({
  list,
}: {
  list: { value: string; name: string }[];
}) => {
  const [activeTab, setActiveTab] = React.useState("pnpm");

  return (
    <Tabs
      defaultValue="pnpm"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mt-2 rounded-md bg-accent py-2 px-1"
    >
      <div className="flex justify-between border-b border-dashed pb-1 px-2">
        <TabsList>
          <IoTerminal className="mr-1.5" />
          {list.map((item) => (
            <TabsTrigger key={item.name} value={item.name}>
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <CopyButton
          text={list.find((item) => item.name === activeTab)?.value!}
        />
      </div>
      {list.map((item) => (
        <TabsContent key={item.name} value={item.name}>
          <div>
            <pre className="px-3 py-2 text-accent-foreground/80 text-wrap">
              {item.value}
            </pre>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

//======================================
const Cli = ({
  registryDependencies,
  tsx,
  zodSchema,
  meta,
  isMS,
}: {
  registryDependencies: string[];
  tsx: { file: string; code: string }[];
  zodSchema: string;
  meta: { id: string; name: string };
  isMS: boolean;
}) => {
  const res = useMutation({
    mutationKey: ["registry", meta.id],
    mutationFn: async () => {
      const name = convertToKababCase(meta.name);
      const key = name + "-" + meta.id.split("-").slice(0, 2).join("-");
      const res = await fetch(`/r/${key}`, {
        method: "POST",
        body: JSON.stringify({
          name,
          key,
          dependencies: [
            "react-hook-form",
            "zod",
            "@hookform/resolvers",
            "motion",
            "next-safe-action",
          ],
          registryDependencies: isMS
            ? [...registryDependencies, "@formcn/server-action", "progress"]
            : [...registryDependencies, "@formcn/server-action"],
          files: [
            {
              path: `components/${name}.tsx`,
              content: tsx[0].code,
              type: "registry:component",
              target: "",
            },
            {
              path: `lib/form-schema.ts`,
              content: zodSchema,
              type: "registry:lib",
              target: "",
            },
          ],
        }),
      });
      return res.json();
    },
  });
  const { status, data } = res;
  const getCommands = (id: string) => [
    { name: "pnpm", value: `pnpm dlx shadcn@latest add ${id}` },
    { name: "npm", value: `npmx shadcn@latest add ${id}` },
    { name: "yarn", value: `yarn shadcn@latest add ${id}` },
    { name: "bun", value: `bunx --bun shadcn@latest add ${id}` },
  ];
  return (
    <div>
      <Button
        onClick={() => {
          if (meta.id && meta.name) {
            res.mutate();
          } else {
            toast.error("Please fill in the form name and id");
          }
        }}
        disabled={res.status === "pending"}
        className="w-full active:scale-100 active:translate-y-0.5 mb-4"
      >
        {status === "pending" ? "Fetching..." : "Fetch registry ID"}
      </Button>
      {status == "error" && (
        <div className="text-destructive text-center py-2">
          {res.error?.message}
        </div>
      )}
      {status === "success" && data?.data?.id && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <PackagesInstallation list={getCommands(data.data.id)} />
        </motion.div>
      )}
    </div>
  );
};
//======================================
export function CodeBlockPackagesInstallation({
  depenedenciesTabs,
  registryDependeciesTabs,
}: {
  depenedenciesTabs: { value: string; name: string }[];
  registryDependeciesTabs: { value: string; name: string }[];
}) {
  return (
    <div className="w-full py-5 max-w-full">
      <h2 className="font-sembold text-start">Install base packages</h2>
      <PackagesInstallation list={depenedenciesTabs} />
      <h2 className="font-sembold text-start mt-4">
        Install required form components
      </h2>
      <PackagesInstallation list={registryDependeciesTabs} />
    </div>
  );
}
const CodeBlockTSX = ({ code }: { code: { file: string; code: string }[] }) => {
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
  return (
    <div className="relative max-w-full flex flex-col gap-y-5">
      {formattedCode.map((item, i) => (
        <Wrapper key={i} title={item.file} language="tsx">
          {item.code}
        </Wrapper>
      ))}
    </div>
  );
};
const CodeBlockZodSchema = ({ code }: { code: string }) => {
  const [formattedCode, setFormattedCode] = React.useState("");
  React.useEffect(() => {
    formatCode(code).then(setFormattedCode);
  }, [code]);
  return (
    <div className="relative max-w-full">
      <Wrapper title="schema.ts" language="typescript">
        {formattedCode}
      </Wrapper>
    </div>
  );
};
const useGenerateCode = () => {
  const formElements = useFormBuilderStore((s) => s.formElements);
  const meta = useFormBuilderStore((s) => s.meta);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const tsx = generateFormCode({
    formElements: formElements as FormElementOrList[],
    isMS,
  });
  const parsedFormElements = isMS
    ? flattenFormSteps(formElements as FormStep[])
    : formElements.flat();
  const zodSchema = genFormZodSchemaCode(parsedFormElements as FormElement[]);
  const serverAction = generateServerActionCode();
  const processedFormElements = isMS
    ? flattenFormSteps(formElements as FormStep[])
    : formElements;
  const formElementTypes = (processedFormElements.flat() as FormElement[])
    .filter((el) => !el.static)
    .map((el) => el.fieldType)
    .map((str) => installableShadcnComponents[str])
    .filter((str) => str && str.length > 0);

  const packagesSet = new Set(formElementTypes);
  let registryDependencies = [...Array.from(packagesSet), "form"].join(" ");
  if (isMS) {
    registryDependencies += " @formcn/multi-step-viewer";
  }
  const dependencies =
    "react-hook-form zod @hookform/resolvers motion next-safe-action";
  const dependenciesTabs = [
    {
      name: "pnpm",
      value: `pnpm add ${dependencies}`,
    },
    {
      name: "npm",
      value: `npm i ${dependencies}`,
    },
    {
      name: "yarn",
      value: `yarn add ${dependencies}`,
    },
    {
      name: "bun",
      value: `bun add ${dependencies}`,
    },
  ];
  const registryDependenciesTabs = [
    {
      name: "pnpm",
      value: `pnpm dlx shadcn@latest add ${registryDependencies}`,
    },
    {
      name: "npm",
      value: `npx shadcn@latest add ${registryDependencies}`,
    },
    {
      name: "yarn",
      value: `yarn shadcn@latest add ${registryDependencies}`,
    },
    {
      name: "bun",
      value: `bunx --bun shadcn@latest add ${registryDependencies}`,
    },
  ];

  return {
    tsx,
    zodSchema,
    serverAction,
    meta,
    registryDependencies,
    dependencies,
    registryDependenciesTabs,
    dependenciesTabs,
    isMS,
  };
};
const CodeBlockServerAction = ({
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
  const {
    serverAction,
    zodSchema,
    tsx,
    dependenciesTabs,
    registryDependenciesTabs,
    registryDependencies,
    meta,
    isMS,
  } = useGenerateCode();
  if (formElements.length < 1) {
    return (
      <Placeholder>
        No form fields, add fields first to see the code
      </Placeholder>
    );
  }
  return (
    <div>
      <Tabs defaultValue="cli" className="w-full min-w-full">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>
          <GeneratedCodeInfoCard />
        </div>
        <TabsContent value="cli" tabIndex={-1}>
          <Cli
            registryDependencies={registryDependencies.split(" ")}
            tsx={tsx}
            zodSchema={zodSchema}
            meta={meta}
            isMS={isMS}
          />
        </TabsContent>
        <TabsContent value="manual" tabIndex={-1}>
          <Tabs defaultValue="tsx" className="w-full min-w-full">
            <TabsList>
              <TabsTrigger value="tsx">TSX</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="server-action">Server action</TabsTrigger>
            </TabsList>
            <TabsContent value="tsx" tabIndex={-1}>
              <CodeBlockTSX code={tsx} />
              <div className="border-t border-dashed w-full mt-6" />
              <CodeBlockPackagesInstallation
                depenedenciesTabs={dependenciesTabs}
                registryDependeciesTabs={registryDependenciesTabs}
              />
            </TabsContent>
            <TabsContent value="schema" tabIndex={-1}>
              <CodeBlockZodSchema code={zodSchema} />
            </TabsContent>
            <TabsContent value="server-action" tabIndex={-1}>
              <CodeBlockServerAction code={serverAction} />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
