"use client";

import { createContext } from "react";
import { Controller, type FieldPath, type FieldValues, type ControllerProps } from "react-hook-form";

export type FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = ControllerProps<TFieldValues, TName>;

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

export const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldContext value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext>
  );
}
