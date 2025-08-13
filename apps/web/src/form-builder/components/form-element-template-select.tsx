import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type FormElement } from "@/form-builder/form-types";
import { formElementsList } from "@/form-builder/constant/form-elements-list";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiBookmarkLine, RiInputField } from "react-icons/ri";

import { templates } from "@/form-builder/constant/templates";
import { PiStackSimple, PiStackPlusLight } from "react-icons/pi";

const formTemplates = Object.entries(templates).map((template) => ({
  label: template[1].name,
  value: template[0],
  isMS: template[1].template.some((el) => el.hasOwnProperty("stepFields")),
}));

//======================================
export function TemplatesSelect() {
  const setTemplate = useFormBuilderStore((s) => s.setTemplate);
  return (
    <ScrollArea
      className="overflow-auto"
      style={{
        height: "100%",
        maxHeight: "50vh",
      }}
    >
      <div className="flex md:flex-col flex-wrap gap-3.5 flex-row py-2">
        {formTemplates.map(({ label, value, isMS }) => (
          <Button
            key={label}
            onClick={() => setTemplate(value)}
            className="justify-start text-[12px]"
            variant="outline"
          >
            {isMS ? (
              <PiStackPlusLight className="size-4" />
            ) : (
              <PiStackSimple className="size-4" />
            )}
            {label}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}

const FormElementSelect = () => {
  const appendElement = useFormBuilderStore((s) => s.appendElement);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);

  // Group elements by their group property
  const groupedElements = formElementsList.reduce((acc, element) => {
    const group = element.group || "other";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(element);
    return acc;
  }, {} as Record<string, typeof formElementsList>);

  const renderElementButton = (o: (typeof formElementsList)[0]) => {
    const Icon = o.icon;
    return (
      <Button
        key={o.name}
        variant="ghost"
        // size="sm"
        onClick={() => {
          appendElement({
            fieldType: o.fieldType as FormElement["fieldType"],
            stepIndex: isMS ? formElements.length - 1 : undefined,
          });
        }}
        className="gap-1 justify-start w-fit md:w-full text-[13px] py-1.5"
      >
        <div className="flex items-center justify-start gap-1.5">
          <span className="border rounded-full size-7 grid place-items-center">
            <Icon className="size-4" />
          </span>
          {o.name}
          {/* {o?.isNew! && (
          <Badge className="text-sm rounded-full ml-1 size-5 center">
            N
          </Badge>
        )} */}
        </div>
      </Button>
    );
  };

  return (
    <ScrollArea
      className="overflow-auto"
      style={{
        height: "100%",
        maxHeight: "50vh",
      }}
    >
      <div className="py-2 space-y-2">
        {/* Field Elements Group */}
        {groupedElements.field && (
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2 pl-4">
              Field Elements
            </h3>
            <div className="grid lg:grid-cols-1 md:grid-cols-3 grid-cols-2 gap-2 flex-row">
              {groupedElements.field.map(renderElementButton)}
            </div>
          </div>
        )}

        {/* Display Elements Group */}
        {groupedElements.display && (
          <div className="mb-3">
            <h3 className="text-xs font-medium text-muted-foreground mb-1.5 pl-4">
              Display Elements
            </h3>
            <div className="grid lg:grid-cols-1 md:grid-cols-3 grid-cols-2 gap-2 flex-row">
              {groupedElements.display.map(renderElementButton)}
            </div>
          </div>
        )}

        {/* Other Elements (fallback for any ungrouped elements) */}
        {groupedElements.other && (
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-1.5 pl-4">
              Other Elements
            </h3>
            <div className="flex md:flex-col flex-wrap gap-2 flex-row">
              {groupedElements.other.map(renderElementButton)}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

//======================================
export function FormElementTemplateSelect() {
  return (
    <div className="overflow-x-auto overflow-y-hidden py-3 w-full h-full relative px-3 lg:px-0">
      <Tabs defaultValue="form-elements" className="mb-4">
        <TabsList className="w-full">
          <TabsTrigger value="form-elements" className="text-sm">
            <RiInputField />
          </TabsTrigger>
          <TabsTrigger value="templates">
            <RiBookmarkLine />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="form-elements">
          <FormElementSelect />
        </TabsContent>
        <TabsContent value="templates">
          <TemplatesSelect />
        </TabsContent>
      </Tabs>
      <div className="h-12 from-white dark:from-background dark:via-background/70 to-transparent bg-linear-0 absolute bottom-0 right-0 w-full"></div>
    </div>
  );
}
