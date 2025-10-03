import { z } from "zod";

const InputFieldSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("Input"),
    type: z
      .enum(["text", "number", "email", "password", "tel"])
      .default("text"),
    required: z.boolean().optional(),
    placeholder: z.string().optional(),
  })
  .describe("Input element with type text, number, email, password, or tel");

const passwordSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("Password"),
    required: z.boolean(),
    placeholder: z.string(),
  })
  .describe("Password input");

const otpSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("OTP"),
    required: z.boolean(),
    placeholder: z.string(),
  })
  .describe("One time password input");

const textareaSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("Textarea"),
    required: z.boolean().optional(),
    placeholder: z.string().optional(),
  })
  .describe("Textarea element");

const optionsSchema = z
  .array(
    z.object({
      label: z.string().min(1),
      value: z.string().min(1),
    })
  )
  .min(2)
  .default([
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ]);

const selectSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("Select"),
    required: z.boolean().optional(),
    placeholder: z.string().optional(),
    options: optionsSchema,
  })
  .describe("Use it when you want to let users select one from a list.");

const comboboxSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("Combobox"),
    required: z.boolean().optional(),
    placeholder: z.string().optional(),
    options: optionsSchema,
  })
  .describe("Use it for longer lists to select one from a list.");

const MultiSelectSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("MultiSelect"),
    required: z.boolean().optional(),
    placeholder: z.string(),
    options: optionsSchema,
  })
  .describe(
    "Use it when you want to let users select one or multiple options from a list."
  );

const sliderSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("Slider"),
    required: z.boolean().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().optional().default(1),
  })
  .describe(
    "Slider element with min, max, and step, default value should be the middle value"
  );

const checkboxSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("ToggleGroup"),
    required: z.boolean().optional(),
    options: optionsSchema,
    type: z.enum(["single", "multiple"]).optional().default("single"),
  })
  .describe(
    "Toggle group element with options to toggle between one or multiple options"
  );

const CheckboxSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("Checkbox"),
    required: z.boolean().optional(),
  })
  .describe("Checkbox element");

const radioSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("RadioGroup"),
    required: z.boolean().optional(),
    options: optionsSchema,
  })
  .describe("RadioGroup element with options");

const switchSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("Switch"),
    required: z.boolean().optional(),
  })
  .describe("Switch element");

const ratingSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    label: z.string(),
    description: z.string().optional(),
    numberOfStars: z.number().optional().default(5),
    fieldType: z.literal("Rating"),
    required: z.boolean().optional(),
  })
  .describe("Rating element with number of stars");

const datePicker = z
  .object({
    id: z.string(),
    label: z.string(),
    name: z.string(),
    fieldType: z.literal("DatePicker"),
    required: z.boolean().optional(),
    placeholder: z.string(),
  })
  .describe("DatePicker element");

const staticPropertySchema = z
  .literal(true)
  .refine((v) => v === true, {
    message: "static field is required and must be true",
  })
  .nonoptional();

const h1Schema = z
  .object({
    id: z.string(),
    static: staticPropertySchema,
    name: z.string(),
    fieldType: z.literal("Text"),
    variant: z.literal("H1"),
    content: z.string().min(2),
  })
  .describe("use it as a top title");

const h2Schema = z
  .object({
    id: z.string(),
    static: staticPropertySchema,
    name: z.string().min(2),
    fieldType: z.literal("Text"),
    variant: z.literal("H2"),
    content: z.string().min(2),
  })
  .describe("use it as a title form sections");

const h3Schema = z
  .object({
    id: z.string(),
    static: staticPropertySchema,
    name: z.string().min(2),
    fieldType: z.literal("Text"),
    variant: z.literal("H3"),
    content: z.string().min(2),
  })
  .describe("use it as a title for nested form sections");

const paragraphSchema = z
  .object({
    id: z.string(),
    static: staticPropertySchema,
    name: z.string().min(2),
    fieldType: z.literal("Text"),
    variant: z.literal("P"),
    content: z.string().min(2),
  })
  .describe("Paragraph element use for description, subtitle, etc.");

const seperatorSchema = z
  .object({
    id: z.string(),
    static: staticPropertySchema,
    name: z.string(),
    fieldType: z.literal("Separator"),
  })
  .describe("Separator element");

const fileUploadSchema = z.union([
  z.file(),
  z.array(z.file()),
  z.string().min(1, "Please select a file"),
  // z.instanceof(FileList),
]);

const fieldSchema = z.union([
  InputFieldSchema,
  passwordSchema,
  otpSchema,
  textareaSchema,
  selectSchema,
  sliderSchema,
  checkboxSchema,
  radioSchema,
  switchSchema,
  datePicker,
  h1Schema,
  h2Schema,
  h3Schema,
  paragraphSchema,
  seperatorSchema,
  CheckboxSchema,
  MultiSelectSchema,
  fileUploadSchema,
  ratingSchema,
  comboboxSchema,
]);

const singleFormFieldsSchema = z
  .array(fieldSchema)
  .describe("Form fields in single step");

// const multistepFormFieldsSchema = z
//   .array(
//     z.object({
//       id: z.string(),
//       stepFields: z.array(fieldSchema),
//     })
//   )
//   .describe("Form fields in multiple steps");
export const aiFormSchema = z.object({
  form: z.object({
    title: z.string().describe("Form title"),
    // isMS: z.boolean().describe("Whether the form has multiple steps"),
    fields: singleFormFieldsSchema,
    // fields: z.union([singleFormFieldsSchema, multistepFormFieldsSchema]),
  }),
});
