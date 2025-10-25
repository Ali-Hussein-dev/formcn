"use client";

import { usePreviewForm } from "@/form-builder/hooks/use-preview-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormElementsSidebar } from "@/form-builder/components/form-element-select";
import { FormEdit } from "@/form-builder/components/edit/form-edit";
import { FormPreview } from "@/form-builder/components/preview/form-preview";
import {
  JsonViewer,
  CodePanel,
} from "@/form-builder/components/generated-code/code-panel";
import * as React from "react";
import { CommandProvider } from "@/form-builder/hooks/use-command-ctx";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { FormElementsSelectCommand } from "@/form-builder/components/form-elements-select-command";
import { redirect, useSearchParams } from "next/navigation";
import useLocalForms from "../hooks/use-local-forms";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { Placeholder } from "@/form-builder/components/placeholder";
import dynamic from "next/dynamic";
import { FormBuilderSkeleton } from "./form-skeleton";
import { MdOutlineEditOff } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { WebPreview } from "./web-preview";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/shared/error-fallback";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

const tabsList = [
  {
    name: "Edit",
    icon: <MdOutlineEditOff />,
  },
  {
    name: "Code",
    icon: <HiOutlineCodeBracket />,
  },
  // {
  //   name: "JSON",
  // },
  {
    name: "Submission",
    icon: <BsFillSendFill />,
  },
];

//======================================
export function FormBuilderBase() {
  const previewForm = usePreviewForm();
  const { submittedData, cleanEditingFields: resetForm } = previewForm;
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const searchParams = useSearchParams();
  // const getFormById = useLocalForms((s) => s.getFormById);
  // const updateForm = useLocalForms((s) => s.updateForm);
  const id = searchParams.get("id");
  // const foundform = getFormById(id!);
  const saveForm = useLocalForms((s) => s.updateForm);

  function handleSaveForm() {
    if (!id) return;
    saveForm({ id, formElements });
    toast.message("Form changes saved locally", { duration: 1000 });
  }
  if (!id) {
    redirect("/my-forms");
  }

  return (
    <div>
      <div className="mb-1 flex justify-between items-center rounded-xs pr-3 pl-1 py-1">
        <Button variant="ghost" className="flex gap-2" asChild>
          <Link href={`/my-forms?id=${id}`}>
            <FaArrowLeft />
            Back
          </Link>
        </Button>
        <CommandProvider>
          <FormElementsSelectCommand />
        </CommandProvider>
      </div>
      <div className="w-full grid lg:grid-cols-12 gap-3">
        <div className="lg:col-span-2 lg:pl-2">
          <FormElementsSidebar />
        </div>
        <div className="w-full lg:col-span-6 min-w-full grow">
          <Tabs defaultValue={tabsList[0].name}>
            <TabsList className="w-full">
              {tabsList.map((tab) => (
                <TabsTrigger key={tab.name} value={tab.name} className="w-full">
                  {tab.icon}
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={tabsList[0].name} tabIndex={-1}>
              {formElements.length > 0 ? (
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <div className="pt-2">
                    <FormEdit />
                    <div className="pt-4 flex items-center justify-between">
                      {formElements.length > 1 && (
                        <Button variant="ghost" onClick={resetForm}>
                          Remove All
                        </Button>
                      )}
                      <Button variant="secondary" onClick={handleSaveForm}>
                        Save
                      </Button>
                    </div>
                  </div>
                </ErrorBoundary>
              ) : (
                <div>
                  <Placeholder>
                    Add fields first from the left sidebar or use{" "}
                    <KbdGroup>
                      <Kbd>Alt</Kbd>+<Kbd>f</Kbd>
                    </KbdGroup>{" "}
                    to open the command palette
                  </Placeholder>
                </div>
              )}
            </TabsContent>
            <TabsContent value={tabsList[1].name} tabIndex={-1}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <CodePanel />
              </ErrorBoundary>
            </TabsContent>
            {/* <TabsContent value={tabsList[2].name} tabIndex={-1}>
              <JsonViewer json={formElements} isMS={isMS} />
            </TabsContent> */}
            <TabsContent value={tabsList[2].name} tabIndex={-1}>
              {Object.keys(submittedData).length > 0 ? (
                <JsonViewer json={submittedData} isMS={isMS} />
              ) : (
                <Placeholder>
                  Fill out the form to see fields values
                </Placeholder>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-4 w-full pb-6">
          <WebPreview>
            <div className="bg-background">
              <div className="pb-2 border">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <FormPreview
                    {...previewForm}
                    formElements={formElements}
                    isMS={isMS}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </WebPreview>
        </div>
      </div>
    </div>
  );
}

export const FormBuilder = dynamic(
  () => import("./form-builder").then((mod) => mod.FormBuilderBase),
  {
    ssr: false,
    loading: () => <FormBuilderSkeleton />,
  }
);
