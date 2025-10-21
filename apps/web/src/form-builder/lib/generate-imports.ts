import type { FormElement } from "../form-types";

export const generateImports = (
  formElements: FormElement[],
  { isMS = false }: { isMS?: boolean } = { isMS: false }
): Set<string> => {
  const importSet = new Set([
    '"use client"',
    'import * as z from "zod"',
    "import { formSchema } from '@/lib/form-schema'",
    "import { serverAction } from '@/actions/server-action'",
    'import { zodResolver } from "@hookform/resolvers/zod"',
    'import { useForm, Controller } from "react-hook-form"',
    'import { useAction } from "next-safe-action/hooks"',
    'import { motion } from "motion/react"',
    'import { Check } from "lucide-react"',
    'import { Field, FieldGroup, FieldContent, FieldLabel, FieldDescription, FieldError, FieldSeparator } from "@/components/ui/field"',
  ]);
  if (isMS) {
    importSet.add(`import {
    FormHeader,
    FormFooter,
    StepFields,
    PreviousButton,
    NextButton,
    SubmitButton,
    MultiStepFormContent } from "@/components/multi-step-viewer";
import { MultiStepFormProvider } from "@/hooks/use-multi-step-viewer";
import { ChevronLeft, ChevronRight } from "lucide-react";
`);
  } else {
    importSet.add('import { Button } from "@/components/ui/button"');
  }
  const processField = (field: FormElement) => {
    switch (field.fieldType) {
      case "DatePicker":
        importSet.add('import { format } from "date-fns"');
        importSet.add(
          'import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"'
        );
        importSet.add('import { cn } from "@/lib/utils"');
        importSet.add('import { Calendar } from "@/components/ui/calendar"');
        importSet.add(
          'import { Calendar as CalendarIcon } from "lucide-react"'
        );
        break;
      case "OTP":
        importSet.add(
          'import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot\n} from "@/components/ui/input-otp"'
        );
        break;
      case "Select":
        importSet.add(
          'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"'
        );
        break;
      case "Combobox":
        importSet.add('import { Check, ChevronsUpDown } from "lucide-react"');
        importSet.add(
          'import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"'
        );
        importSet.add(
          'import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"'
        );
        break;
      case "MultiSelect":
        importSet.add(
          `import {
              MultiSelect,
              MultiSelectContent,
              MultiSelectItem,
              MultiSelectTrigger,
              MultiSelectValue,
            } from '@/components/ui/multi-select'`
        );
        break;
      case "Password":
        importSet.add('import { Password } from "@/components/password"');
        break;
      case "Rating":
        importSet.add(
          'import { Rating, RatingButton } from "@/components/ui/rating"'
        );
        break;
      case "RadioGroup":
        importSet.add(
          "import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'"
        );
        importSet.add("import { Label } from '@/components/ui/label'");
        break;
      case "ToggleGroup":
        importSet.add(
          "import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'"
        );
        break;
      case "FileUpload":
        importSet.add(
          `import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
           import { FileUpload } from '@/components/file-upload'`
        );
        break;
      case "Separator":
      case "H1":
      case "H2":
      case "H3":
      case "P":
      case "Text":
      case "SocialMediaButtons":
        break;
      default:
        importSet.add(
          `import { ${
            field.fieldType
          } } from "@/components/ui/${field.fieldType.toLowerCase()}"`
        );
        break;
    }
  };

  formElements.flat().forEach(processField);
  return importSet;
};
