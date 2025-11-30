import type * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Controller, type UseFormReturn } from "react-hook-form"
import type { FormElement } from "@/form-builder/form-types"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"
import { Slider } from "@/components/ui/slider"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon, Check, ChevronsUpDown, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Password } from "@/components/password"
import { FileUpload } from "@/components/form-fields/file-upload"
import { Rating, RatingButton } from "@/components/ui/rating"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSeparator,
} from "@/components/ui/field"
import { format } from "date-fns"
import { socialLogsUrls } from "@/form-builder/constant/social-logos-urls"
import type { DateRange } from "react-day-picker"
import { TagInput } from "@/components/tag-input"

export const RenderFormElement = ({
  formElement,
  form,
}: {
  formElement: FormElement
  form: UseFormReturn<any, any, any>
}): React.ReactElement => {
  // @ts-expect-error just ignore
  const required = formElement?.required!
  switch (formElement.fieldType) {
    case "Input":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>
                {formElement.label}
                {required && " *"}
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={formElement.placeholder}
                disabled={formElement.disabled}
                type={formElement.type === "number" ? "number" : "text"}
                onChange={(e) => {
                  if (formElement.type === "number") {
                    field.onChange(e.target.valueAsNumber)
                  } else {
                    field.onChange(e.target.value)
                  }
                }}
                autoComplete="off"
              />
              <FieldDescription>{formElement.description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "Textarea":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>
                {formElement.label}
                {required && " *"}
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={formElement.placeholder}
                disabled={formElement.disabled}
                className="resize-none"
              />
              <FieldDescription>{formElement.description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "Password":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldContent className="gap-0.5">
                <FieldLabel htmlFor={field.name}>
                  {formElement.label}
                  {required && " *"}
                </FieldLabel>
                <FieldDescription>{formElement.description}</FieldDescription>
              </FieldContent>
              <Password
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={formElement.placeholder}
                disabled={formElement.disabled}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "OTP":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldContent className="gap-1">
                <FieldLabel htmlFor={field.name}>
                  {formElement.label} {required && " *"}
                </FieldLabel>
                <FieldDescription>{formElement.description}</FieldDescription>
              </FieldContent>
              <InputOTP
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={formElement.disabled}
                maxLength={formElement.maxLength ?? 6}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "Checkbox":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <div className="flex items-center gap-2 mb-1">
                <Checkbox
                  {...field}
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  disabled={formElement.disabled}
                />
                <FieldLabel htmlFor={field.name}>
                  {formElement.label} {required && " *"}
                </FieldLabel>
              </div>
              <FieldDescription>{formElement.description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "Switch":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor={field.name}>
                  {formElement.label} {required && " *"}
                </FieldLabel>
                <FieldDescription>{formElement.description}</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Switch
                {...field}
                id={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={formElement.disabled}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />
      )
    case "Slider":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => {
            const { max = 100, min = 0, step } = formElement
            const value = Array.isArray(field.value)
              ? field.value
              : [field.value ?? max / 2]
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent className="mb-2 gap-1">
                  <FieldLabel
                    htmlFor={field.name}
                    className="flex justify-between items-center w-full"
                  >
                    {formElement.label} {required && " *"}
                    <span className="text-sm">
                      {value}/{max}
                    </span>
                  </FieldLabel>
                  <FieldDescription>{formElement.description}</FieldDescription>
                </FieldContent>
                <Slider
                  {...field}
                  value={value}
                  onValueChange={(newValue) => field.onChange(newValue[0])}
                  min={min ? +min : undefined}
                  max={max ? +max : undefined}
                  step={step ? +step : undefined}
                  disabled={formElement.disabled}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />
      )
    case "ToggleGroup":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => {
            const options = (formElement?.options || []).map((option) => {
              if (!option.label || !option.value) return null
              return (
                <ToggleGroupItem
                  key={crypto.randomUUID()}
                  value={option.value}
                  className="text-sm"
                >
                  {option.label}
                </ToggleGroupItem>
              )
            })
            return (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 [&_p]:pb-2"
              >
                <FieldLabel htmlFor={field.name}>
                  {formElement.label} {required && " *"}
                </FieldLabel>
                <FieldDescription hidden={!formElement.description}>
                  {formElement.description}
                </FieldDescription>
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />
      )
    case "Select":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor={field.name}>
                {formElement.label}
                {required && " *"}
              </FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={formElement.disabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={formElement.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {(formElement?.options || []).map((option) => {
                    if (!option.label || !option.value) return null
                    return (
                      <SelectItem
                        key={crypto.randomUUID()}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FieldDescription>{formElement.description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "Combobox":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel htmlFor={field.name}>
                {formElement.label} {required && " *"}
              </FieldLabel>
              <FieldDescription>{formElement.description}</FieldDescription>
              <Popover>
                <PopoverTrigger asChild>
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
                      : formElement.placeholder}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 min-w-[var(--radix-popper-anchor-width)] w-full"
                  align="start"
                >
                  <Command className="bg-transparent">
                    <CommandInput
                      placeholder="tap to search..."
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
                              form.setValue(formElement.name, option.value)
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "MultiSelect":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-0 [&_p]:pb-1"
            >
              <FieldLabel htmlFor={field.name}>
                {formElement.label} {required && " *"}
              </FieldLabel>
              <FieldDescription>{formElement.description}</FieldDescription>
              <MultiSelect
                values={field.value ?? []}
                onValuesChange={(value) => field.onChange(value ?? [])}
              >
                <MultiSelectTrigger className="active:scale-100">
                  <MultiSelectValue placeholder={formElement.placeholder} />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  {(formElement?.options || []).map((option) => {
                    if (!option.label || !option.value) return null
                    return (
                      <MultiSelectItem
                        key={crypto.randomUUID()}
                        value={option.value}
                      >
                        {option.label}
                      </MultiSelectItem>
                    )
                  })}
                </MultiSelectContent>
              </MultiSelect>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "Rating":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 [&_p]:pb-2"
            >
              <FieldLabel htmlFor={field.name}>
                {formElement.label} {required && " *"}
              </FieldLabel>
              <FieldDescription>{formElement.description}</FieldDescription>
              <Rating
                value={field.value}
                onValueChange={field.onChange}
                readOnly={formElement.disabled}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "RadioGroup":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 [&_p]:pb-2"
            >
              <FieldLabel htmlFor={field.name}>
                {formElement.label} {required && " *"}
              </FieldLabel>
              <FieldDescription>{formElement.description}</FieldDescription>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                disabled={formElement.disabled}
                aria-invalid={fieldState.invalid}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "DatePicker":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => {
            const selectedDate = field?.value
            const mode = formElement.mode
            return (
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 [&_p]:pb-2"
              >
                <FieldLabel htmlFor={field.name}>
                  {formElement.label} {required && " *"}{" "}
                </FieldLabel>
                <FieldDescription hidden={!formElement.description}>
                  {formElement.description}
                </FieldDescription>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-start font-normal active:scale-none",
                          !selectedDate && "text-muted-foreground"
                        )}
                        type="button"
                      >
                        <CalendarIcon className="size-4" />
                        {selectedDate && (
                          <>
                            {mode === "single" &&
                              format(selectedDate, "dd MMM, yyyy")}
                            {mode === "range" && (
                              <div className="flex items-center gap-x-2">
                                {selectedDate?.from &&
                                  format(selectedDate.from, "dd MMM, yyyy")}
                                {selectedDate?.from && " - "}
                                {selectedDate?.to &&
                                  format(selectedDate.to, "dd MMM, yyyy")}
                              </div>
                            )}
                            {mode === "multiple" &&
                              `${selectedDate?.length} dates selected`}
                          </>
                        )}
                        {!fieldState.isDirty && (
                          <span>{formElement.placeholder}</span>
                        )}
                      </Button>
                      {fieldState.isDirty && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute top-1/2 -end-0 -translate-y-1/2 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            form.resetField(field.name)
                          }}
                        >
                          <X />
                        </Button>
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    // custom alignment for range mode for preview form
                    align={mode === "range" ? "end" : "start"}
                  >
                    {/* @ts-expect-error required attribute is required to add */}
                    <Calendar
                      autoFocus
                      mode={mode}
                      disabled={formElement.disabled}
                      numberOfMonths={mode === "range" ? 2 : 1}
                      selected={selectedDate}
                      onSelect={(newDate: Date | DateRange | Date[]) => {
                        form.setValue(field.name, newDate, {
                          shouldDirty: true,
                        })
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />
      )
    case "FileUpload":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <Field
                data-invalid={fieldState.invalid}
                className="gap-1 [&_p]:pb-2"
              >
                <FieldLabel htmlFor={field.name}>
                  {formElement.label} {required && " *"}
                </FieldLabel>
                <FieldDescription hidden={!formElement.description}>
                  {formElement.description}
                </FieldDescription>
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
              </Field>
              {Array.isArray(fieldState.error) ? (
                fieldState.error?.map((error, i) => (
                  <p
                    role="alert"
                    data-slot="field-error"
                    className="text-destructive text-sm"
                    key={i}
                  >
                    {error.message}
                  </p>
                ))
              ) : (
                <FieldError errors={[fieldState.error]} />
              )}
            </div>
          )}
        />
      )
    case "Separator":
      return formElement.label ? (
        <FieldSeparator className="my-4">{formElement.label}</FieldSeparator>
      ) : (
        <FieldSeparator className="my-4" />
      )
    case "SocialMediaButtons": {
      const Img = ({ src }: { src: string }) => (
        <div className="place-items-center grid rounded-full bg-white size-6 p-0.5">
          <img src={src} width={16} height={16} />
        </div>
      )
      return formElement.layout === "row" ? (
        <div className="flex gap-2 justify-between w-full items-center flex-wrap pb-3">
          {formElement.links.map((key) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              className="text-sm gap-2 px-2 h-10 grow "
            >
              <Img src={socialLogsUrls[key].src} />
              {socialLogsUrls[key].label}
            </Button>
          ))}
        </div>
      ) : (
        <div className="w-full items-center flex-col gap-3 flex pb-3">
          {formElement.links.map((key) => (
            <Button
              size="lg"
              key={key}
              type="button"
              variant="outline"
              className="w-full h-11"
            >
              <Img src={socialLogsUrls[key].src} />
              {socialLogsUrls[key].label}
            </Button>
          ))}
        </div>
      )
    }
    case "TagInput":
      return (
        <Controller
          name={formElement.name}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 [&_p]:pb-2"
            >
              <FieldLabel htmlFor={field.name}>
                {formElement.label} {required && " *"}
              </FieldLabel>
              <TagInput
                tags={field.value ?? formElement.tags ?? []}
                setTags={(tags) => {
                  const newTags =
                    typeof tags === "function"
                      ? tags(field.value ?? formElement.tags ?? [])
                      : tags
                  field.onChange(newTags)
                }}
                placeholder={formElement.placeholder}
              />
              <FieldDescription>{formElement.description}</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    case "Text": {
      const variant = formElement.variant
      if (variant === "H1") {
        return (
          <h1
            key={formElement.content}
            className={cn(
              "mt-6 font-black text-3xl tracking-tight mb-1",
              formElement.className
            )}
          >
            {formElement.content}
          </h1>
        )
      }
      if (variant === "H2") {
        return (
          <h2 className="mt-4 font-extrabold text-2xl tracking-tight mb-1">
            {formElement.content}
          </h2>
        )
      }
      if (variant === "H3") {
        return (
          <h3 className="mt-3 font-bold text-xl tracking-tight mb-1">
            {formElement.content}
          </h3>
        )
      }
      if (variant === "P") {
        return (
          <p className="tracking-wide text-muted-foreground mb-5 text-wrap text-sm">
            {formElement.content}
          </p>
        )
      }
    }
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
      )
    case "H2":
      return (
        <h2 className="mt-4 font-bold text-2xl tracking-tight">
          {formElement.content}
        </h2>
      )
    case "H3":
      return (
        <h3 className="mt-3 font-semibold text-xl tracking-tight">
          {formElement.content}
        </h3>
      )
    case "P":
      return (
        <p className="tracking-wide text-muted-foreground mb-6 text-wrap text-sm">
          {formElement.content}
        </p>
      )
    default:
      return <div>Invalid Form Element </div>
  }
}
