import type { FormElement } from "@/form-builder/form-types";

const withOptions = [
  "Select",
  "MultiSelect",
  "RadioGroup",
  "ToggleGroup",
  "Combobox",
];
const withLabel = [
  "Input",
  "Password",
  "Separator",
  "Textarea",
  "DatePicker",
  "Select",
  "MultiSelect",
  "RadioGroup",
  "ToggleGroup",
  "Combobox",
  "Slider",
  "Checkbox",
  "Switch",
  "Rating",
  "FileUpload",
  "OTP",
  "TagInput",
];
const withDescription = withLabel.filter((item) => item !== "Separator");

const withWidth = [
  ...withDescription,
  "Text",
]
const withName = [
  "Input",
  "Password",
  "Textarea",
  "DatePicker",
  "Select",
  "MultiSelect",
  "RadioGroup",
  "ToggleGroup",
  "Combobox",
  "Slider",
  "Checkbox",
  "Switch",
  "Rating",
  "FileUpload",
  "TagInput",
];
const isRequired = withName;
const withPlaceholder = [
  "Input",
  "Password",
  "Textarea",
  "DatePicker",
  "Select",
  "MultiSelect",
  "Combobox",
  "FileUpload",
  "TagInput",
];
const withContent = ["Text", "H1", "H2", "H3", "P"];

const isDeprecated = ["H1", "H2", "H3", "P"];
type attribute =
  | "label"
  | "description"
  | "name"
  | "placeholder"
  | "options"
  | "deprecated"
  | "required"
  | "width"
  | "content";

const attributesMap = {
  name: withName,
  label: withLabel,
  placeholder: withPlaceholder,
  description: withDescription,
  options: withOptions,
  content: withContent,
  deprecated: isDeprecated,
  required: isRequired,
  width: withWidth,
  tags: ["TagInput"],
};


export function hasAttribute({
  fieldType,
  attribute,
}: {
  fieldType: FormElement["fieldType"];
  attribute: attribute;
}) {
  return attributesMap[attribute].includes(fieldType);
}
