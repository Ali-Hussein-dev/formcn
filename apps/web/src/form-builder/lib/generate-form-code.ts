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
const formResponse = useAction(serverAction, {
  onSuccess: () => {
    // TODO: show success message
    form.reset();
  },
  onError: () => {
  // TODO: show error message
  },
});
function handleSubmit(){
  form.handleSubmit(formResponse.execute) 
}
const isPending = formResponse.status === "executing"

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
        component: <div>
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

  const MultiStepFormViewer = `

export const MultiStepViewerWrapper = ({ form }:{
  form: ReturnType<typeof useForm<typeof formSchema>>;
}) => {
  const stepsFields = [${stringifiedStepComponents}];
  const {
    formState: { isDirty, isSubmitting },
  } = form;
  return (
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
      <div className="grow">
        <ResetButton
          hidden={!isDirty}
          disabled={isSubmitting}
          onClick={() => {
            form.reset({});
          }}
        >
          Reset
        </ResetButton>
      </div>
      <PreviousButton>
        <ChevronLeft />
        Previous
      </PreviousButton>
      <NextButton>
        Next <ChevronRight />
      </NextButton>
      <SubmitButton
        onClick={async (e) => {
          e.preventDefault();
          await form.handleSubmit(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // console.log("Form submitted:", data);
          })();
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </SubmitButton>
    </FormFooter>
  </MultiStepFormContent>
</MultiStepFormProvider>
    )
  };
`;
  const MSF_Code = `
  ${imports}
  import {
  MultiStepFormContent,
  FormHeader,
  StepFields,
  FormFooter,
  ResetButton,
  PreviousButton,
  NextButton,
  SubmitButton,
} from "@/components/multi-step-viewer";
import { MultiStepFormProvider } from "@/hooks/use-multi-step-viewer";
import type { JSX } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

//------------------------------
${MultiStepFormViewer}
//------------------------------
export function GeneratedForm() {
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: ${defaultValues},
    })

  const formResponse = useAction(serverAction, {
      onSuccess: () => {
        // TODO: show success message
        form.reset();
      },
      onError: () => {
        // TODO: show error message
      },
  });
  function handleSubmit(){
    form.handleSubmit(formResponse.execute) 
  }
  const isPending = formResponse.status === "executing"
  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border">
          <MultiStepViewerWrapper form={form} />
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
`;

  const multiStepFormCode = [
    {
      file: "multi-step-form.tsx",
      code: MSF_Code,
    },
  ];
  return multiStepFormCode;
};
