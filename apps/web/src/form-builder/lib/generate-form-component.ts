import type { FormElement } from "../form-types";

const getFieldLabel = (name: string, label?: string, required?: boolean) => {
  return label
    ? `<FieldLabel htmlFor="${name}">${label} ${required ? "*" : ""}</FieldLabel>`
    : "";
};
const getDescription = (description?: string) => {
  return description
    ? `<FieldDescription>${description}</FieldDescription>`
    : "";
};
type attributes =
  | "disabled"
  | "placeholder"
  | "id"
  | "name"
  | "type"
  | "min"
  | "max"
  | "readOnly"
  | "accept"
  | "maxFiles"
  | "maxSize"
  | "step";
const getAttribute = (attr: attributes, value?: boolean | string | number) => {
  if (typeof value === "string") {
    return `${attr}="${value}"`;
  }
  if (typeof value === "number") {
    return `${attr}={${value}}`;
  }
  if (value === true) {
    return attr;
  }
  return "";
};
export const getFormElementCode = (field: FormElement) => {
  switch (field.fieldType) {
    case "Input":
      return `
        <Controller
          ${getAttribute("name", field.name)}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
            ${getFieldLabel(field.name, field.label, field.required)}
              <Input
                {...field}
                ${getAttribute("id", field.name)}
                type="${field.type === "number" ? "number" : "text"}"
                onChange={(e) => {
                ${field.type === "number" ? "field.onChange(e.target.valueAsNumber)" : "field.onChange(e.target.value)"}
                }}
                aria-invalid={fieldState.invalid}
                ${getAttribute("placeholder", field.placeholder)}
                ${getAttribute("disabled", field.disabled)}
              />
              ${getDescription(field.description)}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />`;
    case "Textarea":
      return `
          <Controller
              ${getAttribute("name", field.name)}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                ${getFieldLabel(field.name, field.label, field.required)}
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    ${getAttribute("id", field.name)}
                    ${getAttribute("placeholder", field.placeholder)}
                    ${getAttribute("disabled", field.disabled)}
                  />
                  ${getDescription(field.description)}
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />`;
    case "Password":
      return `
        <Controller 
          ${getAttribute("name", field.name)} 
          control={form.control} 
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
            <FieldContent className="gap-0.5">
              ${getFieldLabel(field.name, field.label, field.required)}
              ${getDescription(field.description)}
            </FieldContent>
              <Password
                {...field}
                aria-invalid={fieldState.invalid}
                ${getAttribute("id", field.name)}
                ${getAttribute("placeholder", field.placeholder)}
                ${getAttribute("disabled", field.disabled)}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
        )} />`;
    case "OTP":
      return `
        <Controller
            ${getAttribute("name", field.name)} 
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent className="gap-1">
                    ${getFieldLabel(field.name, field.label, field.required)}
                    ${getDescription(field.description)}
                  </FieldContent>
                    <InputOTP
                      {...field}
                      aria-invalid={fieldState.invalid}
                      ${getAttribute("id", field.name)}
                      ${getAttribute("disabled", field.disabled)}
                      maxLength={6}
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
        />`;
    case "Checkbox":
      return `<Controller
          ${getAttribute("name", field.name)} 
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <div className="flex items-center gap-2 mb-1">
                <Checkbox
                  ${getAttribute("id", field.name)}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  ${getAttribute("disabled", field.disabled)}
                />
                ${getFieldLabel(field.name, field.label, field.required)}
                ${getDescription(field.description)}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />`;
    case "Switch":
      return `
        <Controller
          ${getAttribute("name", field.name)} 
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>  
                ${getFieldLabel(field.name, field.label, field.required)}
                ${getDescription(field.description)}
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
              <Switch
                {...field}
                aria-invalid={fieldState.invalid}
                ${getAttribute("id", field.name)}
                checked={field.value}
                onCheckedChange={field.onChange}
                ${getAttribute("disabled", field.disabled)}
              />
            </Field>
          )}
        />`;
    case "Slider":
      return `
        <Controller
          ${getAttribute("name", field.name)} 
          control={form.control}
          render={({ field, fieldState }) => {
            const { max = 100, min = 0, step } = field;
            const value = Array.isArray(field.value)
              ? field.value
              : [field.value ?? max / 2];
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent className="mb-2 gap-1">
                  <FieldLabel
                    htmlFor={field.name}
                    className="flex justify-between items-center w-full"
                  >
                    ${field.label}
                    ${field.required ? " *" : ""}
                    <span className="text-sm">
                      {value}/{max}
                    </span>
                  </FieldLabel>
                  ${getDescription(field.description)}
                </FieldContent>
                <Slider
                  {...field}
                  value={value}
                  onValueChange={(newValue) => field.onChange(newValue[0])}
                  aria-invalid={fieldState.invalid}
                  ${getAttribute("min", field.min)}
                  ${getAttribute("max", field.max)}
                  ${getAttribute("step", field.step)}
                  ${getAttribute("disabled", field.disabled)}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
      `;
    case "ToggleGroup":
      return `
        <Controller
          ${getAttribute("name", field.name)}
          control={form.control}
          render={({ field, fieldState }) => {
            const options = ${JSON.stringify(field.options)};
            return (
              <Field data-invalid={fieldState.invalid} className="gap-1 [&_p]:pb-2">
                ${getFieldLabel(field.name, field.label, field.required)}
                ${getDescription(field.description)}
                <ToggleGroup
                  variant="outline"
                  value={${
                    field.type === "single"
                      ? "field.value"
                      : `// wrap in array and flat because value can be a string or an array
                        [field.value].flat().filter((val) => val !== undefined)`
                  }}
                  onValueChange={field.onChange}
                  ${getAttribute("type", field.type)}
                  ${getAttribute("disabled", field.disabled)}
                  className="flex justify-start items-center gap-2 flex-wrap"
                >
                  {options.map(({ label, value }) => (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      className="flex items-center gap-x-2"
                    >
                      {label}
                    </ToggleGroupItem>))
                  }
                  </ToggleGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />`;
    case "Select":
      return `
        <Controller
          ${getAttribute("name", field.name)}
          control={form.control}
          render={({ field, fieldState }) => {
          const options = ${JSON.stringify(field.options)};
          return (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              ${getFieldLabel(field.name, field.label, field.required)}
              ${getDescription(field.description)}
              <Select
                value={field.value}
                onValueChange={field.onChange}
                ${getAttribute("disabled", field.disabled)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue ${getAttribute("placeholder", field.placeholder)} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}}
        />`;
    case "Combobox":
      return `
        <Controller
          ${getAttribute("name", field.name)}
          control={form.control}
          render={({ field, fieldState }) => {
          const options = ${JSON.stringify(field.options)};
          return (
            <Field data-invalid={fieldState.invalid} className="gap-2">
            ${getFieldLabel(field.name, field.label, field.required)}
            ${getDescription(field.description)}
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
                      ? field.options.find(
                          (option) => option.value === field.value
                        )?.label
                      : "${field.placeholder ?? ""}"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 min-w-[var(--radix-popper-anchor-width)] w-full"
                  align="start"
                >
                  <Command>
                    <CommandInput
                      placeholder="tap to search..."
                      className="h-10"
                    />
                    <CommandList>
                      <CommandEmpty>No items found.</CommandEmpty>
                      <CommandGroup>
                        {options.map(({label, value}) => (
                          <CommandItem
                            value={value}
                            key={value}
                            onSelect={() => {
                              form.setValue("${field.name}", value);
                            }}
                          >
                            {label}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === field.value
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
          )}}
        />
      `;
    case "MultiSelect":
      return `
        <Controller
          ${getAttribute("name", field.name)}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-0 [&_p]:pb-1">
              ${getFieldLabel(field.name, field.label, field.required)}
              ${getDescription(field.description)}
              <MultiSelect
                values={field.value ?? []}
                onValuesChange={(value) => field.onChange(value ?? [])}
                ${getAttribute("disabled", field.disabled)}
              >
                <MultiSelectTrigger>
                  <MultiSelectValue ${getAttribute("placeholder", field.placeholder)} />
                </MultiSelectTrigger>
                <MultiSelectContent>
                    {options.map(({label, value}) => (
                        <MultiSelectItem
                          key={value}
                          value={value}
                        >
                          {label}
                        </MultiSelectItem>
                      ))}
                </MultiSelectContent>
              </MultiSelect>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />`;
    case "Rating":
      return `
        <Controller
          ${getAttribute("name", field.name)}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1 [&_p]:pb-2">
              ${getFieldLabel(field.name, field.label, field.required)}
              ${getDescription(field.description)}
              <Rating
                value={field.value}
                onValueChange={field.onChange}
                ${getAttribute("readOnly", field.disabled)}
              >
                {Array.from({
                  length: ${(field.numberOfStars as number) ?? 5},
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
        />`;
    case "RadioGroup":
      return `
        <Controller
          ${getAttribute("name", field.name)}
          control={form.control}
          render={({ field, fieldState }) => {
          const options = ${JSON.stringify(field.options)};
            return(
              <Field data-invalid={fieldState.invalid} className="gap-1 [&_p]:pb-2">
                ${getFieldLabel(field.name, field.label, field.required)}
                ${getDescription(field.description)}
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  ${getAttribute("disabled", field.disabled)}
                >
                  {options.map(({ label, value }) => (
                    <div
                      key={value}
                      className="flex items-center gap-x-2"
                    >
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}}
        />`;
    case "DatePicker":
      return `
        <Controller
          ${getAttribute("name", field.name)}
          control={form.control}
          render={({ field, fieldState }) => {
            const selectedDate = field.value;
            const mode =  "${field.mode}";
            return (
              <Field data-invalid={fieldState.invalid}>
                ${getFieldLabel(field.name, field.label, field.required)}
                ${getDescription(field.description)}
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-start font-normal active:scale-none",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="size-4" />
                            {selectedDate ? (
                              <>
                                ${
                                  field.mode === "range"
                                    ? `(
                                  <div className="flex items-center gap-x-2">
                                    {selectedDate?.from &&
                                      format(selectedDate.from, "dd MMM, yyyy")}
                                    {selectedDate?.from && " - "}
                                    {selectedDate?.to &&
                                      format(selectedDate.to, "dd MMM, yyyy")}
                                  </div>
                                )`
                                    : ""
                                }
                                ${field.mode === "single" ? `{format(selectedDate, "dd MMM, yyyy")}` : ""}
                                
                                ${field.mode === "multiple" ? `{selectedDate.length + "dates selected"}` : ""}
                              </>
                            ) : (
                              <span>${field.placeholder ?? ""}</span>
                            )}
                              </Button>
                            {fieldState.isDirty && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute top-1/2 -end-0 -translate-y-1/2 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  form.resetField(${field.name});
                                }}
                              >
                                <X />
                              </Button>
                            )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="${field.mode}"
                      selected={selectedDate}
                      onSelect={(newDate) => {
                        form.setValue(field.name, newDate, {
                          shouldDirty: true,
                          });
                        }}
                      ${getAttribute("disabled", field.disabled)}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />`;
    case "FileUpload":
      return `
        <Controller
          ${getAttribute("name", field.name)}
          control={form.control}
          render={({ field, fieldState }) => (
            <div>
              <Field data-invalid={fieldState.invalid} className="gap-1">
                ${getFieldLabel(field.name, field.label, field.required)}
                ${getDescription(field.description)}
                <FileUpload
                  {...field}
                  setValue={form.setValue}
                  ${getAttribute("name", field.name)}
                  ${getAttribute("placeholder", field.placeholder)}
                  ${getAttribute("accept", field.accept)}
                  ${getAttribute("maxFiles", field.maxFiles ?? 1)}
                  ${getAttribute("maxSize", field.maxSize ?? 1024 * 1024)}
                  ${getAttribute("disabled", field.disabled)}
                />
              </Field>
              {Array.isArray(fieldState.error) ? (
                fieldState.error?.map((error, i) => (
                  <p
                    key={i}
                    role="alert"
                    data-slot="field-error"
                    className="text-destructive text-sm"
                  >
                    {error.message}
                  </p>
                ))
              ) : (
                <FieldError errors={[fieldState.error]} />
              )}
            </div>
          )}
        />`;
    case "Separator":
      return field.label
        ? `<FieldSeparator className="my-4">${field.label}</FieldSeparator>`
        : `<FieldSeparator className="my-4" />`;
    case "SocialMediaButtons":
      return field.layout === "row"
        ? `<div className="flex gap-3 justify-center w-full items-center flex-wrap pb-3">
          {socialMediaButtons.map((o) => (
            <Button key={o.label} variant="outline" type="button"
              className="text-sm gap-2 px-2 h-10 grow ">
              <div className="place-items-center grid rounded-full bg-white size-6 p-0.5">
                <img src={o.src} width={16} height={16} />
              </div>
              {o.label}
            </Button>
          ))}
        </div>`
        : `<div className="w-full items-center flex-col gap-3 flex pb-3">
              {socialMediaButtons.map((o) => (
                <Button 
                  key={o.label} 
                  variant="outline" 
                  size="lg" 
                  type="button"
                  className="w-full h-11">
                    <div className="place-items-center grid rounded-full bg-white size-6 p-0.5">
                      <img src={o.src} width={16} height={16} />
                    </div>
                  {o.label}
                </Button>
              ))}
            </div>`;
    case "Text":
      if (field.variant == "H1")
        return `<h1 className="mt-6 mb-1 font-extrabold text-3xl tracking-tight">${field.content}</h1>`;
      if (field.variant == "H2")
        return `<h2 className="mt-4 mb-1 font-bold text-2xl tracking-tight">${field.content}</h2>`;
      if (field.variant == "H3")
        return `<h3 className="mt-3 mb-1 font-semibold text-xl tracking-tight">${field.content}</h3>`;
      if (field.variant == "P")
        return `<p className="tracking-wide text-muted-foreground mb-5 text-wrap text-sm">${field.content}</p>`;
    case "H1":
      return `<h1 className="mt-6 font-extrabold text-3xl tracking-tight">${field.content}</h1>`;
    case "H2":
      return `<h2 className="mt-4 font-bold text-2xl tracking-tight">${field.content}</h2>`;
    case "H3":
      return `<h3 className="mt-3 font-semibold text-xl tracking-tight">${field.content}</h3>`;
    case "P":
      return `<p className="tracking-wide text-muted-foreground mb-6 text-wrap text-sm">${field.content}</p>`;
    default:
      return null;
  }
};
