"use client"

import {
  type Tag,
  TagInput as EmblorTagInput,
  type TagInputProps,
} from "emblor"
import { useState, type Dispatch, type SetStateAction } from "react"

type TagInputWrapperProps = {
  tags?: Tag[]
  setTags: Dispatch<SetStateAction<Tag[]>>
} & Omit<TagInputProps, "activeTagIndex" | "setActiveTagIndex" | "tags" | "setTags">

export function TagInput({
  tags,
  setTags,
  ...rest
}: TagInputWrapperProps) {
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  return (
    <EmblorTagInput
      styleClasses={{
        inlineTagsContainer:
          "border-input rounded-md dark:bg-input/30 shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1.5",
        input: "w-full min-w-[80px] shadow-none px-2 h-7",
        tag: {
          body: "h-7 relative bg-input/60 border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
          closeButton:
            "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
        },
      }}
      tags={tags ?? []}
      setTags={setTags}
      {...rest}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
    />
  )
}
