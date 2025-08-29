import { Form } from "@/components/ui/form";
import { RenderFormElement } from "@/form-builder/components/edit/render-form-element";
import type { FormElementOrList, FormStep } from "@/form-builder/form-types";
import { Button } from "@/components/ui/button";
import { MultiStepFormPreview } from "@/form-builder/components/preview/multi-step-form-preview";
import { usePreviewForm } from "@/form-builder/hooks/use-preview-form";
import type { UseFormReturn } from "react-hook-form";
import * as React from "react";
import { cn } from "@/lib/utils";

type PreviewFormReturn = ReturnType<typeof usePreviewForm>;
type FormPreviewProps = PreviewFormReturn & {
  form: UseFormReturn<any, any, any>;
  formElements: FormElementOrList[] | FormStep[];
  isMS: boolean;
};

export function FormPreview({
  form,
  formElements,
  isMS,
  onSubmit,
}: FormPreviewProps) {
  const { formState } = form;
  if (formElements.length < 1)
    return (
      <div className="h-full py-10 px-3">
        <p className="text-center text-lg text-balance font-medium">
          Nothing to preview. Add form elements to preview
        </p>
      </div>
    );
  return (
    <div
      className={cn(
        "w-full animate-in rounded-md",
        // add padding to the top when no header
        !isMS && formElements[0].hasOwnProperty("static") === true
          ? ""
          : "pt-4.5"
      )}
    >
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
            <>
              {(formElements as FormElementOrList[]).map((element, i) => {
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
              })}
              <div className="flex items-center justify-end w-full pt-3 gap-3">
                <Button
                  variant="outline"
                  type="button"
                  size="sm"
                  disabled={formState.isSubmitting}
                  className="rounded-lg"
                  onClick={() => form.reset({})}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="rounded-lg"
                  size="sm"
                  disabled={formState.isSubmitting || formState.isSubmitted}
                >
                  {formState.isSubmitting
                    ? "Submitting..."
                    : formState.isSubmitted
                    ? "Submitted"
                    : "Submit"}
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
