// core
import React from "react";

// ui
import { cn } from "@/shared/ui/class-merge";
import { cva, type VariantProps } from "class-variance-authority";

const mainVariants = cva("", {
  variants: {
    variants: {
      publicPage: "h-dvh flex flex-col items-center justify-center",
      authPage: "flex-1 overflow-y-auto"
    }
  },
  defaultVariants: {
    variants: "publicPage"
  }
});

export type MainProps = React.ComponentPropsWithRef<"main"> & VariantProps<typeof mainVariants>;

export function Main({ className, variants, ...props }: MainProps) {
  return <main className={cn(mainVariants({ variants }), className)} {...props} />;
}
