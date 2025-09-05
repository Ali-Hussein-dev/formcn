"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { aiFormSchema } from "@/form-builder/lib/ai-form-schema";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ErrorBoundary } from "react-error-boundary";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import React from "react";
import { ArrowUp, Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import useLocalForms from "@/form-builder/hooks/use-local-forms";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ErrorFallback } from "@/components/shared/error-fallback";
import {
  fieldTypes,
  formFieldTypeWithOptions,
  type FormFieldTypeWithOptions,
  type FormElement,
  type FormFieldType,
} from "@/form-builder/form-types";
import { RenderFormElement } from "@/form-builder/components/edit/render-form-element";

function RenderFormWhileStreaming({
  list,
  form,
}: {
  list: FormElement[] | undefined;
  form: any;
}) {
  if (!list) return null;
  return (
    <div className="space-y-2">
      {list.map((element, i) => {
        if (
          !fieldTypes.includes(element.fieldType as FormFieldType) ||
          !element?.name
        )
          return <span key={crypto.randomUUID()}>streaming...</span>;
        if (
          formFieldTypeWithOptions.includes(
            element.fieldType as FormFieldTypeWithOptions
          ) &&
          // @ts-expect-error options exists
          (!element.options || element.options.length < 1)
        ) {
          return <span key={crypto.randomUUID()}>streaming...</span>;
        }
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <RenderFormElement formElement={element} form={form} />
            </ErrorBoundary>
          </motion.div>
        );
      })}
    </div>
  );
}

const promptExamples = [
  {
    label: "RSVP Event",
    prompt:
      "a RSVP event form with name, email, phone, meal preferences, additional note, How did you hear about the event? (dropdown or text)",
  },
  {
    label: "New Employee",
    prompt:
      "a new employee form with name, email, phone, message fields, and department selection",
  },
  {
    label: "Survey Form",
    prompt:
      "a survey form with Multiple choice questions, open-ended questions, and rating scale",
  },
  {
    label: "Booking/Reservation Form",
    prompt:
      "a booking/reservation form with name, email, phone, message fields, and date selection",
  },
];
const useAiFormGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const id = React.useRef(crypto.randomUUID());

  const { object, submit, isLoading, error, stop } = useObject({
    api: `/api/generate?prompt=${encodeURIComponent(prompt)}`,
    schema: aiFormSchema,
    id: id.current,
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    submit({ prompt });
  };

  const form = useForm();
  const setFormElements = useFormBuilderStore((s) => s.setFormElements);
  const saveForm = useLocalForms((s) => s.setForm);
  const router = useRouter();

  const handleSave = () => {
    toast.message("Saving form...");
    const formElements = (object?.form?.fields as FormElement[])
      ?.filter((o) => fieldTypes.includes(o.fieldType as FormFieldType))
      .map((o: FormElement) => ({
        ...o,
        id: o?.id ? o.id : crypto.randomUUID(),
      }));
    const formId = crypto.randomUUID();
    const date = new Date().toISOString();
    const formName = object?.form?.title ?? "New Form " + date;
    setFormElements(formElements, {
      id: formId,
      name: formName,
      isMS: false,
    });
    // now save in locatForms
    saveForm({
      id: formId,
      name: formName,
      formElements,
      createdAt: date,
      updatedAt: date,
      isMS: false,
    });
    router.push(`/form-builder?id=${formId}`);
  };

  return {
    prompt,
    setPrompt,
    handleGenerate,
    fields: object?.form?.fields,
    form,
    error,
    isLoading,
    stop,
    handleSave,
  };
};
export function AiFormGenerator() {
  const {
    prompt,
    setPrompt,
    handleGenerate,
    fields,
    form,
    error,
    isLoading,
    stop,
    handleSave,
  } = useAiFormGenerator();
  return (
    <div>
      <div className="w-full flex flex-col justify-end mb-4">
        <div className="w-full border  rounded-md p-2 focus-within:bg-secondary/30 transition-colors duration-200">
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a contact form with name, email, and message fields"
            className="bg-transparent dark:bg-transparent border-none resize-none focus-visible:ring-0 shadow-none"
            autoFocus
          />
          <div className="flex justify-end pt-2">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="stop-button"
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: 0.01 }}
                >
                  <Button
                    onClick={stop}
                    className="w-fit"
                    size="sm"
                    variant="secondary"
                  >
                    <span className="size-3 rounded bg-foreground" />
                    Stop
                  </Button>
                </motion.div>
              )}
              {!isLoading && (
                <motion.div
                  key="generate-button"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Button
                    onClick={handleGenerate}
                    className="w-fit"
                    size="sm"
                    disabled={!prompt}
                  >
                    Generate <ArrowUp />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {fields && (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(error, errorInfo) => {
            console.error("Form rendering error:", error, errorInfo);
          }}
        >
          <Form {...form}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
              }}
              className="flex flex-col w-full gap-4 p-4 lg:p-6 border rounded-lg bg-muted/50"
            >
              <RenderFormWhileStreaming
                list={fields as FormElement[]}
                form={form}
              />
            </form>
          </Form>
        </ErrorBoundary>
      )}
      {error && (
        <div className="text-destructive-foreground pt-3 text-center">
          {error.message}
        </div>
      )}
      {fields && !isLoading && !error && (
        <div className="flex justify-end">
          <Button onClick={handleSave} type="button">
            Edit
          </Button>
        </div>
      )}
      <div hidden={!!fields || !!error?.message}>
        <h2 className="text-xl font-bold mb-1">Form Examples</h2>
        <div className="flex gap-2 pt-1 w-full justify-start">
          {promptExamples.map((o) => (
            <Button
              variant="outline"
              key={o.prompt}
              onClick={() => setPrompt(o.prompt)}
            >
              {o.label}
            </Button>
          ))}
        </div>
        <p className="text-muted-foreground text-sm pt-5 flex items-center gap-1.5 justify-start">
          <Info className="size-4" />
          Generating multi-step form with AI is not supported yet!
        </p>
      </div>
    </div>
  );
}
