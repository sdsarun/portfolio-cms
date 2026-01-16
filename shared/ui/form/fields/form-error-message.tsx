"use client";

import React from "react";
import { useFormField } from "./use-form-field";
import { cn } from "@/shared/ui/class-merge";

export type FormErrorMessageProps = React.ComponentProps<"p"> & {
  errorClassName?: string;
};

export function FormErrorMessage({ className, errorClassName, ...props }: FormErrorMessageProps) {
  const { formErrorMessageId, invalid, error } = useFormField();

  if (!invalid) {
    return null;
  }

  return (
    <p
      id={formErrorMessageId}
      className={cn(
        "text-sm font-medium text-destructive flex items-center gap-1 mt-2 ml-1",
        className,
        {
          "text-destructive": invalid,
          [errorClassName ?? ""]: invalid
        }
      )}
      aria-invalid={invalid}
      aria-errormessage={error?.message}
      {...props}
    >
      {error?.message}
    </p>
  );
}
