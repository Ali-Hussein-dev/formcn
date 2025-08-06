"use client";

import { useFormBuilder } from "@/form-builder/hooks/use-form-builder";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormElementTemplateSelect } from "@/form-builder/components/form-element-template-select";
import { FormEdit } from "@/form-builder/components/edit/form-edit";
import { SingleStepFormPreview } from "@/form-builder/components/preview/form-preview";
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
  const { submittedData, resetForm, form } = useFormBuilder();
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const setIsMS = useFormBuilderStore((s) => s.setIsMS);
  return (
    <div className="pt-4 pb-20">
      <div className="w-full grid md:grid-cols-12 gap-3 lg:gap-5 border rounded  border-dashed">
        <div className="border-r border-dashed md:col-span-2 py-3 px-2">
          <CommandProvider>
            <FormElementTemplateSelect />
          </CommandProvider>
        </div>
        <div className="sm:px-0 w-full md:col-span-6 min-w-full grow py-6 px-2">
          <Tabs defaultValue={tabsList[0].name} className="">
            <TabsList className="w-full">
              {tabsList.map((tab) => (
                <TabsTrigger key={tab.name} value={tab.name} className="w-full">
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={tabsList[0].name} tabIndex={-1}>
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
        <div className="md:col-span-4 w-full px-2 pb-6 border-l border-dashed">
          <SingleStepFormPreview form={form} />
        </div>
      </div>
    </div>
  );
}
