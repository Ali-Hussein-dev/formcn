"use client";

import { usePreviewForm } from "@/form-builder/hooks/use-preview-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormElementTemplateSelect } from "@/form-builder/components/form-element-template-select";
import { FormEdit } from "@/form-builder/components/edit/form-edit";
import { FormPreview } from "@/form-builder/components/preview/form-preview";
import {
  JsonViewer,
  GeneratedFormCodeViewer,
} from "@/form-builder/components/generated-code/code-viewer";
import * as React from "react";
import { CommandProvider } from "@/form-builder/hooks/use-command-ctx";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { PiStackSimple, PiStackPlusLight } from "react-icons/pi";

const tabsList = [
  {
    name: "Edit",
  },
  {
    name: "Code",
  },
  {
    name: "JSON",
  },
  {
    name: "Submission",
  },
];

//======================================
export function FormBuilder() {
  const { submittedData, resetForm, form } = usePreviewForm();
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const setIsMS = useFormBuilderStore((s) => s.setIsMS);
  return (
    <div className="pt-4 pb-20">
      <div className="w-full grid lg:grid-cols-12 gap-3 border rounded border-dashed">
        <div className="lg:col-span-2 py-3 lg:pl-2">
          <CommandProvider>
            <FormElementTemplateSelect />
          </CommandProvider>
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
                <div className="">
                  <div className="pb-4 flex items-center justify-between">
                    <Button variant="outline" onClick={() => setIsMS(!isMS)}>
                      {isMS ? (
                        <>
                          <PiStackSimple />
                          Single-step Form
                        </>
                      ) : (
                        <>
                          <PiStackPlusLight />
                          Multi-step Form
                        </>
                      )}
                    </Button>
                    {formElements.length > 1 && (
                      <Button variant="ghost" onClick={resetForm}>
                        Reset
                      </Button>
                    )}
                  </div>
                  <FormEdit />
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
            <TabsContent value={tabsList[2].name} tabIndex={-1}>
              <JsonViewer json={formElements} isMS={isMS} />
            </TabsContent>
            <TabsContent value={tabsList[3].name} tabIndex={-1}>
              <JsonViewer json={submittedData} isMS={isMS} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-4 w-full px-2 pb-6">
          <FormPreview form={form} />
        </div>
      </div>
    </div>
  );
}
