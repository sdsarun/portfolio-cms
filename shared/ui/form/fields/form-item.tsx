"use client";

import { Box } from "@/shared/layout/box";

import React, { createContext, useId } from "react";

export type FormItemProps = React.ComponentProps<"div">;

export type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export function FormItem({ children, ...props }: FormItemProps) {
  const formItemId = useId();
  return (
    <FormItemContext value={{ id: formItemId }}>
      <Box data-slot="form-item" {...props}>
        {children}
      </Box>
    </FormItemContext>
  );
}
