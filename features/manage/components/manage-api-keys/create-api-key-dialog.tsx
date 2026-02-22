"use client";

import { Box } from "@/shared/layout/box";

import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { createApiKeyAction } from "@/shared/actions/create-api-key/create-api-key-action";
import { useAction } from "@/shared/hooks/use-action";
import { Messages } from "@/shared/constants/messages";
import { Button } from "@/shared/ui/button";
import { CodeBlock } from "@/shared/ui/codeblock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/shared/ui/dialog";
import { Form } from "@/shared/ui/form/form";
import { FormField } from "@/shared/ui/form/fields/form-field";
import { FormItem } from "@/shared/ui/form/fields/form-item";
import { FormLabel } from "@/shared/ui/form/fields/form-label";
import { FormErrorMessage } from "@/shared/ui/form/fields/form-error-message";
import { TextInput } from "@/shared/ui/form/inputs/text-input";
import { toast } from "@/shared/ui/sonner";
import { Typography } from "@/shared/ui/typography";

const CreateApiKeyDialogSchema = z.object({
  name: z.string().trim().min(1, Messages.apiKeys.validation.nameRequired),
  generatedApiKey: z.string().nullable(),
  isCopied: z.boolean()
});

type CreateApiKeyDialogValues = z.infer<typeof CreateApiKeyDialogSchema>;

export type CreateApiKeyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => Promise<void> | void;
};

export function CreateApiKeyDialog({ open, onOpenChange, onCreated }: CreateApiKeyDialogProps) {
  const { execute: createApiKey, isLoading: isCreating } = useAction(createApiKeyAction);
  const copiedIconTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const form = useForm<CreateApiKeyDialogValues>({
    resolver: zodResolver(CreateApiKeyDialogSchema),
    defaultValues: {
      name: "",
      generatedApiKey: null,
      isCopied: false
    }
  });
  const generatedApiKey = useWatch({ control: form.control, name: "generatedApiKey" });
  const isCopied = useWatch({ control: form.control, name: "isCopied" });

  const handleCreate = async (values: CreateApiKeyDialogValues) => {
    const normalizedName = values.name.trim();
    const result = await createApiKey({ name: normalizedName });
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    form.setValue("generatedApiKey", result.data.apiKey, { shouldDirty: false });
    form.setValue("isCopied", false, { shouldDirty: false });
    form.setValue("name", "", { shouldDirty: false });
    toast.success(Messages.apiKeys.toast.created);
    await onCreated?.();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      if (copiedIconTimeoutRef.current) {
        clearTimeout(copiedIconTimeoutRef.current);
        copiedIconTimeoutRef.current = null;
      }
      form.reset({ name: "", generatedApiKey: null, isCopied: false });
    }
    onOpenChange(nextOpen);
  };

  useEffect(() => {
    if (open) {
      form.reset({ name: "", generatedApiKey: null, isCopied: false });
    } else if (copiedIconTimeoutRef.current) {
      clearTimeout(copiedIconTimeoutRef.current);
      copiedIconTimeoutRef.current = null;
    }
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Form form={form} onValid={handleCreate} withFormElement={false}>
        <DialogContent>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleCreate)}>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Create a new API key. You can only view the generated secret once.
              </DialogDescription>
            </DialogHeader>

            {!generatedApiKey && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Name</FormLabel>
                    <TextInput rhfField={field} placeholder="Portfolio Frontend" />
                    <FormErrorMessage />
                  </FormItem>
                )}
              />
            )}

            {generatedApiKey && (
              <Box className="rounded-md border p-3 space-y-2">
                <Typography as="p" className="text-sm text-muted-foreground">
                  Copy this key now. It will not be shown again.
                </Typography>
                <CodeBlock
                  value={generatedApiKey}
                  isCopied={isCopied}
                  onCopy={async () => {
                    try {
                      await navigator.clipboard.writeText(generatedApiKey);
                      form.setValue("isCopied", true, { shouldDirty: false });
                      if (copiedIconTimeoutRef.current) {
                        clearTimeout(copiedIconTimeoutRef.current);
                      }
                      copiedIconTimeoutRef.current = setTimeout(() => {
                        form.setValue("isCopied", false, { shouldDirty: false });
                        copiedIconTimeoutRef.current = null;
                      }, 1500);
                      toast.success(Messages.apiKeys.toast.copied);
                    } catch {
                      toast.error(Messages.apiKeys.toast.copyFailed);
                    }
                  }}
                />
              </Box>
            )}

            <DialogFooter>
              {!generatedApiKey ?
                <Button type="submit" isLoading={isCreating}>
                  Create Key
                </Button>
              : <Button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                  }}
                >
                  Done
                </Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
