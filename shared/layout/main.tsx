// core
import React from "react";

// ui
import { cn } from "@/shared/ui/class-merge";
import { cva, type VariantProps } from "class-variance-authority";

const mainVariants = cva("", {
  variants: {
    variant: {
      publicPage: "h-dvh flex flex-col items-center justify-center",
      authPage: "flex-1 p-6 overflow-y-auto"
    }
  },
  defaultVariants: {
    variant: "publicPage"
  }
});

export type MainProps = React.ComponentPropsWithRef<"main"> & VariantProps<typeof mainVariants>;

export function Main({ className, variant, ...props }: MainProps) {
  return <main className={cn(mainVariants({ variant }), className)} {...props} />;
}
