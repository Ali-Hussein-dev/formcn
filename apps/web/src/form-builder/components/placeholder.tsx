import { cn } from "@/lib/utils";

//======================================
export function Placeholder({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-center pt-20 text-xl max-w-sm mx-auto font-medium text-accent-foreground/80",
        className
      )}
    >
      {children}
    </div>
  );
}
