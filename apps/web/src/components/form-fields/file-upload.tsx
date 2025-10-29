"use client";

import { AlertCircleIcon, XIcon, CloudUpload, File } from "lucide-react";
import {
  formatBytes,
  useFileUpload,
} from "@/form-builder/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
  const fileType = file.file.type;
  if (fileType.startsWith("image/")) {
    // return preview
    return (
      <div className="aspect-square size-10 overflow-hidden rounded-md">
        <img
          src={URL.createObjectURL(file.file as Blob)}
          className="object-fill"
        />
      </div>
    );
  }
  return (
    <div className="aspect-square size-10 flex items-center justify-center overflow-hidden rounded-full">
      <File className="size-5 opacity-60" />
    </div>
  );
};

export function FileUpload({
  maxFiles,
  maxSize,
  placeholder,
  // description,
  required,
  setValue,
  accept,
  name,
  disabled,
}: {
  maxFiles: number;
  maxSize: number;
  placeholder?: string;
  // description?: string;
  required?: boolean;
  disabled?: boolean;
  setValue: (
    name: string,
    value: any,
    options?: {
      shouldValidate?: boolean;
      shouldDirty?: boolean;
      shouldTouch?: boolean;
    }
  ) => void;
  accept?: string;
  name: string;
}) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: maxFiles > 1,
    maxFiles,
    maxSize,
    accept,
    onFilesChange: (files) => {
      setValue(
        name,
        files.map((file) => file.file),
        { shouldValidate: true, shouldDirty: true, shouldTouch: true }
      );
    },
  });

  return (
    <div className="flex flex-col gap-2 pb-2">
      {/* Drop area */}
      <div
        role="button"
        onClick={openFileDialog}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-32 flex-col items-center justify-center rounded-md border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] hover:cursor-pointer"
      >
        {/* @ts-expect-error caused when upgrading to Nextjs 16 */}
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload files"
          required={required}
          disabled={disabled}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="bg-secondary mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CloudUpload className="size-4 opacity-60" />
          </div>
          {/* <p className="mb-1.5 text-sm font-medium">
            Upload
          </p> */}
          <p className="text-foreground font-medium text-sm mb-2">
            Drag & drop or click to browse
          </p>
          <div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs">
            {placeholder}
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
            >
              <div className="flex items-center gap-1.5 overflow-hidden">
                {getFileIcon(file)}
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-[11px] font-medium max-w-[200px]">
                    {file.file.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(file.file.size)}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Remove all files button */}
          {files.length > 1 && (
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={clearFiles}>
                Remove all files
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
