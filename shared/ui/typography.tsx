import React from "react";
import { cn } from "@/shared/ui/class-merge";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("", {
  variants: {
    variant: {
      h0: "",
      h1: "font-semibold text-base",
      h2: "font-semibold text-sm",
      body0: "",
      p0: "text-sm"
    }
  },
  defaultVariants: {
    variant: "h0"
  }
});

type TypographyProps = {
  as?: keyof React.JSX.IntrinsicElements;
  variant?: VariantProps<typeof headingVariants>["variant"];
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

function Typography({ as = "span", variant, className, children, ...props }: TypographyProps) {
  const Comp = as as React.ElementType;
  return (
    <Comp className={cn(headingVariants({ variant }), className)} {...props}>
      {children}
    </Comp>
  );
}

export { type TypographyProps, Typography };
