import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { templates } from "@/form-builder/constant/templates";
import { GoGitCommit } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import useLocalForms from "@/form-builder/hooks/use-local-forms";
import { useQueryState } from "nuqs";
import React from "react";

//======================================
function FormsSelect() {
  const allForms = useLocalForms((s) => s.forms)
  const [formId, setQueryState] = useQueryState("id")

  React.useEffect(() => {
    if (!formId) {
      setQueryState(templates[0].id)
    }
  }, [formId, setQueryState])

  return (
    <>
      <ScrollArea className="overflow-auto h-full">
        {allForms.length > 0 && (
          <div className="flex md:flex-col flex-wrap gap-1 flex-row py-2">
            <h3 className="text-xs font-medium text-muted-foreground pl-1">
              Saved Forms
            </h3>
            <div className="flex flex-col xl:max-w-[250px] sm:max-w-[210px] gap-1">
              {allForms.map((savedForm) => (
                <Button
                  key={savedForm.id}
                  onClick={() => setQueryState(savedForm.id)}
                  className="justify-start text-[12px] "
                  variant={formId === savedForm.id ? "secondary" : "ghost"}
                >
                  {savedForm.isMS ? (
                    <GoGitCommit className="size-4 text-secondary-foreground/50" />
                  ) : (
                    <CgFileDocument className="size-4 text-secondary-foreground/50" />
                  )}
                  <span className="truncate">{savedForm.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        <h3 className="text-xs font-medium text-muted-foreground pl-1 mt-2">
          Templates
        </h3>
        <div className="flex md:flex-col flex-wrap gap-1 flex-row py-2">
          {templates.map(({ id, title, isMS }) => (
            <Button
              key={id}
              onClick={() => setQueryState(id)}
              className="justify-start text-[12px]"
              variant={formId === id ? "secondary" : "ghost"}
            >
              {isMS ? (
                <GoGitCommit className="size-4 text-secondary-foreground/50" />
              ) : (
                <CgFileDocument className="size-4 text-secondary-foreground/50" />
              )}
              {title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}

export function FormsListSidebar() {
  return (
    <div className="relative pb-2">
      <FormsSelect />
    </div>
  )
}
