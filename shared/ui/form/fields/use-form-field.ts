"use client";

import { use } from "react";
import {
  useFormContext,
  useFormState,
  type UseFormGetFieldState,
} from "react-hook-form";
import { FormFieldContext } from "./form-field";
import { FormItemContext } from "./form-item";

export type UseFormFieldOptions = {
  skipValidationIfNoContext?: boolean;
};

export type UseFormFieldReturn = ReturnType<UseFormGetFieldState<any>> & {
  prefixId: string | undefined;
  name: string | undefined;
  formItemId: string | undefined;
  formLabelId: string | undefined;
  formErrorMessageId: string | undefined;
};

export function useFormField(
  options?: UseFormFieldOptions,
): UseFormFieldReturn {
  const { name: formFieldName } = use(FormFieldContext);
  const { id: formItemId } = use(FormItemContext);

  const formContext = useFormContext();
  const formState = useFormState({ name: formFieldName });

  if (
    (!formFieldName || !formItemId || !formContext) &&
    options?.skipValidationIfNoContext
  ) {
    return {
      prefixId: undefined,
      name: undefined,
      formItemId: undefined,
      formLabelId: undefined,
      formErrorMessageId: undefined,
      isDirty: false,
      invalid: false,
      isTouched: false,
      isValidating: false,
      error: undefined,
    };
  }

  if (!formFieldName) {
    throw new Error(
      "useFormField must be used inside a <FormField> component. Ensure that <FormField> wraps the component using useFormField.",
    );
  }

  if (!formItemId) {
    throw new Error(
      "useFormField must be used inside a <FormItem> component. Ensure that <FormItem> wraps the component using useFormField.",
    );
  }

  if (!formContext) {
    throw new Error("useFormField must be used inside a <Form> component.");
  }

  const { getFieldState } = formContext;

  const fieldState = getFieldState?.(formFieldName, formState);
  const prefixId: string = formItemId + formFieldName;

  return {
    prefixId,
    name: formFieldName,
    formItemId: prefixId ? `${prefixId}-form-item` : undefined,
    formLabelId: prefixId ? `${prefixId}-form-label` : undefined,
    formErrorMessageId: prefixId ? `${prefixId}-form-error-message` : undefined,
    ...fieldState,
  };
}
