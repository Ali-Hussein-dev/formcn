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
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function FormElementsSelectCommand() {
  const appendElement = useFormBuilderStore((s) => s.appendElement);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const isMS = useFormBuilderStore((s) => s.isMS);
  const { openCommand: open, setOpenCommand: setOpen } = useCommand();
  return (
    <div>
      <p className="text-sm text-muted-foreground md:block hidden">
        Open fields command with{" "}
        <KbdGroup>
          <Kbd>Alt</Kbd>+<Kbd>f</Kbd>
        </KbdGroup>
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
                  <div className="flex items-center justify-start gap-1.5 text-accent-foreground">
                    <span className="border rounded-xl size-8 border-dashed bg-accent grid place-items-center">
                      <Icon className="size-4 text-accent-foreground" />
                    </span>
                    <div className="flex flex-col justify-start items-start">
                      <span className="text-xs">{o.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {o.description}
                      </span>
                    </div>
                  </div>
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
