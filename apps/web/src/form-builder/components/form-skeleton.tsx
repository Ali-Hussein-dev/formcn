import { Skeleton } from "@/components/ui/skeleton";
import * as motion from "motion/react-client";

export function FormBuilderSkeleton() {
  return (
    <motion.div
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-20 sm:w-40" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto overflow-hidden border rounded-xs border-dashed">
        {/* Left Sidebar - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:block w-64 bg-card p-4 space-y-6">
          {/* Field Elements Section */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton className="h-8 w-full" key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col xl:flex-row">
          {/* Form Builder */}
          <div className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 border-border border-dashed xl:border-x">
            {/* Tabs */}
            <div className="flex gap-1.5 w-full">
              {["Edit", "Code", "Submission"].map((tab, i) => (
                <Skeleton key={tab} className="h-8 flex-1" />
              ))}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Title */}
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Skeleton className="w-5 h-6" />
                <Skeleton className="h-5 w-16" />
              </div>

              {/* Subtitle */}
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Skeleton className="w-5 h-6" />
                <Skeleton className="h-4 w-32 sm:w-48" />
              </div>

              {/* Form Fields */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                >
                  <Skeleton className="w-5 h-6" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Skeleton className="w-5 h-6" />
                <Skeleton className="h-4 w-40 sm:w-56" />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between pt-6">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>

          {/* Right Preview Panel - Hidden on mobile, visible on xl screens */}
          <div className="hidden xl:block w-80 bg-card p-6">
            <div className="space-y-6">
              {/* Form Title */}
              <div className="space-y-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-56" />
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-18" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2 pt-2">
                  <Skeleton className="size-4 mt-0.5" />
                  <Skeleton className="h-4 w-48" />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Skeleton className="h-10 w-16" />
                  <Skeleton className="h-10 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function MyFormSkeleton() {
  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-end p-4">
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left Sidebar - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:block w-full lg:w-80 rounded-sm bg-card p-6 space-y-8">
          {/* Saved Forms Section */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50"
                >
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Templates Section */}
          <div className="space-y-4">
            <Skeleton className="h-5 w-32" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50"
                >
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="space-y-6 sm:space-y-8 bg-accent/10 p-4 sm:p-8 rounded-lg">
            {/* Form Header */}
            <div className="space-y-3">
              <Skeleton className="h-8 sm:h-10 w-24" />
              <Skeleton className="h-4 sm:h-5 w-48 sm:w-64" />
            </div>

            {/* Form Fields */}
            <div className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-10 sm:h-12 w-full rounded-lg" />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-14" />
                </div>
                <Skeleton className="h-10 sm:h-12 w-full rounded-lg" />
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-24 sm:w-32" />
                </div>
                <div className="relative">
                  <Skeleton className="h-10 sm:h-12 w-full rounded-lg" />
                  <Skeleton className="absolute right-4 top-3 sm:top-4 h-4 w-4" />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <Skeleton className="h-4 w-4 mt-1" />
                <Skeleton className="h-4 w-48 sm:w-56" />
              </div>
              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Skeleton className="h-10 w-24 sm:w-32 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
