import { format } from "date-fns";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormReturn,
} from "react-hook-form";
import type { FormElement } from "@/form-builder/form-types";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Password } from "@/components/password";
import { FileUpload } from "@/components/form-fields/file-upload";
import { Rating, RatingButton } from "@/components/ui/rating";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const RenderFormElement = ({
  formElement,
  form,
}: {
  formElement: FormElement;
  form: UseFormReturn<any, any, any>;
}): React.ReactElement => {
  switch (formElement.fieldType) {
    case "Input":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{
            required: formElement.required,
            min: formElement.min,
            max: formElement.max,
          }}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label} {formElement?.required ? " *" : ""}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={formElement.placeholder}
                  disabled={formElement.disabled}
                  type={formElement.type === "number" ? "number" : "text"}
                  min={formElement.min}
                  max={formElement.max}
                  onChange={(e) => {
                    if (formElement.type === "number") {
                      field.onChange(e.target.valueAsNumber);
                    } else {
                      field.onChange(e.target.value);
                    }
                  }}
                />
              </FormControl>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Password":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{
            required: formElement.required,
          }}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label} {formElement.required && " *"}
              </FormLabel>
              <FormControl>
                <Password
                  placeholder={formElement.placeholder}
                  disabled={formElement.disabled}
                  {...field}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              </FormControl>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "FileUpload":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{
            required: formElement.required,
          }}
          render={({
            field,
            fieldState,
          }: {
            field: ControllerRenderProps;
            fieldState: ControllerFieldState;
          }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label} {formElement.required && " *"}
              </FormLabel>
              <FormControl>
                <FileUpload
                  disabled={formElement.disabled}
                  {...field}
                  placeholder={formElement.placeholder}
                  accept={formElement.accept}
                  maxFiles={formElement.maxFiles ?? 1}
                  maxSize={formElement.maxSize ?? 1024 * 1024}
                  setValue={form.setValue}
                  name={formElement.name}
                />
              </FormControl>
              {Array.isArray(fieldState.error) ? (
                fieldState.error?.map((error, i) => (
                  <p
                    data-slot="form-message"
                    className="text-destructive text-sm"
                    key={i}
                  >
                    {error.message}
                  </p>
                ))
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />
      );
    case "OTP":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{
            required: formElement.required,
          }}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label} {formElement.required && "*"}
              </FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={formElement.maxLength ?? 6}
                  disabled={formElement.disabled}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Textarea":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{
            required: formElement.required,
          }}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label} {formElement.required && "*"}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={formElement.placeholder}
                  disabled={formElement.disabled}
                  className="resize-none"
                />
              </FormControl>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Checkbox":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{
            required: formElement.required,
          }}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="flex items-start gap-2 w-full py-1 space-y-0">
              <FormControl>
                <Checkbox
                  {...field}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={formElement.disabled}
                />
              </FormControl>
              <div>
                <FormLabel className="space-y-1 leading-none">
                  {formElement.label} {formElement.required && " *"}
                </FormLabel>
                {formElement.description && (
                  <FormDescription>{formElement.description}</FormDescription>
                )}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      );
    case "RadioGroup":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{
            required: formElement.required,
          }}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="flex flex-col gap-2 w-full py-3">
              <FormLabel className="mt-0">
                {formElement?.label} {formElement.required && " *"}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={formElement.disabled}
                >
                  {(formElement?.options || []).map(({ label, value }) => (
                    <div
                      key={crypto.randomUUID()}
                      className="flex items-center gap-x-2"
                    >
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "ToggleGroup": {
      const options = (formElement?.options || []).map((option) => {
        if (!option.label || !option.value) return null;
        return (
          <ToggleGroupItem
            key={crypto.randomUUID()}
            value={option.value}
            className="text-sm"
          >
            {option.label}
          </ToggleGroupItem>
        );
      });
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="flex flex-col gap-2 w-full py-1">
              <FormLabel className="mt-0">
                {formElement?.label} {formElement.required && "*"}
              </FormLabel>
              <FormControl>
                {formElement.type === "single" ? (
                  <ToggleGroup
                    {...field}
                    type="single"
                    variant="outline"
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={formElement.disabled}
                    className="flex justify-start items-center w-full flex-wrap"
                  >
                    {options}
                  </ToggleGroup>
                ) : (
                  <ToggleGroup
                    {...field}
                    type="multiple"
                    variant="outline"
                    onValueChange={field.onChange}
                    disabled={formElement.disabled}
                    value={
                      // wrap in array and flat because value can be a string or an array
                      [field.value].flat().filter((val) => val !== undefined)
                    }
                    className="flex justify-start items-center w-full flex-wrap"
                  >
                    {options}
                  </ToggleGroup>
                )}
              </FormControl>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    case "Switch":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="flex flex-col p-3 justify-center w-full border rounded">
              <div className="flex items-center justify-between h-full">
                <FormLabel className="w-full grow">
                  {formElement.label}
                </FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Slider":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{ required: formElement.required }}
          render={({ field }: { field: ControllerRenderProps }) => {
            const { max, min = 0, step } = formElement;
            const value = Array.isArray(field.value)
              ? field.value
              : [field.value || min];
            return (
              <FormItem className="w-full py-3">
                <FormLabel className="flex justify-between items-center">
                  {formElement.label}
                  <span>
                    {value}/{max}
                  </span>
                </FormLabel>
                <FormControl>
                  <Slider
                    {...field}
                    min={min ? +min : undefined}
                    max={max ? +max : undefined}
                    step={step ? +step : undefined}
                    value={value}
                    onValueChange={(newValue) => field.onChange(newValue[0])}
                    disabled={formElement.disabled}
                  />
                </FormControl>
                <FormDescription className="py-1">
                  {formElement.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    case "Select":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{ required: formElement.required }}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label}
                {formElement.required && " *"}
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={formElement.disabled}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={formElement.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(formElement?.options || []).map((option) => {
                    if (!option.label || !option.value) return null;
                    return (
                      <SelectItem
                        key={crypto.randomUUID()}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "Combobox":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                {formElement.label}
                {formElement.required && " *"}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between active:scale-100",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? formElement.options.find(
                            (option) => option.value === field.value
                          )?.label
                        : "Select an item"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 min-w-[var(--radix-popper-anchor-width)] w-full bg-accent/40 backdrop-blur-lg"
                  align="start"
                >
                  <Command className="bg-transparent">
                    <CommandInput
                      placeholder="Search items..."
                      className="h-10"
                    />
                    <CommandList>
                      <CommandEmpty>No items found.</CommandEmpty>
                      <CommandGroup>
                        {(formElement?.options || []).map((option) => (
                          <CommandItem
                            value={option.value}
                            key={option.value}
                            onSelect={() => {
                              form.setValue(formElement.name, option.value);
                            }}
                          >
                            {option.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                option.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>{formElement.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "MultiSelect":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => (
            <FormItem className="w-full">
              <FormLabel>
                {formElement.label} {formElement.required ? " *" : ""}{" "}
              </FormLabel>
              <MultiSelect
                value={field.value ?? []}
                onValueChange={(value) => field.onChange(value ?? [])}
                disabled={formElement.disabled}
              >
                <FormControl>
                  <MultiSelectTrigger>
                    <MultiSelectValue placeholder={formElement.placeholder} />
                  </MultiSelectTrigger>
                </FormControl>
                <MultiSelectContent>
                  <MultiSelectList>
                    {(formElement?.options || []).map((option) => {
                      if (!option.label || !option.value) return null;
                      return (
                        <MultiSelectItem
                          key={crypto.randomUUID()}
                          value={option.value}
                        >
                          {option.label}
                        </MultiSelectItem>
                      );
                    })}
                  </MultiSelectList>
                </MultiSelectContent>
              </MultiSelect>
              {formElement.description && (
                <FormDescription>{formElement.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "DatePicker":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          render={({ field }: { field: ControllerRenderProps }) => {
            const date = field.value;
            return (
              <FormItem className="flex flex-col w-full">
                <div>
                  <FormLabel>
                    {formElement.label} {formElement.required ? " *" : ""}
                  </FormLabel>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-start font-normal active:scale-none",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>{formElement.placeholder}</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      disabled={formElement.disabled}
                      onSelect={(newDate) => {
                        // setDate(newDate);
                        form.setValue(field.name, newDate, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {formElement.description && (
                  <FormDescription>{formElement.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    case "Rating":
      return (
        <FormField
          control={form.control}
          name={formElement.name}
          rules={{ required: formElement.required, min: 1 }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formElement.label}</FormLabel>
              <FormDescription>{formElement.description}</FormDescription>
              <FormControl>
                <div>
                  <Rating
                    readOnly={formElement.disabled}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {Array.from({
                      length: (formElement.numberOfStars as number) ?? 5,
                    }).map((_, index) => (
                      <RatingButton key={index} />
                    ))}
                  </Rating>
                  <input
                    type="number"
                    className="sr-only"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "H1":
      return (
        <h1
          key={formElement.content}
          className={cn(
            "mt-6 font-extrabold text-3xl tracking-tight",
            formElement.className
          )}
        >
          {formElement.content}
        </h1>
      );
    case "H2":
      return (
        <h2 className="mt-4 font-bold text-2xl tracking-tight">
          {formElement.content}
        </h2>
      );
    case "H3":
      return (
        <h3 className="mt-3 font-semibold text-xl tracking-tight">
          {formElement.content}
        </h3>
      );
    case "P":
      return (
        <p className="tracking-wide text-muted-foreground mb-6 text-wrap text-sm">
          {formElement.content}
        </p>
      );
    case "Separator":
      return (
        <div className="py-1 w-full">
          <Separator {...formElement} />
        </div>
      );
    default:
      // @ts-expect-error show the fieldType in the error, use in ai-generated-form
      return <div>Invalid Form Element: {formElement.fieldType} </div>;
  }
};
