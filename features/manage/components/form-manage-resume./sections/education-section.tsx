"use client";

import { Box } from "@/shared/layout/box";

// core
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";

// components
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { FormErrorMessage } from "@/shared/ui/form/fields/form-error-message";
import { FormField } from "@/shared/ui/form/fields/form-field";
import { FormItem } from "@/shared/ui/form/fields/form-item";
import { FormLabel } from "@/shared/ui/form/fields/form-label";
import { TextInput } from "@/shared/ui/form/inputs/text-input";
import { MonthPickerInput } from "@/shared/ui/form/inputs/month-picker-input";
import { MoveOrderArrowList } from "@/shared/ui/list/move-order-arrow-list";
import { ConfirmDialog } from "@/shared/ui/dialogs/confirm-dialog";
import { useModalState } from "@/shared/hooks/use-modal-state";
import type { FormManageResumeValues } from "@/features/manage/components/form-manage-resume./schema";
import { Messages } from "@/shared/constants/messages";

type EducationSectionProps = {
  form: UseFormReturn<FormManageResumeValues>;
};

function buildDefaultEducation() {
  return {
    id: null,
    institution: "",
    startDate: ""
  };
}

export function EducationSection({ form }: EducationSectionProps) {
  const fieldArray = useFieldArray({
    control: form.control,
    name: "education"
  });
  const removeModal = useModalState<{ index: number | null; label: string }>({
    payload: { index: null, label: "" }
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <Box>
          <CardTitle>Education</CardTitle>
          <CardDescription>
            Academic institutions and start dates. End date and major are intentionally hidden in this
            phase.
          </CardDescription>
        </Box>
        <Button type="button" size="sm" onClick={() => fieldArray.append(buildDefaultEducation())}>
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <MoveOrderArrowList
          items={fieldArray.fields.map((field, index) => ({
            key: field.id,
            content: (
              <Box className="grid grid-cols-12 gap-3">
                <FormField
                  control={form.control}
                  name={`education.${index}.institution`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-8">
                      <FormLabel>Institution</FormLabel>
                      <TextInput rhfField={field} placeholder="University or School" />
                      <FormErrorMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-4">
                      <FormLabel>Start Date</FormLabel>
                      <MonthPickerInput rhfField={field} />
                      <FormErrorMessage />
                    </FormItem>
                  )}
                />
              </Box>
            )
          }))}
          onChange={({ fromIndex, nextIndex }) => {
            fieldArray.swap(fromIndex, nextIndex);
          }}
          onRemove={({ index }) => {
            removeModal.open({
              index,
              label:
                (form.getValues(`education.${index}.institution`) ?? "").trim() || "this education item"
            });
          }}
        />

        {fieldArray.fields.length === 0 && (
          <Box className="text-sm text-muted-foreground border-2 border-dashed rounded-md p-4 text-center">
            No education entries added yet.
          </Box>
        )}

        <ConfirmDialog
          open={removeModal.state.isOpen}
          title={Messages.resume.dialog.deleteEducationTitle}
          confirmLabel={Messages.common.dialog.confirmDelete}
          cancelLabel={Messages.common.dialog.cancel}
          onOpenChange={(open) => {
            if (!open) {
              removeModal.close({ index: null, label: "" });
            }
          }}
          onConfirm={() => {
            if (removeModal.state.payload.index !== null) {
              fieldArray.remove(removeModal.state.payload.index);
            }
            removeModal.close({ index: null, label: "" });
          }}
        />
      </CardContent>
    </Card>
  );
}
