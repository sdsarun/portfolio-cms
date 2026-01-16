"use client";

import React, { useId } from "react";
import {
  FormProvider,
  type FieldValues,
  type FormProviderProps,
  type UseFormHandleSubmit
} from "react-hook-form";

export type FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> = React.PropsWithChildren<{
  form: Omit<FormProviderProps<TFieldValues, TContext, TTransformedValues>, "children">;
  onValid: Parameters<UseFormHandleSubmit<TFieldValues, TTransformedValues>>[0];
  onInValid?: Parameters<UseFormHandleSubmit<TFieldValues, TTransformedValues>>[1];
  withFormElement?: boolean;
}>;

export function Form<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>({
  children,
  onValid,
  onInValid,
  withFormElement = true,
  form
}: FormProps<TFieldValues, TContext, TTransformedValues>) {
  const formId = useId();
  return (
    <FormProvider {...form}>
      {withFormElement ? (
        <form data-slot="form" id={`${formId}-form`} onSubmit={form.handleSubmit(onValid, onInValid)}>
          {children}
        </form>
      ) : (
        <>{children}</>
      )}
    </FormProvider>
  );
}
