"use client";

// core
import { type ControllerRenderProps } from "react-hook-form";

// components
import { Input } from "@/shared/ui/input";
import { useFormField } from "@/shared/ui/form/fields/use-form-field";

export type TextInputProps = React.ComponentPropsWithRef<typeof Input> & {
  rhfField?: ControllerRenderProps<any, any>;
};

export function TextInput({
  id,
  name,
  ref,
  onChange,
  onBlur,
  disabled,
  rhfField,
  value,
  ...props
}: TextInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });
  return (
    <Input
      id={id ?? formItemId}
      name={name ?? rhfField?.name}
      ref={ref ?? rhfField?.ref}
      onChange={onChange ?? rhfField?.onChange}
      onBlur={onBlur ?? rhfField?.onBlur}
      disabled={disabled ?? rhfField?.disabled}
      value={value ?? rhfField?.value}
      aria-invalid={invalid}
      {...props}
    />
  );
}
