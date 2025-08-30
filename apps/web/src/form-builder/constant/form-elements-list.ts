import { BsInputCursor, BsTextLeft } from "react-icons/bs";
import {
  MdOutlineCheckBox,
  MdOutlineChecklist,
  MdRadioButtonChecked,
  MdOutlineToggleOff,
  MdOutlineWrapText,
  MdOutlinePassword,
} from "react-icons/md";
import { CgSelectO } from "react-icons/cg";
import { GoShieldLock } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { CgFormatSeparator } from "react-icons/cg";
import { RxSlider } from "react-icons/rx";
import { PiSquaresFour } from "react-icons/pi";

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
  },
  {
    group: "field",
    name: "Date Picker",
    fieldType: "DatePicker",
    icon: CiCalendarDate,
  },
  {
    group: "display",
    name: "Heading 1",
    fieldType: "H1",
    content: "Heading 1",
    icon: LuHeading1,
    static: true,
  },
  {
    group: "display",
    name: "Heading 2",
    fieldType: "H2",
    content: "Heading 2",
    icon: LuHeading2,
    static: true,
  },
  {
    group: "display",
    name: "Heading 3",
    fieldType: "H3",
    content: "Heading 3",
    icon: LuHeading3,
    static: true,
  },
  {
    group: "display",
    name: "paragraph",
    fieldType: "P",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    icon: BsTextLeft,
    static: true,
  },
  {
    group: "field",
    name: "Input",
    fieldType: "Input",
    icon: BsInputCursor,
  },
  {
    group: "field",
    name: "Input OTP",
    fieldType: "OTP",
    icon: GoShieldLock,
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
  },
  {
    group: "field",
    name: "Password",
    fieldType: "Password",
    type: "password",
    icon: MdOutlinePassword,
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
  },
  {
    group: "display",
    name: "Separator",
    fieldType: "Separator",
    static: true,
    icon: CgFormatSeparator,
  },
  { group: "field", name: "Slider", fieldType: "Slider", icon: RxSlider },
  {
    group: "field",
    name: "Switch",
    fieldType: "Switch",
    icon: MdOutlineToggleOff,
  },
  {
    group: "field",
    name: "Textarea",
    fieldType: "Textarea",
    icon: MdOutlineWrapText,
  },
  {
    group: "field",
    name: "Toggle",
    fieldType: "ToggleGroup",
    icon: PiSquaresFour,
  },
];
