import { isStatic } from "@/form-builder/lib/utils";
import type { FormElement } from "@/form-builder/form-types";
import { z, type ZodType } from "zod";

export const genFormZodSchema = (
  formElements: FormElement[]
): z.ZodObject<any> => {
  const schemaObject: Record<string, ZodType> = {};

  const addType = (element: FormElement): void => {
    if (isStatic(element.fieldType)) return;

    let elementSchema: ZodType;
    switch (element.fieldType) {
      case "Input":
        if (element.type === "email") {
          elementSchema = z.email();
          break;
        }
        if (element.type === "number") {
          elementSchema = z.coerce.number();
          break;
        }
        elementSchema = z.string().nonempty();
        break;
      case "DatePicker":
        elementSchema = z.coerce.date();
        break;
      case "Checkbox":
        elementSchema = z.boolean().default(false);
        break;
      case "Slider":
        elementSchema = z.coerce.number();
        break;
      case "Switch":
        elementSchema = z.boolean();
        break;
      case "Select":
        elementSchema = z.string().min(1, "Please an item");
        break;
      case "ToggleGroup":
        elementSchema =
          element.type === "single"
            ? z.string().min(1, "Please an item")
            : z.array(z.string()).nonempty("Please select at least one item");
        break;
      case "MultiSelect":
        elementSchema = z
          .array(z.string())
          .min(1, "Please select at least one item");
        break;
      case "RadioGroup":
        elementSchema = z.string().min(1, "Please select an item");
        break;
      case "FileUpload":
        elementSchema = z.union([
          z
            .file()
            .mime(element.accept?.split(", ") ?? [])
            .max(element.maxSize!),
          z.array(
            z
              .file()
              .mime(element.accept?.split(", ") ?? [])
              .max(element.maxSize!)
          ),
          z.string().min(1, "Please select a file"),
          z.instanceof(FileList),
        ]);
        break;
      default:
        elementSchema = z.string();
    }
    if (element.fieldType === "Slider") {
      if (element.min !== undefined) {
        elementSchema = (elementSchema as any).min(
          element.min,
          `Must be at least ${element.min}`
        );
      }
      if (element.max !== undefined) {
        elementSchema = (elementSchema as any).max(
          element.max,
          `Must be at most ${element.max}`
        );
      }
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

export const genFieldZodSchemaCode = (schema: ZodType): string => {
  if (schema instanceof z.ZodDefault) {
    return `${genFieldZodSchemaCode(
      schema.def.innerType as ZodType
    )}.default(${JSON.stringify(schema.def.defaultValue)})`;
  }

  if (schema instanceof z.ZodBoolean) {
    return "z.boolean()";
  }
  if (schema instanceof z.ZodFile) {
    let code = "z.file()";

    // Extract mime type constraints from the schema definition (Zod v4)
    if (schema.def && schema.def.checks) {
      const mimeCheck = schema.def.checks.find((o: any) => {
        return o._zod.def.check === "mime_type";
      });
      if (mimeCheck) {
        // @ts-expect-error mime is expected
        code += `.mime([${mimeCheck._zod.def.mime?.map((type: string) => `"${type}"`).join(", ")}])`;
      }

      const maxSizeCheck = schema.def.checks.find((o: any) => {
        console.log(o);
        return o._zod.def.check === "max_size";
      });
      if (maxSizeCheck) {
        // @ts-expect-error maximum is expected
        code += `.maxSize(${maxSizeCheck._zod.def.maximum})`;
      }
    }
    return code;
  }

  if (schema instanceof z.ZodEmail) {
    return "z.email()";
  }

  if (schema instanceof z.ZodNumber) {
    let result = "z.number()";
    if ("checks" in schema.def && schema.def.checks) {
      schema.def.checks.forEach((check: any) => {
        if (check.kind === "min") {
          result += `.min(${check.value})`;
        } else if (check.kind === "max") {
          result += `.max(${check.value})`;
        }
      });
    }
    return result;
  }

  if (schema instanceof z.ZodString) {
    let result = "z.string()";
    if ("checks" in schema.def && schema.def.checks) {
      schema.def.checks.forEach((check: any) => {
        if (check.kind === "min") {
          result += `.min(${check.value})`;
        } else if (check.kind === "max") {
          result += `.max(${check.value})`;
        }
      });
    }

    return result;
  }

  if (schema instanceof z.ZodDate) {
    return "z.coerce.date()";
  }

  if (schema instanceof z.ZodArray) {
    return `z.array(${genFieldZodSchemaCode(
      schema.element as ZodType
    )}).min(1, "Please select at least one item")`;
  }

  if (schema instanceof z.ZodTuple) {
    return `z.tuple([${schema.def.items
      .map((item) => genFieldZodSchemaCode(item as any))
      .join(", ")}])`;
  }

  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const shapeStrs = Object.entries(shape).map(
      ([key, value]) => `${key}: ${genFieldZodSchemaCode(value as ZodType)}`
    );
    return `
    z.object({
      ${shapeStrs.join(",\n  ")}
    })`;
  }

  if (schema instanceof z.ZodOptional) {
    return `${genFieldZodSchemaCode(schema.unwrap() as ZodType)}.optional()`;
  }

  if (schema instanceof z.ZodUnion) {
    // return JSON.stringify(schema.options);

    return `z.union([${schema.def.options
      .map((option) => genFieldZodSchemaCode(option as ZodType))
      .join(", ")}])`;
  }

  return "z.unknown()";
};

export const genFormZodSchemaCode = (formElements: FormElement[]): string => {
  const schema = genFormZodSchema(formElements);
  const schemaEntries = Object.entries(schema.shape)
    .map(([key, value]) => {
      return `"${key}": ${genFieldZodSchemaCode(value as ZodType)}`;
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
