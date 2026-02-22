"use client";

import { type ControllerRenderProps } from "react-hook-form";

import { MonthPicker, type MonthPickerProps } from "@/shared/ui/month-picker";
import { useFormField } from "@/shared/ui/form/fields/use-form-field";
import { cn } from "@/shared/ui/class-merge";

export type MonthPickerInputProps = Omit<MonthPickerProps, "value" | "onChange"> & {
  rhfField?: ControllerRenderProps<any, any>;
  value?: string;
  onChange?: (value: string) => void;
};

export function MonthPickerInput({
  rhfField,
  value,
  onChange,
  disabled,
  className,
  ...props
}: MonthPickerInputProps) {
  const { invalid } = useFormField({ skipValidationIfNoContext: true });

  const resolvedValue = value ?? rhfField?.value ?? "";

  return (
    <MonthPicker
      value={resolvedValue}
      onChange={onChange ?? rhfField?.onChange}
      disabled={disabled ?? rhfField?.disabled}
      className={cn(className, invalid && "aria-invalid:border-destructive")}
      {...props}
    />
  );
}
