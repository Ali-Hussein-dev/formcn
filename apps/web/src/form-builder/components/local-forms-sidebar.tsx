import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { templates } from "@/form-builder/constant/templates";
import { GoGitCommit } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import useLocalForms from "@/form-builder/hooks/use-local-forms";
import { useQueryState } from "nuqs";
import React from "react";
import { FieldSeparator } from "@/components/ui/field"
import { NewForm } from "./new-form"

export function LocalFormsSidebar() {
  const allForms = useLocalForms((s) => s.forms)
  const [formId, setQueryState] = useQueryState("id")

  React.useEffect(() => {
    if (!formId) {
      setQueryState(templates[0].id)
    }
  }, [formId, setQueryState])

  return (
    <ScrollArea className="max-h-screen px-3 py-2 overflow-y-scroll">
      <div className="py-2">
        <NewForm />
      </div>

      {allForms.length > 0 && (
        <div className="flex md:flex-col flex-wrap gap-1 flex-row py-3">
          <FieldSeparator className="mb-2.5">Draft Forms</FieldSeparator>
          <div className="flex flex-col gap-2">
            {allForms.map((savedForm) => (
              <Button
                key={savedForm.id}
                onClick={() => setQueryState(savedForm.id)}
                className="justify-start text-sm @container/form-button"
                variant={formId === savedForm.id ? "secondary" : "ghost"}
              >
                <div className="flex gap-2 items-center @xs/form-button:max-w-[100px] max-w-[220px]">
                  {savedForm.isMS ? (
                    <GoGitCommit className="size-4 text-secondary-foreground/50" />
                  ) : (
                    <CgFileDocument className="size-4 text-secondary-foreground/50" />
                  )}
                  <span className="truncate">{savedForm.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
      <FieldSeparator className="mt-2 mb-2.5">Templates</FieldSeparator>
      <div className="flex md:flex-col flex-wrap gap-2 flex-row pb-2">
        {templates.map(({ id, title, isMS }) => (
          <Button
            key={id}
            onClick={() => setQueryState(id)}
            className="justify-start text-sm"
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
  )
}
