"use client";

import React from "react";
import { useFormField } from "./use-form-field";
import { cn } from "@/shared/ui/class-merge";

export type FormLabelProps = React.ComponentProps<"label"> & {
  errorClassName?: string;
  required?: boolean;
};

export default function FormLabel({
  children,
  className,
  errorClassName,
  required,
  ...props
}: FormLabelProps) {
  const { formItemId, formLabelId, invalid } = useFormField();

  return (
    <label
      id={formLabelId}
      htmlFor={formItemId}
      className={cn("block mb-2", className, {
        "text-destructive": invalid,
        [errorClassName ?? ""]: invalid
      })}
      aria-label={formLabelId}
      aria-invalid={invalid}
      {...props}
    >
      {children}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
  );
}
