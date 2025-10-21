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
import { ArrowLeft, ArrowUp, Info, Pencil } from "lucide-react";
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
import { MdOutlineReplay } from "react-icons/md";

// const list = [];
function RenderFormWhileStreaming({
  list,
  form,
}: {
  list: FormElement[] | undefined;
  form: any;
}) {
  if (!list) return null;
  return (
    <div className="space-y-3">
      {list.map((element, i) => {
        if (
          !fieldTypes.includes(element.fieldType as FormFieldType) ||
          (!element?.name && !("content" in element))
        )
          return <span key={crypto.randomUUID()}>streaming...</span>;
        if (
          formFieldTypeWithOptions.includes(
            element.fieldType as FormFieldTypeWithOptions
          ) &&
          // @ts-expect-error options exists
          (!element.options || element.options?.length < 1)
        ) {
          return <span key={crypto.randomUUID()}>streaming...</span>;
        }
        if (element.fieldType == "SocialMediaButtons") {
          if (!element.links || element.links?.length < 1) {
            return <span key={crypto.randomUUID()}>streaming...</span>;
          }
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
      "Create a form that allows users to RSVP for an event. The form should collect attendee names, contact information (email and phone), number of guests, and include any special requirements or comments. Add a date/time picker for the event, and a field for selecting attendance (Yes/No/Maybe).",
  },
  {
    label: "New Employee",
    prompt:
      "a new employee professional form for startup Acme works in IoT. split it into two sections",
  },
  {
    label: "Survey Form",
    prompt: `Create a survey form for React library that includes these sections:  
First, multiple choice questions where users pick from several options. Next, include at least one open-ended question for written feedback. Finally, add a rating scale question so users can rate their experience numerically. Label each section clearly and make sure all three types are present.`,
  },
  {
    label: "Booking/Reservation Form",
    prompt:
      "create a hotel booking form to collect guest details including title, description, name, contact info, check-in and check-out dates, room type selection, and any additional requests",
  },
];
const useAiFormGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const { object, submit, isLoading, error, stop } = useObject({
    api: `/api/generate?prompt=${encodeURIComponent(prompt)}`,
    // @ts-ignore error message is verbose and messy
    schema: aiFormSchema,
    // initialValue: {
    //   form: {
    //     title: "New Form",
    //     fields: list,
    //   },
    // },
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    submit({ prompt });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && prompt.trim()) {
        handleGenerate();
      }
    }
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
  const handleNew = () => {
    setPrompt("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
    handleNew,
    inputRef,
    response: object,
    handleKeyDown,
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
    handleNew,
    inputRef,
    handleKeyDown,
  } = useAiFormGenerator();
  const router = useRouter();

  return (
    <div>
      <div className="w-full flex flex-col justify-end mb-4 md:mb-8">
        <div className="w-full border  rounded-md p-2 focus-within:bg-secondary/30 transition-colors duration-200">
          <Textarea
            id="prompt-area"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., a contact form with name, email, and message fields"
            className="bg-transparent dark:bg-transparent border-none resize-none focus-visible:ring-0 shadow-none md:text-base text-secondary-foreground"
            autoFocus
            ref={inputRef}
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
      {/* <pre>{JSON.stringify(fields, null, 2)}</pre> */}
      {fields && (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(error, errorInfo) => {
            console.error("Form rendering error:", error, errorInfo);
            console.log(fields);
          }}
        >
          <Form {...form}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
              }}
              className="flex flex-col w-full gap-6 p-4 lg:p-6 border rounded-lg bg-muted/50"
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
        <div className="flex justify-between gap-4 pt-4">
          <Button onClick={() => router.back()} type="button" variant="ghost">
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleNew} type="button" variant="secondary">
              <MdOutlineReplay className="size-4" />
              Retry
            </Button>
            <Button onClick={handleSave} type="button">
              <Pencil className="size-4" />
              Edit
            </Button>
          </div>
        </div>
      )}
      <div hidden={!!fields || !!error?.message}>
        <h2 className="text-xl font-bold mb-1">Form Examples</h2>
        <div className="flex gap-2 pt-1 w-full justify-start flex-wrap">
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
