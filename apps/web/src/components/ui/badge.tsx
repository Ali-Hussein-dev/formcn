import * as React from "react";
import { Slot, type SlotProps } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = Omit<React.ComponentProps<"span">, "popover"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    popover?: SlotProps["popover"];
  };

function Badge({
  className,
  variant,
  asChild = false,
  popover,
  ...props
}: BadgeProps) {
  const classes = cn(badgeVariants({ variant }), className);
  const { ref, ...restProps } = props;

  if (asChild) {
    return (
      <Slot
        data-slot="badge"
        className={classes}
        popover={popover}
        {...restProps}
      />
    );
  }

  return (
    <span data-slot="badge" className={classes} ref={ref} {...restProps} />
  );
}

export { Badge, badgeVariants };
