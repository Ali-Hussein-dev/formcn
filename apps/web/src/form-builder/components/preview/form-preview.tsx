import { Form } from "@/components/ui/form";
import { RenderFormElement } from "@/form-builder/components/edit/render-form-element";
import type { FormElementOrList, FormStep } from "@/form-builder/form-types";
import { Button } from "@/components/ui/button";
import { MultiStepFormPreview } from "@/form-builder/components/preview/multi-step-form-preview";
import { useFormBuilder } from "@/form-builder/hooks/use-form-builder";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import type { UseFormReturn } from "react-hook-form";
import * as React from "react";

interface FormPreviewProps {
  form: UseFormReturn<any, any, any>;
}

export function SingleStepFormPreview({ form }: FormPreviewProps) {
  const { onSubmit } = useFormBuilder();
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const data = Object.keys(form.watch());
  const { formState } = form;
  return (
    <div className="w-full animate-in rounded-md">
      {data.length > 0 ? (
        <Form {...form}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!isMS) {
                await form.handleSubmit(onSubmit)(e);
              }
            }}
            className="flex flex-col p-2 md:px-5 w-full gap-2"
          >
            {isMS ? (
              <MultiStepFormPreview
                formElements={formElements as unknown as FormStep[]}
                form={form}
              />
            ) : (
              (formElements as FormElementOrList[]).map((element, i) => {
                if (Array.isArray(element)) {
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2"
                    >
                      {element.map((el, ii) => (
                        <div key={el.name + ii} className="w-full">
                          <RenderFormElement formElement={el} form={form} />
                        </div>
                      ))}
                    </div>
                  );
                }
                return (
                  <div key={element.name + i} className="w-full">
                    <RenderFormElement formElement={element} form={form} />
                  </div>
                );
              })
            )}
            {!isMS && (
              <div className="flex items-center justify-end w-full pt-3">
                <Button type="submit" className="rounded-lg" size="sm">
                  {formState.isSubmitting
                    ? "Submitting..."
                    : formState.isSubmitted
                    ? "Submitted"
                    : "Submit"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      ) : (
        <div className="h-full py-10 px-3">
          <p className="text-center text-muted-foreground text-lg">
            Add form elements to preview
          </p>
        </div>
      )}
    </div>
  );
}
