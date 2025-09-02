import type {
  FormElement,
  FormElementOrList,
  FormStep,
} from "@/form-builder/form-types";
import { generateImports } from "@/form-builder/lib/generate-imports";
import { flattenFormSteps } from "@/form-builder/lib/form-elements-helpers";
import { getFormElementCode } from "@/form-builder/lib/generate-form-component";

const renderFields = (fields: FormElementOrList[]) => {
  return fields
    .map((FormElement) => {
      if (Array.isArray(FormElement)) {
        return `
          <div className="flex items-center justify-between flex-wrap sm:flex-nowrap w-full gap-2">
            ${FormElement.map((field) => getFormElementCode(field)).join("")}
          </div>`;
      }
      return getFormElementCode(FormElement);
    })
    .join("\n");
};

export const generateFormCode = ({
  formElements,
  isMS,
}: {
  formElements: FormElementOrList[] | FormStep[];
  isMS: boolean;
}): { file: string; code: string }[] => {
  const flattenedFormElements = isMS
    ? flattenFormSteps(formElements as FormStep[]).flat()
    : formElements.flat();

  const imports = Array.from(
    generateImports(flattenedFormElements as FormElement[])
  ).join("\n");

  const defaultValues = "{}";

  const singleStepFormCode = [
    {
      file: "single-step-form.tsx",
      code: `
${imports}
const initialState = {
  success: false,
  message: "",
}

export function DraftForm() {

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: ${defaultValues},
})
const doSthAction = useAction(serverAction, {
  onSuccess: () => {
    // TODO: show success message
    form.reset();
  },
  onError: () => {
  // TODO: show error message
  },
});
function handleSubmit(){
  form.handleSubmit(doSthAction.execute) 
}
const isPending = doSthAction.status === "executing"

return (
  <div>
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border">
        ${renderFields(formElements as FormElementOrList[])}
        <div className="flex justify-end items-center w-full pt-3">
          <Button className="rounded-lg" size="sm">
            {isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  </div>
)
}`,
    },
  ];
  if (!isMS) return singleStepFormCode;

  // Handle multi-step form
  function stringifyStepComponents(steps: any[]): string {
    const componentEntries = steps.map((step, index) => {
      const stepNumber = index + 1;
      const renderedFields = renderFields(step.stepFields);
      return `  ${stepNumber}: <div>${renderedFields}</div>`;
    });

    return `{\n${componentEntries.join(",\n")}\n}`;
  }

  const stringifiedStepComponents = stringifyStepComponents(
    formElements as FormStep[]
  );

  const MSF_Code = `
  ${imports}
  import { useState } from 'react'
  import { Progress } from '@/components/ui/progress'
  import { motion, AnimatePresence } from 'motion/react'
  import { useMultiStepForm } from './use-multi-step-form'
  export function DraftForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: ${defaultValues},
    })

   const doSthAction = useAction(serverAction, {
    onSuccess: () => {
      // TODO: show success message
      form.reset();
    },
    onError: () => {
    // TODO: show error message
    },
  });
  function handleSubmit(){
    form.handleSubmit(doSthAction.execute) 
  }
  const isPending = doSthAction.status === "executing"
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border">
          <MultiStepViewer form={form} />
          <div className="flex justify-end items-center w-full pt-3">
            <Button className="rounded-lg" size="sm">
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
//------------------------------
export function MultiStepViewer({
  form,
  }: {
    form: any;
    }) {
    const stepFormElements: { [key: number]: JSX.Element } = ${stringifiedStepComponents};
    
    const steps = Object.keys(stepFormElements).map(Number);
    const { formState } = form;
    const { isSubmitting, isSubmitted } = formState;
    const [rerender, setRerender] = React.useState(false);
    const { currentStep, isLastStep, goToNext, goToPrevious, isFirstStep, goToFirstStep } = useMultiStepForm({
      initialSteps: steps,
      onStepValidation: async (step) => {
        const stepFields = (step.stepFields as FormElement[])
              .flat()
              .filter((o) => !o.static)
              .map((o) => o.name);
        const isValid = await form.trigger(stepFields);
        return isValid;
      },
    });
  const current = stepFormElements[currentStep - 1];
  return (
    <div className="flex flex-col gap-2 pt-3">
      <div className="flex flex-col items-center justify-start gap-1">
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
          transition={{ duration: 0.4, type: 'spring' }}
          className="flex flex-col gap-2"
        >
          {current}
        </motion.div>
      </AnimatePresence>
      <div className="w-full pt-3 flex items-center justify-end gap-3 ">
        {formState.isDirty && (
          <div className="grow">
            <Button
              variant="outline"
              type="button"
              size="sm"
              disabled={formState.isSubmitting}
              className="rounded-lg ml-0"
              onClick={() => {
                goToFirstStep();
                form.reset({});
                setRerender(!rerender);
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
              e.preventDefault();
              await form.handleSubmit((data) => {
                console.log("Form submitted:", data);
              })();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : isSubmitted
                ? "Submitted "
                : "Submit"}
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
  );
}`;
  const useMultiStepFormCode = `
  import type { FormStep } from "@/form-builder/form-types";
  import { useState } from "react";

  type UseFormStepsProps = {
    initialSteps: FormStep[];
    onStepValidation?: (step: FormStep) => Promise<boolean> | boolean;
  };
  
  export type UseMultiFormStepsReturn = {
    steps: FormStep[];
  
    currentStep: number;
  
    currentStepData: FormStep;
  
    progress: number;
  
    isFirstStep: boolean;
  
    isLastStep: boolean;
  
    goToNext: () => Promise<boolean>;
  
    goToPrevious: () => void;
  
    goToFirstStep: () => void;
  };
  
  export function useMultiStepForm({
    initialSteps,
    onStepValidation,
  }: UseFormStepsProps): UseMultiFormStepsReturn {
    const steps = initialSteps;
    const [currentStep, setCurrentStep] = useState(1);
    const goToNext = async () => {
      const currentStepData = initialSteps[currentStep - 1];
  
      if (onStepValidation) {
        const isValid = await onStepValidation(currentStepData);
        if (!isValid) return false;
      }
  
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1);
        return true;
      }
      return false;
    };
  
    const goToPrevious = () => {
      if (currentStep > 1) {
        setCurrentStep((prev) => prev - 1);
      }
    };
  
    const goToFirstStep = () => {
      setCurrentStep(1);
    };
    return {
      steps,
      currentStep,
      currentStepData: steps[currentStep - 1],
      progress: (currentStep / steps.length) * 100,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === steps.length,
      goToNext,
      goToPrevious,
      goToFirstStep,
    };
  }`;
  const multiStepFormCode = [
    {
      file: "multi-step-form.tsx",
      code: MSF_Code,
    },
    {
      file: "use-multi-step-form.tsx",
      code: useMultiStepFormCode,
    },
  ];
  return multiStepFormCode;
};
