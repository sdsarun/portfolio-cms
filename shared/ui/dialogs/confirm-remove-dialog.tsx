"use client";

import type { ConfirmDialogProps } from "@/shared/ui/dialogs/confirm-dialog";
import { ConfirmDialog } from "@/shared/ui/dialogs/confirm-dialog";

export type ConfirmRemoveDialogProps = ConfirmDialogProps & {
  itemLabel?: string | null;
};

export function ConfirmRemoveDialog({
  itemLabel,
  description,
  ...props
}: ConfirmRemoveDialogProps) {
  const safeItemLabel = itemLabel?.trim() || "this item";

  return (
    <ConfirmDialog
      {...props}
      description={
        description ?? (
          <>
            Are you sure you want to delete <strong>{safeItemLabel}</strong>? This action cannot be
            undone.
          </>
        )
      }
    />
  );
}
