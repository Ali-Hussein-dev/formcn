import type { FormElement } from "../form-types";

export const defaultFormElements: Record<
  FormElement["fieldType"],
  Partial<FormElement>
> = {
  Input: {
    name: "input-field",
    label: "Input Field",
    placeholder: "Enter your text",
    type: "text",
  },
  OTP: {
    name: "one-time-password",
    label: "One-Time Password",
    description: "Please enter the one-time password sent to your phone.",
  },
  Password: {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    required: true,
  },
  Checkbox: {
    label: "Checkbox Label",
  },
  RadioGroup: {
    label: "Pick one option",
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
  },
  ToggleGroup: {
    label: "Pick multiple days",
    type: "multiple",
    options: [
      { value: "monday", label: "Mon" },
      { value: "tuesday", label: "Tue" },
      { value: "wednesday", label: "Wed" },
      { value: "thursday", label: "Thu" },
      { value: "friday", label: "Fri" },
      { value: "saturday", label: "Sat" },
      { value: "sunday", label: "Sun" },
    ],
  },
  DatePicker: {
    label: "Pick a date",
    placeholder: "Select a date",
    mode: "single",
  },
  Select: {
    label: "Select option",
    placeholder: "Select an option",
    options: [
      { value: "option-1", label: "Option 1" },
      { value: "option-2", label: "Option 2" },
      { value: "option-3", label: "Option 3" },
      { value: "option-4", label: "Option 4" },
    ],
  },
  Combobox: {
    label: "Select language",
    placeholder: "tap to search language",
    options: [
      { value: "arabic", label: "Arabic" },
      { value: "english", label: "English" },
      { value: "turkish", label: "Turkish" },
      { value: "russian", label: "Russian" },
      { value: "korean", label: "Korean" },
      { value: "chinese", label: "Chinese" },
      { value: "german", label: "German" },
      { value: "spanish", label: "Spanish" },
    ],
  },
  MultiSelect: {
    label: "Select one or more options",
    placeholder: "Pick one or more days",
    options: [
      { value: "monday", label: "Monday" },
      { value: "tuesday", label: "Tuesday" },
      { value: "wednesday", label: "Wednesday" },
      { value: "thursday", label: "Thursday" },
      { value: "friday", label: "Friday" },
      { value: "saturday", label: "Saturday" },
      { value: "sunday", label: "Sunday" },
    ],
  },
  Slider: {
    label: "Set Range",
    description: "Adjust the range by sliding.",
    min: 0,
    max: 100,
    step: 5,
  },
  Switch: {
    label: "Switch",
    description: "Turn on or off.",
  },
  Rating: {
    label: "Rate your experience",
    description: "Please rate your experience on a scale from 1 to 5",
    numberOfStars: 5,
  },
  Textarea: {
    label: "Textarea",
    description: "A multi-line text input field",
    placeholder: "Enter your text",
  },
  FileUpload: {
    label: "File upload",
    description: "Select a file to upload from your device",
    placeholder: "PNG, JPEG or Gif, (max. 5MB)",
    maxSize: 5 * 1024 * 1024,
    maxFiles: 1,
    accept: "image/png, image/jpeg, image/gif",
  },
  Text: {
    label: "Text",
    content: "Text content",
    static: true,
    variant: "H1",
  },
  Separator: {
    static: true,
    content: "Separator",
  },
  SocialMediaButtons: {
    label: "Social links",
    name: "social-links",
    links: ["google", "github"],
    layout: "row",
  },
  // Deprecated field types - kept for backward compatibility
  H1: {
    label: "Form heading 1",
    content: "Form Heading 1",
    static: true,
  },
  H2: {
    label: "Form heading 2",
    content: "Form Heading 2",
    static: true,
  },
  H3: {
    label: "Form heading 3",
    content: "Form Heading 3",
    static: true,
  },
  P: {
    label: "Paragraph",
    content: "This is a description text",
    static: true,
  },
};
