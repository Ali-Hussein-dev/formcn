"use client"
import { Button } from "@/components/ui/button"
import type { FormElement, FormStep } from "@/form-builder/form-types"
import { useMultiStepForm } from "@/form-builder/hooks/use-multi-step-form"
import { AnimatePresence, motion } from "motion/react"
import { Progress } from "@/components/ui/progress"
import { RenderFormElement } from "@/form-builder/components/edit/render-form-element"
import type { UseFormReturn } from "react-hook-form"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Used to render a multi-step form in preview mode
 */
export function MultiStepFormPreview({
  form,
  formElements,
}: {
  form: UseFormReturn<any, any, undefined>
  formElements: FormStep[]
}) {
  const {
    currentStep,
    isLastStep,
    goToNext,
    goToPrevious,
    isFirstStep,
    goToFirstStep,
  } = useMultiStepForm({
    initialSteps: formElements as FormStep[],
    onStepValidation: async (step) => {
      const stepFields = (step.stepFields as FormElement[])
        .flat()
        .filter((o) => !("static" in o))
        .map((o) => o.name)
      const isValid = await form.trigger(stepFields)
      return isValid
    },
  })
  const steps = formElements as FormStep[]
  const current = formElements[currentStep - 1] as FormStep
  const { formState } = form
  const { isSubmitting } = formState
  const [rerender, setRerender] = React.useState(false)
  return (
    <div className="flex flex-col gap-2 pt-3">
      <div className="flex flex-col items-start justify-center gap-1 pb-4">
        <span>
          Step {currentStep} of {steps.length}
        </span>
        <Progress value={(currentStep / steps.length) * 100} />
      </div>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="grid grid-cols-6 gap-3"
        >
          {current?.stepFields?.map((field, i) => {
            if (Array.isArray(field)) {
              return (
                <React.Fragment key={i}>
                  {field.map((el: FormElement, ii: number) => (
                    <div key={el.name + ii} className="w-full col-span-6">
                      <RenderFormElement formElement={el} form={form} />
                    </div>
                  ))}
                </React.Fragment>
              )
            }
            return (
              <div
                key={i}
                className={cn("col-span-6", (field.width as string) || "")}
              >
                <RenderFormElement formElement={field} form={form} />
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>
      <div className="w-full pt-3 flex items-center justify-end gap-3">
        {formState.isDirty && (
          <div className="grow">
            <Button
              variant="outline"
              type="button"
              size="sm"
              disabled={formState.isSubmitting}
              className="rounded-lg ml-0"
              onClick={() => {
                goToFirstStep()
                form.reset({})
                setRerender(!rerender)
              }}
            >
              Reset
            </Button>
          </div>
        )}
        {!isFirstStep && (
          <Button
            size="sm"
            variant="ghost"
            onClick={goToPrevious}
            type="button"
          >
            <ChevronLeft />
            Previous
          </Button>
        )}
        {isLastStep ? (
          <Button
            size="sm"
            type="button"
            onClick={async (e) => {
              e.preventDefault()
              await form.handleSubmit(async (data) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                console.log("Form submitted:", data)
              })()
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        ) : (
          <Button
            size="sm"
            type="button"
            variant="secondary"
            onClick={goToNext}
          >
            Next
            <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  )
}
