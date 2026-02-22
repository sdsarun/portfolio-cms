"use client";

import { type CheckedState } from "@radix-ui/react-checkbox";
import { type ControllerRenderProps } from "react-hook-form";

import { Checkbox } from "@/shared/ui/checkbox";
import { useFormField } from "@/shared/ui/form/fields/use-form-field";

export type CheckboxInputProps = Omit<React.ComponentProps<typeof Checkbox>, "checked" | "onCheckedChange"> & {
  rhfField?: ControllerRenderProps<any, any>;
  checked?: boolean;
  onCheckedChange?: (checked: CheckedState) => void;
};

export function CheckboxInput({
  id,
  name,
  disabled,
  rhfField,
  checked,
  onCheckedChange,
  ...props
}: CheckboxInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });

  return (
    <Checkbox
      id={id ?? formItemId}
      name={name ?? rhfField?.name}
      disabled={disabled ?? rhfField?.disabled}
      checked={checked ?? Boolean(rhfField?.value)}
      onCheckedChange={onCheckedChange ?? rhfField?.onChange}
      aria-invalid={invalid}
      {...props}
    />
  );
}
