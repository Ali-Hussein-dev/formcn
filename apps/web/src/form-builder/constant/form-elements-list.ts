import { BsInputCursor, BsTextLeft } from "react-icons/bs";
import {
  MdOutlineCheckBox,
  MdOutlineChecklist,
  MdRadioButtonChecked,
  MdOutlineToggleOff,
  MdOutlineWrapText,
  MdOutlinePassword,
  MdStar,
} from "react-icons/md";
import { CgSelectO } from "react-icons/cg";
import { GoShieldLock } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { CgFormatSeparator } from "react-icons/cg";
import { RxSlider } from "react-icons/rx";
import { PiSquaresFour } from "react-icons/pi";
import { AiOutlineCloudUpload } from "react-icons/ai";

/**
 * used in
 * - form-elements-selector.tsx
 * - form-elements-selector-command.tsx
 */
export const formElementsList = [
  {
    group: "field",
    name: "Checkbox",
    fieldType: "Checkbox",
    icon: MdOutlineCheckBox,
    description: "Checkbox input",
  },
  {
    group: "field",
    name: "Date Picker",
    fieldType: "DatePicker",
    icon: CiCalendarDate,
    description: "Date picker input",
  },
  {
    group: "display",
    name: "Heading 1",
    fieldType: "H1",
    content: "Heading 1",
    icon: LuHeading1,
    static: true,
    description: "Heading 1",
  },
  {
    group: "display",
    name: "Heading 2",
    fieldType: "H2",
    content: "Heading 2",
    icon: LuHeading2,
    static: true,
    description: "Heading 2",
  },
  {
    group: "display",
    name: "Heading 3",
    fieldType: "H3",
    content: "Heading 3",
    icon: LuHeading3,
    static: true,
    description: "Heading 3",
  },
  {
    group: "display",
    name: "paragraph",
    fieldType: "P",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    icon: BsTextLeft,
    static: true,
    description: "Paragraph",
  },
  {
    group: "field",
    name: "Input",
    fieldType: "Input",
    icon: BsInputCursor,
    description: "Input field",
  },
  {
    group: "field",
    name: "File upload",
    fieldType: "FileUpload",
    icon: AiOutlineCloudUpload,
    isNew: true,
    description: "Dropzone file upload",
  },
  {
    group: "field",
    name: "Input OTP",
    fieldType: "OTP",
    icon: GoShieldLock,
    description: "One time password field",
  },
  {
    group: "field",
    name: "Multi select",
    fieldType: "MultiSelect",
    icon: MdOutlineChecklist,
    options: [
      {
        value: "1",
        label: "Option 1",
      },
      {
        value: "2",
        label: "Option 2",
      },
      {
        value: "3",
        label: "Option 3",
      },
      {
        value: "4",
        label: "Option 4",
      },
      {
        value: "5",
        label: "Option 5",
      },
    ],
    description: "Multi select field",
  },
  {
    group: "field",
    name: "Password",
    fieldType: "Password",
    type: "password",
    icon: MdOutlinePassword,
    description: "Password field",
  },
  {
    group: "field",
    name: "Rating",
    fieldType: "Rating",
    icon: MdStar,
    description: "A field to rate something on a scale",
    isNew: true,
  },
  {
    group: "field",
    name: "Radio",
    icon: MdRadioButtonChecked,
    fieldType: "RadioGroup",
    options: [
      {
        value: "1",
        label: "Option 1",
      },
      {
        value: "2",
        label: "Option 2",
      },
      {
        value: "2",
        label: "Option 3",
      },
    ],
    description: "Radio group field",
  },
  {
    group: "field",
    name: "Select",
    icon: CgSelectO,
    fieldType: "Select",
    options: [
      {
        value: "1",
        label: "Option 1",
      },
      {
        value: "2",
        label: "Option 2",
      },
    ],
    description: "Select field",
  },
  {
    group: "display",
    name: "Separator",
    fieldType: "Separator",
    static: true,
    icon: CgFormatSeparator,
    description: "Divider element",
  },
  {
    group: "field",
    name: "Slider",
    fieldType: "Slider",
    icon: RxSlider,
    description: "Slider element",
  },
  {
    group: "field",
    name: "Switch",
    fieldType: "Switch",
    icon: MdOutlineToggleOff,
    description: "Switch element",
  },
  {
    group: "field",
    name: "Textarea",
    fieldType: "Textarea",
    icon: MdOutlineWrapText,
    description: "multi-line text input",
  },
  {
    group: "field",
    name: "Toggle",
    fieldType: "ToggleGroup",
    icon: PiSquaresFour,
    description: "Toggle group element",
  },
];
