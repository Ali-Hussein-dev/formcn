"use client";

import { usePreviewForm } from "@/form-builder/hooks/use-preview-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormElementsSidebar } from "@/form-builder/components/form-element-select";
import { FormEdit } from "@/form-builder/components/edit/form-edit";
import { FormPreview } from "@/form-builder/components/preview/form-preview";
import {
  JsonViewer,
  GeneratedFormCodeViewer,
} from "@/form-builder/components/generated-code/code-viewer";
import * as React from "react";
import { CommandProvider } from "@/form-builder/hooks/use-command-ctx";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { FormElementsSelectCommand } from "@/form-builder/components/form-elements-select-command";
import { redirect, useSearchParams } from "next/navigation";
import useLocalForms from "../hooks/use-local-forms";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

const tabsList = [
  {
    name: "Edit",
  },
  {
    name: "Code",
  },
  // {
  //   name: "JSON",
  // },
  {
    name: "Submission",
  },
];

//======================================
export function FormBuilder() {
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
      <div className="mb-1 flex justify-between items-center  border-dashed rounded-xs pr-3 pl-1 py-1">
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
      <div className="w-full grid lg:grid-cols-12 gap-3 border rounded border-dashed">
        <div className="lg:col-span-2 py-3 lg:pl-2">
          <FormElementsSidebar />
        </div>
        <div className="w-full lg:col-span-6 min-w-full grow py-6 px-4 border-y sm:border-y-0 sm:border-x border-dashed">
          <Tabs defaultValue={tabsList[0].name} className="">
            <TabsList className="w-full">
              {tabsList.map((tab) => (
                <TabsTrigger key={tab.name} value={tab.name} className="w-full">
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={tabsList[0].name} tabIndex={-1}>
              {formElements.length > 0 ? (
                <div className="pt-2">
                  <FormEdit />
                  <div className="pt-4 flex items-center justify-between">
                    <Button variant="ghost" onClick={handleSaveForm}>
                      Save
                    </Button>
                    {formElements.length > 1 && (
                      <Button variant="ghost" onClick={resetForm}>
                        Remove All
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center pt-20 text-lg">
                    No form elements added
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value={tabsList[1].name} tabIndex={-1}>
              <GeneratedFormCodeViewer />
            </TabsContent>
            {/* <TabsContent value={tabsList[2].name} tabIndex={-1}>
              <JsonViewer json={formElements} isMS={isMS} />
            </TabsContent> */}
            <TabsContent value={tabsList[2].name} tabIndex={-1}>
              <JsonViewer json={submittedData} isMS={isMS} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-4 w-full px-2 pb-6">
          <FormPreview
            {...previewForm}
            formElements={formElements}
            isMS={isMS}
          />
        </div>
      </div>
    </div>
  );
}
