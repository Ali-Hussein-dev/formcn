"use client"

import { usePreviewForm } from "@/form-builder/hooks/use-preview-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormElementsSidebar } from "@/form-builder/components/form-elements-sidebar"
import { FormEdit } from "@/form-builder/components/edit/form-edit"
import { FormPreview } from "@/form-builder/components/preview/form-preview"
import {
  JsonViewer,
  CodePanel,
} from "@/form-builder/components/generated-code/code-panel"
import * as React from "react"
import { CommandProvider } from "@/form-builder/hooks/use-command-ctx"
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store"
import { FormElementsSelectCommand } from "@/form-builder/components/form-elements-select-command"
import { redirect, useSearchParams } from "next/navigation"
import useLocalForms from "../hooks/use-local-forms"
import { toast } from "sonner"
import { FaArrowLeft } from "react-icons/fa6"
import Link from "next/link"
import { Placeholder } from "@/form-builder/components/placeholder"
import dynamic from "next/dynamic"
import { FormBuilderSkeleton } from "./form-skeleton"
import { MdOutlineEditOff } from "react-icons/md"
import { BsFillSendFill } from "react-icons/bs"
import { HiOutlineCodeBracket } from "react-icons/hi2"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "@/components/shared/error-fallback"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { flattenFormElementOrList } from "../lib/form-elements-helpers"
import type { FormElementOrList } from "../form-types"
import { ScrollArea } from "@/components/ui/scroll-area"

const tabsList = [
  {
    name: "Edit",
    icon: <MdOutlineEditOff />,
  },
  {
    name: "Code",
    icon: <HiOutlineCodeBracket />,
  },
  // {
  //   name: "JSON",
  // },
  {
    name: "Submission",
    icon: <BsFillSendFill />,
  },
]

const PatternBG = () => (
  <div
    className="absolute inset-0 -z-10 opacity-25"
    style={{
      backgroundImage: `
        repeating-linear-gradient(45deg, 
          var(--border) 0px, 
          var(--border) 2px, 
          transparent 2px, 
          transparent 5px
        )
      `,
    }}
  />
)
//======================================
export function FormBuilderBase() {
  const previewForm = usePreviewForm()
  const { submittedData, cleanEditingFields: resetForm } = previewForm
  const formElements = useFormBuilderStore((s) => s.formElements)
  const setFormElements = useFormBuilderStore((s) => s.setFormElements)
  const meta = useFormBuilderStore((s) => s.meta)
  const isMS = useFormBuilderStore((s) => s.isMS)
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const saveForm = useLocalForms((s) => s.updateForm)

  // migrate form elements to flat nested form elements
  React.useEffect(() => {
    // use to handle nested form elements
    const flattenElements = flattenFormElementOrList(
      formElements as FormElementOrList[]
    )
    if (flattenElements) {
      setFormElements(flattenElements, { id: meta.id, name: meta.name, isMS })
    }
  }, [])

  function handleSaveForm() {
    if (!id) return
    saveForm({ id, formElements })
    toast.message("Form changes saved locally", { duration: 1000 })
  }
  if (!id) {
    redirect("/my-forms")
  }

  return (
    <div className="relative">
      <div className="w-full grid lg:grid-cols-12 z-50 isolate">
        <div className="lg:col-span-2 lg:border-r-2 lg:sticky top-0 lg:h-[calc(100vh-3rem)]">
          <ScrollArea className="lg:px-2 py-3 lg:h-[calc(100vh-3rem)]">
            <div className="h-full flex flex-col justify-between">
              <Button
                variant="ghost"
                className="flex justify-start gap-2"
                asChild
              >
                <Link href={`/my-forms?id=${id}`}>
                  <FaArrowLeft />
                  Back
                </Link>
              </Button>
              <CommandProvider>
                <FormElementsSelectCommand />
              </CommandProvider>
              <FormElementsSidebar />
            </div>
          </ScrollArea>
        </div>
        <div className="lg:col-span-10 grow relative md:px-6 lg:px-8">
          <PatternBG />
          <div className="grid lg:grid-cols-12 py-8 gap-y-5 lg:gap-y-0">
            <div className="w-full lg:col-span-7 min-w-full lg:pr-8 ">
              <Tabs defaultValue={tabsList[0].name} className="bg-background">
                <TabsList className="w-full p-0 border-none h-auto">
                  {tabsList.map((tab) => (
                    <TabsTrigger
                      key={tab.name}
                      value={tab.name}
                      className="dark:data-[state=active]:border-transparent w-full dark:data-[state=active]:bg-background data-[state=active]:shadow-none dark:border-transparent py-2"
                    >
                      {tab.icon}
                      {tab.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent
                  value={tabsList[0].name}
                  tabIndex={-1}
                  className="sm:p-4 p-2"
                >
                  {formElements.length > 0 ? (
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <div className="pt-2">
                        <FormEdit />
                        <div className="pt-4 flex items-center justify-between">
                          {formElements.length > 1 && (
                            <Button variant="ghost" onClick={resetForm}>
                              Remove All
                            </Button>
                          )}
                          <Button variant="secondary" onClick={handleSaveForm}>
                            Save
                          </Button>
                        </div>
                      </div>
                    </ErrorBoundary>
                  ) : (
                    <div>
                      <Placeholder className="p-10 border rounded-lg max-w-full">
                        Add fields first from the left sidebar or use{" "}
                        <KbdGroup>
                          <Kbd>Alt</Kbd>+<Kbd>f</Kbd>
                        </KbdGroup>{" "}
                        to open the command palette
                      </Placeholder>
                    </div>
                  )}
                </TabsContent>
                <TabsContent
                  value={tabsList[1].name}
                  tabIndex={-1}
                  className="sm:p-4 p-2"
                >
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <CodePanel />
                  </ErrorBoundary>
                </TabsContent>
                {/* <TabsContent value={tabsList[2].name} tabIndex={-1}>
              <JsonViewer json={formElements} isMS={isMS} />
            </TabsContent> */}
                <TabsContent
                  value={tabsList[2].name}
                  tabIndex={-1}
                  className="sm:p-4 p-2 "
                >
                  {Object.keys(submittedData).length > 0 ? (
                    <JsonViewer json={submittedData} isMS={isMS} />
                  ) : (
                    <Placeholder className="p-10 border rounded-lg max-w-full">
                      Fill out the form to see fields values
                    </Placeholder>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            <div className="lg:col-span-5 w-full pb-6">
              <div className="lg:sticky top-2">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <FormPreview
                    {...previewForm}
                    formElements={formElements}
                    isMS={isMS}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const FormBuilder = dynamic(
  () => import("./form-builder").then((mod) => mod.FormBuilderBase),
  {
    ssr: false,
    loading: () => <FormBuilderSkeleton />,
  }
)
