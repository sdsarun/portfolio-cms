"use client";

import { Box } from "@/shared/layout/box";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/class-merge";

export type FormActionFooterProps = {
  isLoading?: boolean;
  isDirty?: boolean;
  onCancel?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  className?: string;
};

export function FormActionFooter({
  isLoading,
  isDirty,
  onCancel,
  saveLabel = "Save Changes",
  cancelLabel = "Cancel",
  className
}: FormActionFooterProps) {
  return (
    <Box className={cn("flex justify-end gap-2", className)}>
      <Button type="button" variant="outline" onClick={onCancel} disabled={!isDirty || isLoading}>
        {cancelLabel}
      </Button>
      <Button type="submit" isLoading={isLoading} disabled={!isDirty}>
        {saveLabel}
      </Button>
    </Box>
  );
}
