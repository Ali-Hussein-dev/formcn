import { FieldGroup } from "@/components/ui/field";
import { RenderFormElement } from "@/form-builder/components/edit/render-form-element";
import type { FormElementOrList, FormStep } from "@/form-builder/form-types";
import { Button } from "@/components/ui/button";
import { MultiStepFormPreview } from "@/form-builder/components/preview/multi-step-form-preview";
import { usePreviewForm } from "@/form-builder/hooks/use-preview-form";
import type { UseFormReturn } from "react-hook-form";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";

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
  const [rerender, setRerender] = React.useState(false);
  const { formState } = form;
  const { isDirty, isSubmitSuccessful, isSubmitting } = formState;
  if (formElements.length < 1)
    return (
      <div className="h-full py-10 px-3">
        <p className="text-center text-lg text-balance font-medium">
          Nothing to preview. Add form elements to preview
        </p>
      </div>
    );
  if (isSubmitSuccessful) {
    return (
      <div className="py-5">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
          className="h-full py-6 px-3"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
            className="mb-4 flex justify-center"
          >
            <CheckCircle className="size-10" />
          </motion.div>
          <h2 className="text-center text-lg text-pretty font-semibold">
            Form submitted successfully
          </h2>
          <p className="text-center text-lg text-pretty text-muted-foreground">
            Thank you for your submission, we will get back to you soon
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, damping: 25 }}
          className="flex items-center justify-center"
        >
          <Button
            variant="outline"
            onClick={() => {
              form.reset({});
              setRerender(!rerender);
            }}
          >
            Back to form
          </Button>
        </motion.div>
      </div>
    );
  }
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
      <div className="w-full">
        <form
          key={rerender ? "reset" : "normal"}
          onSubmit={async (e) => {
            e.preventDefault();
            if (!isMS) {
              await form.handleSubmit(onSubmit)(e);
            }
          }}
          className="flex flex-col p-2 md:px-5 w-full"
        >
          <FieldGroup className="gap-3">
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
                  {isDirty && (
                    <Button
                      variant="outline"
                      type="button"
                      size="sm"
                      disabled={isSubmitting}
                      className="rounded-lg"
                      onClick={() => {
                        form.reset({});
                        setRerender(!rerender);
                      }}
                    >
                      Reset
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="rounded-lg"
                    size="sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </>
            )}
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
