"use client";
import { NewForm } from "./new-form";
import { FormPreview } from "./preview/form-preview";
import { usePreviewForm } from "@/form-builder/hooks/use-preview-form";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import useFormBuilderStore from "../hooks/use-form-builder-store";
import { templates } from "@/form-builder/constant/templates";
import type { FormElementOrList } from "../form-types";
import { useRouter } from "next/navigation";
import { useLocalForms } from "@/form-builder/hooks/use-local-forms";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { FormsListSidebar } from "./forms-list-sidebar";
import { MyFormSkeleton } from "./form-skeleton";
import dynamic from "next/dynamic";
import { WebPreview } from "./web-preview";
import * as motion from "motion/react-client";

function DeleteButtonWithConfim({ cb }: { cb: () => void }) {
  const [open, setOpen] = React.useState(false);
  return open ? (
    <div className="flex gap-2 items-center">
      <Button
        variant="destructive"
        onClick={() => {
          cb();
          setOpen(false);
        }}
      >
        Confirm
      </Button>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  ) : (
    <Button variant="ghost" onClick={() => setOpen(true)}>
      Delete
    </Button>
  );
}

// Show form name, edit and delete
function SavedFormCard(props: { name: string; id: string }) {
  const savedForms = useLocalForms((s) => s.forms);
  const updateForm = useLocalForms((s) => s.updateForm);
  const deleteForm = useLocalForms((s) => s.deleteForm);
  const [editMode, setEditMode] = React.useState(false);
  const [name, setName] = React.useState(props.name);
  const router = useRouter();

  // Reset state when props change
  React.useEffect(() => {
    setEditMode(false);
    setName(props.name);
  }, [props.id, props.name]);

  // on esc press, close the edit mode
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditMode(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleEdit() {
    updateForm({ id: props.id, name });
    setEditMode(false);
  }
  function handleDelete() {
    deleteForm(props.id);
    toast("Form deleted successfully");
    router.push(`/my-forms?id=${templates[0].id}`);
  }

  return (
    <div className="flex items-center gap-2 w-full justify-between">
      {editMode ? (
        <div className="flex gap-2 items-center w-full">
          <Input
            // ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditMode(false)}
          >
            <X className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEdit()}>
            <Check className="size-4" />
          </Button>
        </div>
      ) : (
        <h2
          className="font-semibold pl-2 hover:cursor-pointer"
          onClick={() => setEditMode(true)}
        >
          {name}
        </h2>
      )}
      <DeleteButtonWithConfim cb={handleDelete} />
    </div>
  );
}

//======================================
export function MyFormsBase() {
  const previewForm = usePreviewForm();
  const setFormElements = useFormBuilderStore((s) => s.setFormElements);
  const setForm = useLocalForms((s) => s.setForm);
  const getFormById = useLocalForms((s) => s.getFormById);
  const updateForm = useLocalForms((s) => s.updateForm);

  const searchParams = useSearchParams();
  const PreviewFormId = searchParams.get("id");

  const meta = useFormBuilderStore((s) => s.meta);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const router = useRouter();
  const isTemplate = !!PreviewFormId && PreviewFormId.startsWith("template-");

  React.useEffect(() => {
    if (PreviewFormId) {
      previewForm.form.reset();
    }
  }, [PreviewFormId]);

  function handleUseForm() {
    toast.message("Saving your form & redirecting ...", { duration: 1000 });
    // save form from form builder into local forms
    if (meta.id) {
      updateForm({
        id: meta.id,
        formElements: formElements,
      });
    }
    if (isTemplate) {
      const template = templates.find((t) => t.id === PreviewFormId);
      if (template) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const formObject = {
          id,
          name: template.title + " Template",
          isMS: template.isMS,
          formElements: template.formElements as FormElementOrList[],
          createdAt: date,
          updatedAt: date,
        };
        // add form template to local Forms
        setFormElements(formObject.formElements, {
          isMS: formObject.isMS,
          id,
          name: formObject.name,
        });
        setForm(formObject);
        router.push(`/form-builder?id=${id}`);
        return;
      }
    } else {
      const savedForm = getFormById(PreviewFormId!);
      if (savedForm) {
        setFormElements(savedForm.formElements, {
          isMS: savedForm.isMS,
          id: savedForm.id,
          name: savedForm.name,
        });
      }
      router.push(`/form-builder?id=${PreviewFormId}`);
    }
  }
  const currentForm = isTemplate
    ? templates.find((t) => t.id === PreviewFormId)
    : getFormById(PreviewFormId!);

  return (
    <div>
      <div className="flex justify-end px-4 lg:px-6">
        <div className="w-fit">
          <NewForm />
        </div>
      </div>
      <div className="grid md:grid-cols-10 py-4 ">
        <div className="lg:col-span-2 hidden md:block md:col-span-3 px-3 border rounded-sm border-dashed py-2">
          <FormsListSidebar />
        </div>
        <div className="lg:col-span-8 md:col-span-7 px-4 lg:px-6">
          {PreviewFormId && (
            <WebPreview>
              <div className="p-2 lg:p-4">
                <motion.div
                  key={PreviewFormId}
                  className="border rounded-lg p-3 lg:p-4 bg-primary-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "keyframes", duration: 0.35 }}
                >
                  <FormPreview
                    formElements={
                      (currentForm?.formElements || []) as FormElementOrList[]
                    }
                    isMS={currentForm?.isMS || false}
                    {...previewForm}
                  />
                </motion.div>
                <div className="pt-4 flex justify-end">
                  {!isTemplate && (
                    <div className="grow pr-2">
                      <SavedFormCard
                        id={PreviewFormId}
                        name={getFormById(PreviewFormId)?.name || "Form"}
                      />
                    </div>
                  )}
                  <Button variant="default" onClick={handleUseForm}>
                    Edit form
                  </Button>
                </div>
              </div>
            </WebPreview>
          )}
        </div>
      </div>
    </div>
  );
}

export const MyForms = dynamic(
  () => import("./my-forms").then((mod) => mod.MyFormsBase),
  {
    ssr: false,
    loading: () => <MyFormSkeleton />,
  }
);
