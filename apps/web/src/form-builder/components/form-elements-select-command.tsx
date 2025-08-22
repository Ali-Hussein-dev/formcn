"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import * as React from "react";
import { formElementsList } from "@/form-builder/constant/form-elements-list";
import { useCommand } from "@/form-builder/hooks/use-command-ctx";
import type { FormElement } from "@/form-builder/form-types";
import useFormBuilderStore from "../hooks/use-form-builder-store";
import { HiArrowTurnDownLeft } from "react-icons/hi2";

export function FormElementsSelectCommand() {
  const appendElement = useFormBuilderStore((s) => s.appendElement);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const { openCommand: open, setOpenCommand: setOpen } = useCommand();
  return (
    <div>
      <p className="text-sm text-muted-foreground mt-3 text-center">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          f
        </kbd>{" "}
        to open fields command
      </p>
      <CommandDialog open={open} onOpenChange={setOpen} className="border-4">
        <CommandInput
          placeholder="Type form field name..."
          className="max-w-sm"
        />
        <CommandList>
          <CommandEmpty>No fields found.</CommandEmpty>
          <CommandGroup heading="Fields">
            {formElementsList.map((o) => {
              const Icon = o.icon;
              return (
                <CommandItem
                  key={o.name}
                  onSelect={() => {
                    appendElement({
                      fieldType: o.fieldType as FormElement["fieldType"],
                      stepIndex: isMS ? formElements.length - 1 : undefined,
                    });
                  }}
                  className="gap-3"
                >
                  <Icon />
                  {o.name}
                  {/* {o.isNew && (
                  <Badge className="text-sm py-0 rounded-[2px]">New</Badge>
                )} */}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
        <div className="flex items-center justify-start bg-border py-3 text-[12px] gap-2 px-4.5">
          <div className="flex gap-1 border-r border-foreground/20 pr-2">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              esc
            </kbd>{" "}
            to close
          </div>
          <div className="flex gap-1">
            Press{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <HiArrowTurnDownLeft />
            </kbd>{" "}
            to select
          </div>
        </div>
      </CommandDialog>
    </div>
  );
}
