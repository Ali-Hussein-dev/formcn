import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type FormElement } from "@/form-builder/form-types";
import { formElementsList } from "@/form-builder/constant/form-elements-list";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { Badge } from "@/components/ui/badge";

//======================================

const FormElementSelect = () => {
  const appendElement = useFormBuilderStore((s) => s.appendElement);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);

  // Group elements by their group property
  const groupedElements = formElementsList.reduce(
    (acc, element) => {
      const group = element.group || "other";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(element);
      return acc;
    },
    {} as Record<string, typeof formElementsList>
  );

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
        className="gap-1 justify-start w-fit lg:w-full py-1.5"
      >
        <div className="flex items-center justify-start gap-1.5 text-accent-foreground">
          <span className="border rounded-xl size-8 border-dashed bg-accent/40 grid place-items-center">
            <Icon className="size-4 text-muted-foreground" />
          </span>
          <div className="flex flex-col justify-start items-start">
            <div className="text-xs">
              {o.name}
              {o?.isNew! && (
                <Badge
                  className="text-[9px] font-medium rounded-2xl ml-1"
                  variant="destructive"
                >
                  New
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Button>
    );
  };

  return (
    <ScrollArea
      className="overflow-auto"
      style={{
        height: "100%",
        maxHeight: "80vh",
      }}
    >
      <div className="py-2 space-y-3">
        {/* Field Elements Group */}
        {groupedElements.field && (
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2 pl-4">
              Field Elements
            </h3>
            <div className="lg:grid flex flex-wrap gap-2">
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
            <div className="lg:grid flex flex-wrap gap-2">
              {groupedElements.display.map(renderElementButton)}
            </div>
          </div>
        )}

        {/* Other Elements (fallback for any ungrouped elements) */}
        {/* {groupedElements.other && (
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-1.5 pl-4">
              Other Elements
            </h3>
            <div className="flex md:flex-col flex-wrap gap-2 flex-row">
              {groupedElements.other.map(renderElementButton)}
            </div>
          </div>
        )} */}
      </div>
    </ScrollArea>
  );
};

//======================================
export function FormElementsSidebar() {
  return (
    <div className="overflow-x-auto overflow-y-hidden pb-3 w-full h-full relative px-3 lg:px-0">
      <FormElementSelect />
      <div className="h-12 from-white dark:from-background dark:via-background/70 to-transparent bg-linear-0 absolute bottom-0 right-0 w-full"></div>
    </div>
  );
}
