"use client";

// core
import { type ControllerRenderProps } from "react-hook-form";

// components
import { TextArea } from "@/shared/ui/textarea";

// hooks
import { useFormField } from "@/shared/ui/form/fields/use-form-field";

export type TextAreaInputProps = React.ComponentPropsWithRef<typeof TextArea> & {
  rhfField?: ControllerRenderProps<any, any>;
};

export function TextAreaInput({
  id,
  name,
  ref,
  onChange,
  onBlur,
  disabled,
  rhfField,
  value,
  ...props
}: TextAreaInputProps) {
  const { invalid, formItemId } = useFormField({ skipValidationIfNoContext: true });
  return (
    <TextArea
      id={id ?? formItemId}
      name={name ?? rhfField?.name}
      ref={ref ?? rhfField?.ref}
      onChange={onChange ?? rhfField?.onChange}
      onBlur={onBlur ?? rhfField?.onBlur}
      disabled={disabled ?? rhfField?.disabled}
      value={value ?? rhfField?.value ?? ""}
      aria-invalid={invalid}
      {...props}
    />
  );
}
