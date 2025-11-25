"use client"
import { NewForm } from "./new-form"
import { FormPreview } from "./preview/form-preview"
import { usePreviewForm } from "@/form-builder/hooks/use-preview-form"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import useFormBuilderStore from "../hooks/use-form-builder-store"
import { templates } from "@/form-builder/constant/templates"
import type { FormElementOrList } from "../form-types"
import { useRouter } from "next/navigation"
import { useLocalForms } from "@/form-builder/hooks/use-local-forms"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { toast } from "sonner"
import { Check, Pencil, Trash, X } from "lucide-react"
import { FormsListSidebar } from "./forms-list-sidebar"
import { MyFormSkeleton } from "./form-skeleton"
import dynamic from "next/dynamic"
import { WebPreview } from "./web-preview"
import * as motion from "motion/react-client"
import Link from "next/link"
import { BsStars } from "react-icons/bs"
import { flattenFormElementOrList } from "../lib/form-elements-helpers"

function DeleteButtonWithConfim({ cb }: { cb: () => void }) {
  const [open, setOpen] = React.useState(false)
  return open ? (
    <div className="flex gap-2 items-center">
      <Button
        variant="destructive"
        onClick={() => {
          cb()
          setOpen(false)
        }}
      >
        Confirm
      </Button>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </div>
  ) : (
    <Button variant="destructive" onClick={() => setOpen(true)}>
      <Trash className="size-4" />
      Delete form
    </Button>
  )
}

// Show form name, edit and delete
function SavedFormCard(props: { name: string; id: string }) {
  const savedForms = useLocalForms((s) => s.forms)
  const updateForm = useLocalForms((s) => s.updateForm)
  const deleteForm = useLocalForms((s) => s.deleteForm)
  const [editMode, setEditMode] = React.useState(false)
  const [name, setName] = React.useState(props.name)
  const router = useRouter()

  // Reset state when props change
  React.useEffect(() => {
    setEditMode(false)
    setName(props.name)
  }, [props.id, props.name])

  // on esc press, close the edit mode
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditMode(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function handleEdit() {
    updateForm({ id: props.id, name })
    setEditMode(false)
  }
  function handleDelete() {
    deleteForm(props.id)
    toast("Form deleted successfully")
    router.push(`/my-forms?id=${templates[0].id}`)
  }

  return (
    <div className="flex items-center gap-2 w-full justify-between">
      {editMode ? (
        <div className="flex gap-2 items-center w-full">
          <Input
            // ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background dark:bg-background"
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
      <div className="flex gap-3 items-center">
        <DeleteButtonWithConfim cb={handleDelete} />
        <Button variant="outline" onClick={() => setEditMode(true)}>
          <Pencil className="size-4" />
          Rename
        </Button>
      </div>
    </div>
  )
}
// migrate local forms to flat nested form elements
const useMigrateLocalForms = () => {
  const forms = useLocalForms((s) => s.forms)
  const updateForm = useLocalForms((s) => s.updateForm)
  React.useEffect(() => {
    forms.forEach((form) => {
      // use to handle nested form elements
      const flattenElements = flattenFormElementOrList(
        form.formElements as FormElementOrList[]
      )
      if (flattenElements) {
        updateForm({ id: form.id, formElements: flattenElements })
      }
    })
  }, [])
  return {}
}

const useSelectedForm = () => {
  const searchParams = useSearchParams()
  const PreviewFormId = searchParams.get("id")
  const getFormById = useLocalForms((s) => s.getFormById)

  const isSelectedFormTemplate =
    !!PreviewFormId && PreviewFormId.startsWith("template-")

  const selectedForm = isSelectedFormTemplate
    ? templates.find((t) => t.id === PreviewFormId)
    : getFormById(PreviewFormId!)
  return { selectedForm, PreviewFormId, isSelectedFormTemplate }
}
//======================================
export function MyFormsBase() {
  useMigrateLocalForms()
  const previewForm = usePreviewForm()
  const setFormElements = useFormBuilderStore((s) => s.setFormElements)
  const setForm = useLocalForms((s) => s.setForm)
  const getFormById = useLocalForms((s) => s.getFormById)
  const updateForm = useLocalForms((s) => s.updateForm)

  const { selectedForm, PreviewFormId, isSelectedFormTemplate } =
    useSelectedForm()
  // reset form each time the form id changes
  React.useEffect(() => {
    if (PreviewFormId) {
      previewForm.form.reset()
    }
  }, [PreviewFormId])
  const meta = useFormBuilderStore((s) => s.meta)
  const formElements = useFormBuilderStore((s) => s.formElements)
  const router = useRouter()

  function handleUseForm() {
    toast.message("Redirecting...", { duration: 1000 })
    // save form from form builder into local forms
    if (meta.id) {
      updateForm({
        id: meta.id,
        formElements: formElements,
      })
    }
    if (isSelectedFormTemplate) {
      const template = templates.find((t) => t.id === PreviewFormId)
      if (template) {
        const id = crypto.randomUUID()
        const date = new Date().toISOString()
        const formObject = {
          id,
          name: template.title + " Template",
          isMS: template.isMS,
          formElements: template.formElements as FormElementOrList[],
          createdAt: date,
          updatedAt: date,
        }
        // add form template to local Forms
        setFormElements(formObject.formElements, {
          isMS: formObject.isMS,
          id,
          name: formObject.name,
        })
        setForm(formObject)
        router.push(`/form-builder?id=${id}`)
        return
      }
    } else {
      const savedForm = getFormById(PreviewFormId!)
      if (savedForm) {
        setFormElements(savedForm.formElements, {
          isMS: savedForm.isMS,
          id: savedForm.id,
          name: savedForm.name,
        })
      }
      router.push(`/form-builder?id=${PreviewFormId}`)
    }
  }

  return (
    <div className="grid md:grid-cols-10">
      <div className="lg:col-span-2 hidden md:block md:col-span-3 pl-3 border-r rounded-sm border-dashed py-2">
        <FormsListSidebar />
      </div>
      <div className="lg:col-span-8 md:col-span-7 ">
        <div className="flex justify-between px-4 py-4 lg:px-6 gap-3">
          <Button variant="default" asChild>
            <Link href={"/ai-form-generator"}>
              <BsStars />
              Formcn AI
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button onClick={handleUseForm} variant="secondary">
              {isSelectedFormTemplate ? "Clone template" : "Edit form"}
            </Button>
            <div className="w-fit">
              <NewForm />
            </div>
          </div>
        </div>
        <div className="md:px-4 lg:px-6">
          {PreviewFormId && (
            <>
              <WebPreview>
                <div className="p-2 lg:p-4 @container/my-forms">
                  <motion.div
                    key={PreviewFormId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "keyframes", duration: 0.35 }}
                  >
                    <FormPreview
                      formElements={
                        (selectedForm?.formElements ??
                          []) as FormElementOrList[]
                      }
                      isMS={selectedForm?.isMS || false}
                      {...previewForm}
                    />
                  </motion.div>
                </div>
              </WebPreview>
              <div className="py-4 flex justify-end">
                {!isSelectedFormTemplate && (
                  <div className="grow pr-2">
                    <SavedFormCard
                      id={PreviewFormId}
                      name={getFormById(PreviewFormId)?.name || "Form"}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export const MyForms = dynamic(
  () => import("./my-forms").then((mod) => mod.MyFormsBase),
  {
    ssr: false,
    loading: () => <MyFormSkeleton />,
  }
)
