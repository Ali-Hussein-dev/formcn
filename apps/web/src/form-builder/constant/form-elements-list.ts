import { BsInputCursor } from "react-icons/bs";
import {
  MdOutlineChecklist,
  MdRadioButtonChecked,
  MdOutlineToggleOff,
  MdOutlineWrapText,
  MdStar,
} from "react-icons/md";
import { CgSelectO } from "react-icons/cg";
import { GoShieldLock } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";
import { LuHeading1, LuHeading2, LuHeading3, LuShare2 } from "react-icons/lu";
import { CgFormatSeparator } from "react-icons/cg";
import { RxSlider } from "react-icons/rx";
import { PiSquaresFour } from "react-icons/pi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ChevronsUpDownIcon, EyeOffIcon } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";
import { RiText } from "react-icons/ri";
import { BiParagraph } from "react-icons/bi";
import { TbCheckbox } from "react-icons/tb";
export const formFieldsIcons = {
  Input: BsInputCursor,
  Textarea: MdOutlineWrapText,
  Password: EyeOffIcon,
  OTP: GoShieldLock,
  Checkbox: TbCheckbox,
  Switch: MdOutlineToggleOff,
  DatePicker: CiCalendarDate,
  Select: FaAngleDown,
  Combobox: CgSelectO,
  MultiSelect: ChevronsUpDownIcon,
  ToggleGroup: PiSquaresFour,
  Slider: RxSlider,
  Rating: MdStar,
  FileUpload: AiOutlineCloudUpload,
  RadioGroup: MdRadioButtonChecked,
  Separator: CgFormatSeparator,
  Text: RiText,
  H1: LuHeading1,
  H2: LuHeading2,
  H3: LuHeading3,
  P: BiParagraph,
  SocialMediaButtons: LuShare2,
};
/**
 * used in
 * - form-elements-selector.tsx
 * - form-elements-selector-command.tsx
 */
export const formElementsList = [
  {
    group: "field",
    name: "Input",
    fieldType: "Input",
    icon: formFieldsIcons.Input,
    description: "Input field",
  },
  {
    group: "field",
    name: "Textarea",
    fieldType: "Textarea",
    icon: formFieldsIcons.Textarea,
    description: "multi-line text input",
  },
  {
    group: "field",
    name: "Password",
    fieldType: "Password",
    type: "password",
    icon: formFieldsIcons.Password,
    description: "Password field",
  },
  {
    group: "field",
    name: "Input OTP",
    fieldType: "OTP",
    icon: formFieldsIcons.OTP,
    description: "One time password field",
  },
  {
    group: "field",
    name: "Checkbox",
    fieldType: "Checkbox",
    icon: formFieldsIcons.Checkbox,
    description: "Checkbox input",
  },
  {
    group: "field",
    name: "Switch",
    fieldType: "Switch",
    icon: formFieldsIcons.Switch,
    description: "Switch element",
  },
  {
    group: "field",
    name: "Date Picker",
    fieldType: "DatePicker",
    icon: formFieldsIcons.DatePicker,
    description: "Date picker input",
  },
  {
    group: "field",
    name: "Select",
    icon: formFieldsIcons.Select,
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
    group: "field",
    name: "Combobox",
    fieldType: "Combobox",
    icon: formFieldsIcons.Combobox,
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
    description: "Combobox field",
  },
  {
    group: "field",
    name: "Multi select",
    fieldType: "MultiSelect",
    icon: formFieldsIcons.MultiSelect,
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
    name: "Toggle",
    fieldType: "ToggleGroup",
    icon: formFieldsIcons.ToggleGroup,
    description: "Toggle group element",
  },
  {
    group: "field",
    name: "Radio",
    icon: formFieldsIcons.RadioGroup,
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
    name: "Slider",
    fieldType: "Slider",
    icon: formFieldsIcons.Slider,
    description: "Slider element",
  },
  {
    group: "field",
    name: "Rating",
    fieldType: "Rating",
    icon: formFieldsIcons.Rating,
    description: "A field to rate something on a scale",
    isNew: true,
  },
  {
    group: "field",
    name: "File upload",
    fieldType: "FileUpload",
    icon: formFieldsIcons.FileUpload,
    description: "Dropzone file upload",
  },
  {
    group: "display",
    name: "Text",
    fieldType: "Text",
    content: "Text",
    icon: formFieldsIcons.Text,
    static: true,
    description: "Text element",
  },
  {
    group: "display",
    name: "Social media",
    fieldType: "SocialMediaButtons",
    content: "Social media buttons",
    icon: formFieldsIcons.SocialMediaButtons,
    static: true,
    description: "Social media buttons",
    isNew: true,
  },
  {
    group: "display",
    name: "Separator",
    fieldType: "Separator",
    static: true,
    icon: formFieldsIcons.Separator,
    description: "Divider element",
  },
];
