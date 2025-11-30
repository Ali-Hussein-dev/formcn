import { isStatic } from "@/form-builder/lib/utils";
import type { FormElement } from "@/form-builder/form-types";
import { z, type ZodType } from "zod";

/**
 * use in form preview
 */
export const genFormZodSchema = (
  formElements: FormElement[]
): z.ZodObject<any> => {
  const schemaObject: Record<string, ZodType> = {};

  const addType = (element: FormElement): void => {
    if (isStatic(element.fieldType)) return;
    let elementSchema: ZodType = z.string({ error: "This field is required" });
    // .min(1, "Empty string is not allowed");
    switch (element.fieldType) {
      case "Input":
        if (element.type === "email") {
          elementSchema = z.email({ error: "Please enter a valid email" });
        }
        if (element.type === "url") {
          elementSchema = z.url({
            error: "Please enter a valid url",
          });
        }
        if (element.type === "number") {
          elementSchema = z.number({
            message: "Please enter a valid number",
          });
        }
        if (element.type === "tel") {
          elementSchema = z.coerce.number();
        }
        if (element.type === "time") {
          elementSchema = z
            .string()
            .refine(
              (value) => value.match(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/),
              "Please enter a valid time 00:00:00"
            );
        }
        break;
      case "Textarea":
        elementSchema = z.string({ error: "This field is required" });
        break;
      case "Password":
        break;
      case "Switch":
      case "Checkbox":
        elementSchema = z.boolean().default(false);
        if (element.required) {
          elementSchema = z.literal(true, {
            error: "This field is required",
          });
        }
        break;
      case "Rating":
      case "Slider":
        elementSchema = z.coerce.number({
          error: "This field must be a number",
        });
        // if (element.fieldType === "Slider") {
        //   if (element.min !== undefined) {
        //     elementSchema = (elementSchema as any).min(
        //       element.min,
        //       `Must be at least ${element.min}`
        //     );
        //   }
        //   if (element.max !== undefined) {
        //     elementSchema = (elementSchema as any).max(
        //       element.max,
        //       `Must be at most ${element.max}`
        //     );
        //   }
        // }
        break;
      case "Select":
      case "Combobox":
      case "RadioGroup":
        elementSchema = z.string();
        if (element.required) {
          elementSchema = z.string().min(1, "Please select an item");
        }
        break;
      case "ToggleGroup":
        elementSchema =
          element.type === "single"
            ? z.string().min(1, "Please select an item")
            : z.array(z.string()).min(1, "Please select at least one item");
        break;
      case "MultiSelect":
        elementSchema = z
          .array(z.string(), { error: "Please select at least one item" })
          .min(1, "Please select at least one item");
        break;
      case "DatePicker":
        if (element.mode === "single") {
          elementSchema = z.date({ error: "This field is required" });
        }
        if (element.mode === "range") {
          elementSchema = z.object({
            from: z.date({ error: "This field is required" }),
            to: z.date({ error: "This field is required" }),
          });
        }
        if (element.mode === "multiple") {
          elementSchema = z.array(z.date({ error: "This field is required" }));
        }
        break;
      case "TagInput":
        elementSchema = z.array(z.object({
          id: z.string(),
          text: z.string(),
        }));
        if (element.required) {
          elementSchema = z.array(z.object({
            id: z.string(),
            text: z.string(),
          }), { error: "Please enter at least one tag" }).min(1, "Please enter at least one tag");
        }
        break;
      case "FileUpload":
        const fileSchema = z
          .file()
          .max(element.maxSize!, { error: "File size is too big" })
          .mime(element.accept?.split(", ") ?? [], {
            error: "File type is not allowed",
          });
        elementSchema = z.union([
          fileSchema,
          z.array(fileSchema).nonempty({ message: "Please select a file" }),
          z.string().min(1, "Please select a file"),
          z.instanceof(FileList),
        ]);
        if (!element.required) {
          elementSchema = elementSchema.optional();
        }
        break;
      case "OTP":
        elementSchema = z.string().min(6, "Please enter a valid OTP");
        break;
      default:
        elementSchema = z.unknown();
    }
    if (!("required" in element) || !element.required) {
      elementSchema = elementSchema.optional();
    }
    // Ensure fieldSchema is of typZodType
    schemaObject[element.name] = elementSchema as ZodType;
  };
  formElements.flat().forEach(addType);

  return z.object(schemaObject);
};

export const genFieldZodSchemaCode = (formElement: FormElement): string => {
  const { fieldType } = formElement;
  if (isStatic(fieldType)) return "";
  let schemaItem = "z.string({ error: 'This field is required' })";
  switch (fieldType) {
    case "Input":
      if (formElement.type === "email") {
        schemaItem = "z.email({error: 'Please enter a valid email'})";
      }
      if (formElement.type === "url") {
        schemaItem = "z.url({error: 'Please enter a valid url'})";
      }
      if (formElement.type === "number") {
        schemaItem = "z.coerce.number({error: 'Please enter a valid number'})";
      }
      if (formElement.type === "tel") {
        schemaItem =
          "z.coerce.number({error: 'Please enter a valid phone number'})";
      }
      if (formElement.type === "time") {
        schemaItem =
          "z.string({error: 'Please enter a valid time 00:00:00'}).refine((value) => value.match(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/), 'Please enter a valid time 00:00:00')";
      }
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "Textarea":
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "Password":
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "Switch":
    case "Checkbox":
      schemaItem = "z.literal(true, {error: 'This field is required'})";
      if (!formElement.required) {
        schemaItem = "z.boolean().default(false)";
      }
      return schemaItem;
    case "Rating":
    case "Slider":
      schemaItem = "z.coerce.number({error: 'This field is required'})";
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "Select":
    case "Combobox":
    case "RadioGroup":
      schemaItem = "z.string().min(1, 'Please select an item')";
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "ToggleGroup":
      if (formElement.type === "single") {
        schemaItem = "z.string().min(1,'Please select an item')";
      } else {
        schemaItem = `z
        .array(z.string(), { error: 'Please select at least one item'})
        .min(1,'Please select at least one item')`;
      }
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "MultiSelect":
      schemaItem = `
      z.array(z.string(), { error: 'Please select at least one item'})
       .min(1,'Please select at least one item')`;
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "DatePicker":
      if (formElement.mode === "single") {
        schemaItem = "z.date({error: 'This field is required'})";
      }
      if (formElement.mode === "range") {
        schemaItem =
          "z.object({from: z.date({error: 'This field is required'}), to: z.date({error: 'This field is required'})})";
      }
      if (formElement.mode === "multiple") {
        schemaItem = "z.array(z.date({error: 'This field is required'}))";
      }
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "TagInput":
      schemaItem = `z.array(z.object({
        id: z.string(),
        text: z.string(),
      }), { error: "Please enter at least one tag" }).min(1, "Please enter at least one tag")`;
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "FileUpload":
      const mime = JSON.stringify(formElement.accept?.split(", ") ?? []);
      schemaItem = `z.union([
          z.file()
           .mime(${mime})
           .max(${formElement.maxSize!}),
          z.array(
            z.file()
             .mime(${mime})
             .max(${formElement.maxSize!})
          ).nonempty({ message: "Please select a file" }),
          z.string().min(1, "Please select a file"),
          z.instanceof(FileList),
        ])`;
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    case "OTP":
      schemaItem = "z.string().min(6, 'Please enter a valid OTP')";
      if (!formElement.required) {
        schemaItem += ".optional()";
      }
      return schemaItem;
    default:
      return "z.unknown()";
  }
};

export const genFormZodSchemaCode = (formElements: FormElement[]): string => {
  const schema = genFormZodSchema(formElements);
  const schemaEntries = Object.entries(schema.shape)
    .map(([key, value]) => {
      return `"${key}": ${genFieldZodSchemaCode(
        formElements.find((o) => o.name === key)!
      )}`;
    })
    .join(",\n");

  return `
  import * as z from "zod"

  export interface ActionResponse<T = any> {
      success: boolean
      message: string
      errors?: {
          [K in keyof T]?: string[]
      }
      inputs?: T
  }
  export const formSchema = z.object({\n${schemaEntries}\n});`;
};
