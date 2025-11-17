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
import type { FormElement, Option } from "@/form-builder/form-types";
import { useForm } from "react-hook-form";
import { RenderFormElement } from "@/form-builder/components/edit/render-form-element";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { MdAttachFile, MdOutlineTextFields, MdStar } from "react-icons/md";
import { FaLink, FaPhone, FaClock } from "react-icons/fa";
import { MdEmail, MdOutlineNumbers, MdOutlinePassword } from "react-icons/md";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdAdd, MdDelete, MdEdit, MdCheck, MdClose } from "react-icons/md";
import { LuGripVertical } from "react-icons/lu";
import { Reorder } from "motion/react";
import { useListState } from "@mantine/hooks";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { BiParagraph } from "react-icons/bi";
import { hasAttribute } from "@/form-builder/lib/has-attribute";
import { formFieldsIcons } from "@/form-builder/constant/form-elements-list";
import {
  socialKeys,
  socialLogsUrls,
} from "@/form-builder/constant/social-logos-urls";
import { LuCalendar1, LuCalendarDays, LuCalendarRange } from "react-icons/lu";

const OptionLabel = ({
  label,
  Icon,
}: {
  label: string;
  Icon: React.ReactNode;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role="button"
          className="size-full flex justify-center items-center"
        >
          {Icon}
        </div>
      </TooltipTrigger>
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
  {
    value: "time",
    label: <OptionLabel label="Time" Icon={<FaClock />} />,
  },
];

const textVariants = [
  {
    label: <OptionLabel label="Header 1" Icon={<LuHeading1 />} />,
    value: "H1",
  },
  {
    label: <OptionLabel label="Header 2" Icon={<LuHeading2 />} />,
    value: "H2",
  },
  {
    label: <OptionLabel label="Header 3" Icon={<LuHeading3 />} />,
    value: "H3",
  },
  {
    label: <OptionLabel label="Paragraph" Icon={<BiParagraph />} />,
    value: "P",
  },
];
const Logo = ({ src }: { src: string }) => (
  <div className="grid place-items-center rounded-full dark:bg-white size-5">
    <img src={src} width={14} height={14} />
  </div>
);

const socialMediaButtonsVariants = Object.entries(socialLogsUrls).map(
  ([key, value]) => ({
    value: key,
    label: (
      <div className="flex gap-2 items-center py-1">
        <Logo src={value.src} />
        <span className="capitalize">{key}</span>
      </div>
    ),
  })
);

function OptionsList({
  options = [],
  onChange,
}: {
  options: Option[];
  onChange: (options: Option[]) => void;
}) {
  const [localOptions, handlers] = useListState<Option>(options);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  const [editingOption, setEditingOption] = React.useState<Option>({
    value: "",
    label: "",
  });

  const addOption = () => {
    const newOption: Option = {
      value: `option_${Date.now()}`,
      label: `Option ${options.length + 1}`,
    };
    handlers.append(newOption);
    onChange([...localOptions, newOption]);
  };

  const deleteOption = (index: number) => {
    handlers.remove(index);
    const updatedOptions = localOptions.filter((_, i) => i !== index);
    onChange(updatedOptions);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditingOption({ ...localOptions[index] });
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      handlers.setItem(editingIndex, editingOption);
      const updatedOptions = localOptions.map((option, index) =>
        index === editingIndex ? editingOption : option
      );
      onChange(updatedOptions);
      setEditingIndex(null);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingOption({ value: "", label: "" });
  };
  const handleReorder = (newOrder: Option[]) => {
    onChange(newOrder);
    handlers.setState(newOrder);
  };
  return (
    <div className="space-y-3 w-full py-1">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Options ({localOptions.length})
        </Label>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addOption}
          className="h-8 px-2"
        >
          <MdAdd className="h-4 w-4 mr-1" />
          Add Option
        </Button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        <Reorder.Group
          axis="y"
          onReorder={handleReorder}
          values={localOptions}
          className="space-y-2"
          layoutScroll
        >
          {localOptions.map((option, index) => (
            <Reorder.Item
              key={option.value}
              value={option}
              className="flex items-center gap-2 py-2 pr-2 pl-4 border rounded-md cursor-grab active:cursor-grabbing group bg-secondary"
            >
              <LuGripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              {editingIndex === index ? (
                <>
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label className="text-xs text-muted-foreground">
                          Label
                        </Label>
                        <Input
                          value={editingOption.label as string}
                          onChange={(e) => {
                            const newLabel = e.target.value;
                            const newValue = newLabel.toLowerCase();
                            // .replace(/[^a-z0-9]/g, "_")
                            // .replace(/_+/g, "_")
                            // .replace(/^_|_$/g, "");
                            setEditingOption({
                              ...editingOption,
                              label: newLabel,
                              value: newValue,
                            });
                          }}
                          placeholder="Option label"
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs text-muted-foreground">
                          Value
                        </Label>
                        <Input
                          value={editingOption.value}
                          onChange={(e) =>
                            setEditingOption({
                              ...editingOption,
                              value: e.target.value,
                            })
                          }
                          placeholder="Option value"
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={saveEdit}
                      className="size-8"
                    >
                      <MdCheck className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={cancelEdit}
                      className="size-8"
                    >
                      <MdClose className="size-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {option.label}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      Value: {option.value}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 duration-200">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(index)}
                      className="size-8"
                    >
                      <MdEdit className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteOption(index)}
                      className="size-8"
                    >
                      <MdDelete className="size-4" />
                    </Button>
                  </div>
                </>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {options.length === 0 && (
          <div className="text-center py-4 text-sm text-muted-foreground border-2 border-dashed rounded-md">
            No options added yet. Click "Add Option" to get started.
          </div>
        )}
      </div>
    </div>
  );
}

function FormElementAttributes({
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
  const { fieldType } = formElement;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-4 border-t border-dashed dark:border-foreground/30"
    >
      {/* {JSON.stringify(form.watch(), null, 2)} */}
      {/* {JSON.stringify(formElement, null, 2)} */}
      <div className="space-y-4 pb-4 pt-1">
        {/* //-----------------------CONTENT */}
        {hasAttribute({
          fieldType,
          attribute: "content",
        }) && (
          <div className="space-y-3">
            <RenderFormElement
              formElement={{
                id: formElement.id,
                name: "content",
                label: `Add text content`,
                fieldType: "Input",
                type: "text",
                required: true,
              }}
              form={form}
            />
            {hasAttribute({
              fieldType,
              attribute: "deprecated",
            }) ? (
              <p className="text-destructive-foreground bg-destructive/10 rounded-sm p-2.5 text-sm">
                This element is longer supported, Please use the Text element
                instead so that you switch between different text tags easily
              </p>
            ) : (
              <RenderFormElement
                formElement={{
                  id: formElement.id,
                  name: "variant",
                  label: "Pick text tag",
                  fieldType: "ToggleGroup",
                  type: "single",
                  defaultValue: "H1",
                  options: textVariants,
                  required: true,
                }}
                form={form}
              />
            )}
          </div>
        )}
        {/* //-----------------------LABEL */}
        <div className="flex items-center justify-between gap-4">
          {hasAttribute({
            fieldType,
            attribute: "label",
          }) && (
            <RenderFormElement
              formElement={{
                id: formElement.id,
                name: "label",
                label: `Label`,
                fieldType: "Input",
              }}
              form={form}
            />
          )}
          {/* //-----------------------NAME */}
          {hasAttribute({
            fieldType,
            attribute: "name",
          }) && (
            <RenderFormElement
              formElement={{
                id: formElement.id,
                name: "name",
                label: `Name`,
                fieldType: "Input",
              }}
              form={form}
            />
          )}
        </div>
        {/* //-----------------------PLACEHOLDER */}
        {hasAttribute({
          fieldType,
          attribute: "placeholder",
        }) && (
          <RenderFormElement
            formElement={{
              id: formElement.id,
              name: "placeholder",
              label: `Placeholder`,
              fieldType: "Input",
            }}
            form={form}
          />
        )}
        {/* //-----------------------DESCRIPTION */}
        {hasAttribute({
          fieldType,
          attribute: "description",
        }) && (
          <RenderFormElement
            formElement={{
              id: formElement.id,
              name: "description",
              label: `Description`,
              fieldType: "Textarea",
            }}
            form={form}
          />
        )}
        {/* //-----------------------ToggleGroup */}
        {fieldType === "ToggleGroup" && (
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
        {/* //-----------------------OPTIONS */}
        {hasAttribute({
          fieldType,
          attribute: "options",
        }) && (
          <OptionsList
            // @ts-expect-error safe
            options={formElement.options || []}
            onChange={(options) => form.setValue("options", options)}
          />
        )}
        {/* //-----------------------INPUT */}
        {fieldType === "Input" && (
          <RenderFormElement
            formElement={{
              id: formElement.id,
              name: "type",
              label: "Type",
              fieldType: "ToggleGroup",
              type: "single",
              options: inputTypes,
              required: true,
              value: formElement.type,
            }}
            form={form}
          />
        )}
        {/* //-----------------------SLIDER */}
        {fieldType === "Slider" && (
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
        {/* //-----------------------REQUIRED/DISABLED */}
        {hasAttribute({
          fieldType,
          attribute: "required",
        }) && (
          <div className="flex items-center w-full gap-4 justify-start pt-2">
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
        )}
        {/* //-----------------------RATING */}
        {fieldType === "Rating" && (
          <div className="w-full border-t pt-2 border-dashed">
            <h2 className="flex items-center gap-1.5 text-forground mb-3 font-medium text-lg">
              <MdStar />
              Rating options
            </h2>
            <RenderFormElement
              formElement={{
                id: formElement.id,
                name: "numberOfStars",
                label: "Number of stars",
                fieldType: "Input",
                type: "number",
                defaultValue: 5,
                required: false,
              }}
              form={form}
            />
          </div>
        )}
        {/* //-----------------------FILEUPLOAD */}
        {fieldType === "FileUpload" && (
          <div className="w-full border-t pt-2 border-dashed">
            <h2 className="flex items-center gap-1.5 text-forground mb-3 font-medium text-lg">
              <MdAttachFile />
              Set constraints for file upload
            </h2>
            <div className="space-y-2 w-full">
              <RenderFormElement
                formElement={{
                  id: formElement.id,
                  name: "maxSize",
                  label: (
                    <div className="flex items-center justify-between gap-1.5 w-full">
                      Max size (in bytes)
                      <span className="text-right">
                        {(form.watch("maxSize") / 1048576).toFixed(2)}
                        MB
                      </span>
                    </div>
                  ) as unknown as string,
                  placeholder: "E.g. ",
                  fieldType: "Input",
                  type: "number",
                  min: 1,
                }}
                form={form}
              />
              <RenderFormElement
                formElement={{
                  id: formElement.id,
                  name: "maxFiles",
                  label: "Max files, minimum 1 file",
                  placeholder: "Maximum number of files",
                  fieldType: "Input",
                  type: "number",
                  min: 1,
                }}
                form={form}
              />
              <RenderFormElement
                formElement={{
                  id: formElement.id,
                  name: "accept",
                  placeholder: "image/*, audio/*, video/*, .pdf, .doc, .docx",
                  label: "Accept attribute",
                  description:
                    "Comma separated list of MIME types or file extensions",
                  fieldType: "Input",
                  type: "string",
                }}
                form={form}
              />
            </div>
          </div>
        )}

        {/* //-----------------------DatePicker */}
        {fieldType === "DatePicker" && (
          <div className="space-y-5 mb-2">
            <RenderFormElement
              formElement={{
                id: formElement.id,
                name: "mode",
                label: "Select date picker mode",
                fieldType: "ToggleGroup",
                type: "single",
                options: [
                  {
                    value: "single",
                    label: (
                      <div className="flex items-center gap-2">
                        <LuCalendar1 className="size-3.5 text-muted-foreground" />
                        Single date
                      </div>
                    ),
                  },
                  {
                    value: "multiple",
                    label: (
                      <div className="flex items-center gap-2">
                        <LuCalendarDays className="size-3.5 text-muted-foreground" />
                        Multiple dates
                      </div>
                    ),
                  },
                  {
                    value: "range",
                    label: (
                      <div className="flex items-center gap-2">
                        <LuCalendarRange className="size-3.5 text-muted-foreground" />
                        Date range
                      </div>
                    ),
                  },
                ],
                required: true,
                value: formElement.mode,
              }}
              form={form}
            />
          </div>
        )}
        {/* //-----------------------SOCIALINKS */}
        {fieldType === "SocialMediaButtons" && (
          <div className="space-y-5 mb-2">
            <RenderFormElement
              formElement={{
                id: formElement.id,
                name: "links",
                label: "Social media icons",
                description: `${socialKeys.length} options are available to select`,
                fieldType: "MultiSelect",
                // type: "multiple",
                placeholder: "Tap to select",
                options: socialMediaButtonsVariants,
                value: formElement.links,
                required: true,
              }}
              form={form}
            />
            <RenderFormElement
              formElement={{
                id: formElement.id,
                name: "layout",
                label: "Choose layout for social links",
                fieldType: "ToggleGroup",
                type: "single",
                options: [
                  { value: "row", label: "Row" },
                  { value: "column", label: "Column" },
                ],
                required: true,
                value: formElement.layout,
              }}
              form={form}
            />
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
  const title = "Customize field attributes";
  const Icon = formFieldsIcons[formElement.fieldType];
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
          <DrawerHeader className="px-0 flex items-center gap-2 justify-start flex-row">
            <Icon className="size-5 text-muted-foreground" />
            <DrawerTitle className="text-start text-lg">{title}</DrawerTitle>
          </DrawerHeader>
          <FormElementAttributes
            fieldIndex={fieldIndex}
            stepIndex={stepIndex}
            j={j}
            {...formElement}
            close={close}
          />
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
        <DialogHeader className="flex items-center gap-2 justify-start flex-row">
          <Icon className="size-5 text-muted-foreground" />
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <FormElementAttributes
          fieldIndex={fieldIndex}
          stepIndex={stepIndex}
          j={j}
          {...formElement}
          close={close}
        />
      </DialogContent>
    </Dialog>
  );
}
