"use client";

import { Box } from "@/shared/layout/box";

import { use, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import type { ActionOutput } from "@/shared/utils/action/create-action";
import type { GetProfileContactOutput } from "@/shared/actions/get-profile-contact/get-profile-contact-output";
import { upsertProfileContactAction } from "@/shared/actions/upsert-profile-contact/upsert-profile-contact-action";
import type { UpsertProfileContactActionInput } from "@/shared/actions/upsert-profile-contact/upsert-profile-contact-input";
import { useAction } from "@/shared/hooks/use-action";
import { useModalState } from "@/shared/hooks/use-modal-state";
import { UnableToFetchDataAlert } from "@/shared/ui/alert/alert-fetch-failed";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ConfirmDialog } from "@/shared/ui/dialogs/confirm-dialog";
import { Form } from "@/shared/ui/form/form";
import { FormActionFooter } from "@/shared/ui/form/form-action-footer";
import { FormErrorMessage } from "@/shared/ui/form/fields/form-error-message";
import { FormField } from "@/shared/ui/form/fields/form-field";
import { FormItem } from "@/shared/ui/form/fields/form-item";
import { FormLabel } from "@/shared/ui/form/fields/form-label";
import { TextInput } from "@/shared/ui/form/inputs/text-input";
import { MoveOrderArrowList } from "@/shared/ui/list/move-order-arrow-list";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { toast } from "@/shared/ui/sonner";
import { Messages } from "@/shared/constants/messages";
import {
  FormManageContactSchema,
  type FormManageContactValues,
  contactTypeOptions
} from "@/features/manage/components/form-manage-contact/schema";

type FormManageContactProps = {
  profileContactPromise: Promise<ActionOutput<GetProfileContactOutput>>;
};

type RemoveModalPayload = {
  index: number | null;
  label: string;
};

function createEmptyContact() {
  return {
    id: null,
    type: "email" as const,
    label: "",
    value: "",
    displayValue: ""
  };
}

function normalizeLabel(value?: string | null, fallback = "this contact"): string {
  const normalized = value?.trim();
  return normalized || fallback;
}

function removeMailToPrefix(value?: string | null): string {
  if (!value) {
    return "";
  }

  if (value.startsWith("mailto:")) {
    return value.replace(/^mailto:/, "");
  }

  return value;
}

function mapToDefaultValues(response: ActionOutput<GetProfileContactOutput>): FormManageContactValues {
  if (!response.success) {
    return {
      contacts: []
    };
  }

  return {
    contacts: response.data.contacts.map((item) => ({
      id: item.id,
      type: (item.type && contactTypeOptions.includes(item.type as (typeof contactTypeOptions)[number]) ?
        item.type
      : "other") as (typeof contactTypeOptions)[number],
      label: item.label ?? "",
      value: item.type === "email" ? removeMailToPrefix(item.value) : (item.value ?? ""),
      displayValue: item.displayValue ?? ""
    }))
  };
}

function mapToPayload(values: FormManageContactValues): UpsertProfileContactActionInput {
  return {
    contacts: (values.contacts ?? []).map((item, index) => ({
      id: item.id || undefined,
      type: item.type || null,
      label: item.label?.trim() || null,
      value: item.value?.trim() || null,
      displayValue: item.displayValue?.trim() || null,
      displayOrder: index + 1
    }))
  };
}

export function FormManageContact({ profileContactPromise }: FormManageContactProps) {
  const profileContactResponse = use(profileContactPromise);
  const { execute, isLoading } = useAction(upsertProfileContactAction);

  const defaultValues = useMemo(
    () => mapToDefaultValues(profileContactResponse),
    [profileContactResponse]
  );

  const form = useForm<FormManageContactValues>({
    resolver: zodResolver(FormManageContactSchema),
    defaultValues
  });

  const contacts = useFieldArray({
    control: form.control,
    name: "contacts"
  });

  const removeModal = useModalState<RemoveModalPayload>({
    payload: {
      index: null,
      label: ""
    }
  });

  const handleSubmit = async (values: FormManageContactValues) => {
    const result = await execute(mapToPayload(values));

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(Messages.common.toast.saved);
    form.reset(mapToDefaultValues({ success: true, data: result.data }));
  };

  if (!profileContactResponse.success) {
    return <UnableToFetchDataAlert description={profileContactResponse.message} />;
  }

  return (
    <Form form={form} onValid={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <Box>
            <CardTitle>Contact Items</CardTitle>
            <CardDescription>Control how people can reach you and in what order.</CardDescription>
          </Box>
          <Button type="button" size="sm" onClick={() => contacts.append(createEmptyContact())}>
            <Plus className="h-4 w-4" /> Add Contact
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <MoveOrderArrowList
            items={contacts.fields.map((field, index) => ({
              key: field.id,
              content: (
                <Box className="grid grid-cols-12 gap-3">
                  <FormField
                    control={form.control}
                    name={`contacts.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-3">
                        <FormLabel>Type</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                          name={field.name}
                        >
                          <SelectTrigger onBlur={field.onBlur} className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {contactTypeOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contacts.${index}.label`}
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-3">
                        <FormLabel>Label</FormLabel>
                        <TextInput rhfField={field} placeholder="GitHub, Email, Portfolio" />
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contacts.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-4">
                        <FormLabel>Value</FormLabel>
                        <TextInput rhfField={field} placeholder="name@example.com or https://..." />
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contacts.${index}.displayValue`}
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-2">
                        <FormLabel>Display Value</FormLabel>
                        <TextInput rhfField={field} placeholder="Optional" />
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />
                </Box>
              )
            }))}
            onChange={({ fromIndex, nextIndex }) => {
              contacts.swap(fromIndex, nextIndex);
            }}
            onRemove={({ index }) => {
              removeModal.open({
                index,
                label: normalizeLabel(form.getValues(`contacts.${index}.label`))
              });
            }}
          />

          {contacts.fields.length === 0 && (
            <Box className="text-sm text-muted-foreground border-2 border-dashed rounded-md p-4 text-center">
              No contact items added yet.
            </Box>
          )}

          <ConfirmDialog
            open={removeModal.state.isOpen}
            title={Messages.contact.dialog.deleteItemTitle}
            confirmLabel={Messages.common.dialog.confirmDelete}
            cancelLabel={Messages.common.dialog.cancel}
            onOpenChange={(open) => {
              if (!open) {
                removeModal.close({ index: null, label: "" });
              }
            }}
            onConfirm={() => {
              if (removeModal.state.payload.index !== null) {
                contacts.remove(removeModal.state.payload.index);
              }
              removeModal.close({ index: null, label: "" });
            }}
          />

          <FormActionFooter
            isLoading={isLoading}
            isDirty={form.formState.isDirty}
            onCancel={() => form.reset(defaultValues)}
          />
        </CardContent>
      </Card>
    </Form>
  );
}
