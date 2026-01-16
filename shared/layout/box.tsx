import React from "react";
import { cn } from "@/shared/ui/class-merge";
import { cva, type VariantProps } from "class-variance-authority";

const boxVariants = cva("mx-auto", {
  variants: {},
  defaultVariants: {}
});

export type BoxProps = React.ComponentPropsWithRef<"div"> &
  VariantProps<typeof boxVariants> & {
    as?: keyof React.JSX.IntrinsicElements;
  };

export function Box({ as = "div", className, ...props }: BoxProps) {
  const Comp = as as React.ElementType;
  return <Comp className={cn(boxVariants({}), className)} {...props} />;
}
