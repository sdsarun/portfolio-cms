"use client";

import type { ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/dialog";

export type ConfirmRemoveDialogProps = {
  open: boolean;
  title?: string;
  itemLabel?: string | null;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirmLoading?: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
};

export function ConfirmRemoveDialog({
  open,
  title = "Delete Item?",
  itemLabel,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isConfirmLoading,
  onConfirm,
  onOpenChange
}: ConfirmRemoveDialogProps) {
  const safeItemLabel = itemLabel?.trim() || "this item";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description ?? (
              <>
                Are you sure you want to delete <strong>{safeItemLabel}</strong>? This action cannot be
                undone.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            isLoading={isConfirmLoading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
