import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MdAdd } from "react-icons/md";
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
      className="overflow-auto px-1"
      style={{
        height: "100%",
        maxHeight: "45vh",
      }}
    >
      <div className="space-y-3 py-3">
        {formTemplates.map(({ label, value, isMS }) => (
          <Button
            key={label}
            onClick={() => setTemplate(value)}
            className="px-3.5 py-2.5 w-full justify-start"
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
  return (
    <ScrollArea
      className="overflow-auto px-1"
      style={{
        height: "100%",
        maxHeight: "45vh",
      }}
    >
      <div className="flex md:flex-col flex-wrap gap-3.5 flex-row py-3">
        {formElementsList.map((o) => (
          <Button
            key={o.name}
            variant="secondary"
            onClick={() => {
              appendElement({
                fieldType: o.fieldType as FormElement["fieldType"],
                stepIndex: isMS ? formElements.length - 1 : undefined,
              });
            }}
            className="gap-1 justify-start rounded-lg w-fit md:w-full relative text-sm px-2"
          >
            <div className="flex items-center justify-start gap-1">
              <MdAdd />
              {o.name}
              {/* {o?.isNew! && (
          <Badge className="text-sm rounded-full ml-1 size-5 center">
            N
          </Badge>
        )} */}
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};
//======================================
export function FormElementTemplateSelect() {
  return (
    <div className="overflow-x-auto overflow-y-hidden px-2 py-3 w-full h-full relative">
      <Tabs defaultValue="form-elements">
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
      <div className="h-10 from-background to-transparent bg-linear-0 absolute bottom-0 right-0 w-full "></div>
    </div>
  );
}
