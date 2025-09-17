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
    generateImports(flattenedFormElements as FormElement[], { isMS })
  ).join("\n");
const successCard = `<div className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border">
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
            className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
          >
            <Check className="size-8" />
          </motion.div>
          <h2 className="text-center text-2xl text-pretty font-bold mb-2">
            Thank you
          </h2>
          <p className="text-center text-lg text-pretty text-muted-foreground">
            Form submitted successfully, we will get back to you soon
          </p>
        </motion.div>
      </div>`;

  const singleStepFormCode = [
    {
      file: "single-step-form.tsx",
      code: `
${imports}

type Schema = z.infer<typeof formSchema>;

export function DraftForm() {

const form = useForm<Schema>({
  resolver: zodResolver(formSchema as any),
})
const formAction = useAction(serverAction, {
  onSuccess: () => {
    // TODO: show success message
    form.reset();
  },
  onError: () => {
  // TODO: show error message
  },
});
const handleSubmit = form.handleSubmit(async (data: Schema) => {
    formAction.execute(data);
  });

const { isExecuting, hasSucceeded } = formAction;
  if (hasSucceeded) {
    return (
      ${successCard}
    );
  }
return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border">
        ${renderFields(formElements as FormElementOrList[])}
        <div className="flex justify-end items-center w-full pt-3">
          <Button className="rounded-lg" size="sm">
            {isExecuting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
)
}`,
    },
  ];
  if (!isMS) return singleStepFormCode;

  // Handle multi-step form
  function stringifyStepComponents(steps: FormStep[]): string {
    const componentEntries = steps.map((step, index) => {
      const fields = step.stepFields
        .flat()
        .filter((field) => !field.static)
        .map((o) => o.name);
      const renderedFields = renderFields(step.stepFields);
      return `
      { 
        fields: ${JSON.stringify(fields)},
        component: <div className="space-y-4">
                ${renderedFields}
                  </div>
      }
      `;
    });
    return componentEntries.join(",");
  }

  const stringifiedStepComponents = stringifyStepComponents(
    formElements as FormStep[]
  );

  const MSF_Code = `
  ${imports}

//------------------------------
type Schema = z.infer<typeof formSchema>;
export function GeneratedForm() {
    
  const form = useForm<Schema>({
    resolver: zodResolver(formSchema as any),
  });
  const formAction = useAction(serverAction, {
      onSuccess: () => {
        // TODO: show success message
        form.reset();
      },
      onError: () => {
        // TODO: show error message
      },
  });
  const handleSubmit = form.handleSubmit(async (data: Schema) => {
    formAction.execute(data);
  });
  const { isExecuting, hasSucceeded } = formAction;
  const stepsFields = [${stringifiedStepComponents}];

  if (hasSucceeded) {
    return (
      ${successCard}
    );
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border">
        <MultiStepFormProvider
          stepsFields={stepsFields}
          onStepValidation={async (step) => {
            const isValid = await form.trigger(step.fields);
            return isValid;
          }}>
          <MultiStepFormContent>
            <FormHeader />
            <StepFields />
            <FormFooter>
                <PreviousButton>
                  <ChevronLeft />
                  Previous
                </PreviousButton>
                <NextButton>
                  Next <ChevronRight />
                </NextButton>
                <SubmitButton 
                  type="submit"
                  disabled={isExecuting} 
                >
                  {isExecuting ? "Submitting..." : "Submit"}
                </SubmitButton>
              </FormFooter>
            </MultiStepFormContent>
          </MultiStepFormProvider>
        </form>
      </Form>
    </div>
  )
}
`;

  const multiStepFormCode = [
    {
      file: "multi-step-form.tsx",
      code: MSF_Code,
    },
  ];
  return multiStepFormCode;
};
