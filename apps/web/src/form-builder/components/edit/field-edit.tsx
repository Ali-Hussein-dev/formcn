import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FaEdit } from "react-icons/fa";
import type { FormElement } from "@/form-builder/form-types";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { isStatic } from "@/form-builder/libs/utils";
import { RenderFormElement } from "@/form-builder/components/edit/render-form-element";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { MdOutlineTextFields } from "react-icons/md";
import { FaLink, FaPhone } from "react-icons/fa";
import { MdEmail, MdOutlineNumbers, MdOutlinePassword } from "react-icons/md";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const OptionLabel = ({
  label,
  Icon,
}: {
  label: string;
  Icon: React.ReactNode;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>{Icon}</TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const inputTypes = [
  {
    value: "text",
    label: <OptionLabel label="Text" Icon={<MdOutlineTextFields />} />,
  },
  {
    value: "number",
    label: <OptionLabel label="Number" Icon={<MdOutlineNumbers />} />,
  },
  { value: "url", label: <OptionLabel label="URL" Icon={<FaLink />} /> },
  {
    value: "password",
    label: <OptionLabel label="Password" Icon={<MdOutlinePassword />} />,
  },
  {
    value: "email",
    label: <OptionLabel label="Email" Icon={<MdEmail />} />,
  },
  {
    value: "tel",
    label: <OptionLabel label="Phone number" Icon={<FaPhone />} />,
  },
];

function FormElementOptions({
  fieldIndex,
  close,
  j,
  stepIndex,
  ...formElement
}: FormElement & {
  fieldIndex: number;
  stepIndex?: number;
  j?: number;
  close: () => void;
}) {
  const form = useForm<FormElement>({
    defaultValues: formElement as FormElement,
  });
  const editElement = useFormBuilderStore((s) => s.editElement);
  const { handleSubmit, getValues } = form;
  const onSubmit = () => {
    editElement({
      fieldIndex: fieldIndex,
      modifiedFormElement: getValues(),
      j,
      stepIndex,
    });
    close();
  };
  // const hasOptions = ['Select', 'MultiSelect'].includes(formElement.fieldType);
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-4 border-t border-dashed dark:border-foreground/30"
      >
        {/* {JSON.stringify(watch(), null, 2)} {index} */}
        {/* {JSON.stringify(formElement, null, 2)} */}
        <div>
          {isStatic(formElement.fieldType) ? (
            <div className="mb-4">
              <RenderFormElement
                formElement={{
                  id: formElement.id,
                  name: "content",
                  label: `Customize ${formElement.fieldType}`,
                  fieldType: "Input",
                  defaultValue: formElement.content,
                  required: true,
                  className: "border-secondary",
                }}
                form={form}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-start w-full gap-3 mb-2">
              <RenderFormElement
                formElement={{
                  id: formElement.id,
                  name: "label",
                  label: "Label attribute",
                  fieldType: "Input",
                  type: "text",
                  required: true,
                }}
                form={form}
              />
              <div className="flex items-center justify-between gap-4 w-full">
                <RenderFormElement
                  formElement={{
                    id: formElement.id,
                    name: "name",
                    label: "Name attribute",
                    fieldType: "Input",
                    defaultValue: formElement.name,
                    required: true,
                    className: "outline-secondary",
                  }}
                  form={form}
                />
                <RenderFormElement
                  formElement={{
                    id: formElement.id,
                    name: "placeholder",
                    label: "Placeholder attribute",
                    fieldType: "Input",
                    type: "text",
                    required: true,
                  }}
                  form={form}
                />
              </div>
              <RenderFormElement
                formElement={{
                  id: formElement.id,
                  name: "description",
                  label: "Description attribute",
                  fieldType: "Input",
                  placeholder: "Add a description",
                }}
                form={form}
              />
              {formElement.fieldType === "Input" && (
                <RenderFormElement
                  formElement={{
                    id: formElement.id,
                    name: "type",
                    label: "Type attribute",
                    fieldType: "ToggleGroup",
                    type: "single",
                    options: inputTypes,
                    required: true,
                    value: formElement.type,
                  }}
                  form={form}
                />
              )}
              {formElement.fieldType === "Slider" && (
                <div className="flex items-center justify-between gap-4">
                  <RenderFormElement
                    formElement={{
                      id: formElement.id,
                      name: "min",
                      label: "Min value",
                      fieldType: "Input",
                      type: "number",
                      defaultValue: formElement.min,
                      required: true,
                    }}
                    form={form}
                  />
                  <RenderFormElement
                    formElement={{
                      id: formElement.id,
                      name: "max",
                      label: "Max value",
                      fieldType: "Input",
                      type: "number",
                      defaultValue: formElement.max,
                      required: true,
                    }}
                    form={form}
                  />
                  <RenderFormElement
                    formElement={{
                      id: formElement.id,
                      name: "step",
                      label: "Step value",
                      fieldType: "Input",
                      type: "number",
                      defaultValue: formElement.step,
                      required: true,
                    }}
                    form={form}
                  />
                </div>
              )}
              {formElement.fieldType === "ToggleGroup" && (
                <RenderFormElement
                  formElement={{
                    id: formElement.id,
                    name: "type",
                    label: "Choose single or multiple choices",
                    fieldType: "ToggleGroup",
                    options: [
                      { value: "single", label: "Single" },
                      { value: "multiple", label: "Multiple" },
                    ],
                    defaultValue: formElement.type,
                    required: true,
                    type: "single",
                  }}
                  form={form}
                />
              )}
              <div className="flex items-center w-full gap-4 justify-start">
                <div>
                  <RenderFormElement
                    formElement={{
                      id: formElement.id,
                      name: "required",
                      label: "Required",
                      fieldType: "Checkbox",
                    }}
                    form={form}
                  />
                </div>
                <RenderFormElement
                  formElement={{
                    id: formElement.id,
                    name: "disabled",
                    label: "Disabled",
                    fieldType: "Checkbox",
                  }}
                  form={form}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 w-full">
          <Button size="sm" variant="ghost" onClick={close} type="button">
            Cancel
          </Button>
          <Button size="sm" type="submit" variant="secondary">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export function FieldCustomizationView({
  fieldIndex,
  formElement,
  j,
  stepIndex,
}: {
  fieldIndex: number;
  j?: number;
  formElement: FormElement;
  stepIndex?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const close = () => setOpen(false);
  const title = "Customize form field attributes";
  const SavedFormElementOptions = () => (
    <FormElementOptions
      fieldIndex={fieldIndex}
      stepIndex={stepIndex}
      j={j}
      {...formElement}
      close={close}
    />
  );
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-xl h-9"
          >
            <FaEdit />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-glass px-4">
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-start text-lg">{title}</DrawerTitle>
          </DrawerHeader>
          <SavedFormElementOptions />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-xl h-9"
        >
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[530px] bg-glass"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <SavedFormElementOptions />
      </DialogContent>
    </Dialog>
  );
}
