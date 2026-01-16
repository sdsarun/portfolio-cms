// core
import React from "react";

// ui
import { cn } from "@/shared/ui/class-merge";
import { cva, type VariantProps } from "class-variance-authority";

const headerVariants = cva("mx-auto", {
  variants: {},
  defaultVariants: {}
});

export type HeaderProps = React.ComponentPropsWithRef<"header"> & VariantProps<typeof headerVariants>;

export function Header({ className, ...props }: HeaderProps) {
  return <header className={cn(headerVariants({}), className)} {...props} />;
}
