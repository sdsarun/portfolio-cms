"use client";

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
import { CheckboxInput } from "@/shared/ui/form/inputs/checkbox-input";
import { TextAreaInput } from "@/shared/ui/form/inputs/text-area-input";
import { TextInput } from "@/shared/ui/form/inputs/text-input";
import { MonthPickerInput } from "@/shared/ui/form/inputs/month-picker-input";
import { MoveOrderArrowList } from "@/shared/ui/move-order-arrow-list";
import { ConfirmRemoveDialog } from "@/shared/ui/confirm-remove-dialog";
import { useModalState } from "@/shared/hooks/use-modal-state";
import type { FormManageResumeValues } from "@/features/manage/components/form-manage-resume./schema";

type ExperienceSectionProps = {
  form: UseFormReturn<FormManageResumeValues>;
};

function buildDefaultExperience() {
  return {
    id: null,
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: ""
  };
}

export function ExperienceSection({ form }: ExperienceSectionProps) {
  const fieldArray = useFieldArray({
    control: form.control,
    name: "workExperiences"
  });
  const removeModal = useModalState<{ index: number | null; label: string }>({
    payload: { index: null, label: "" }
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Professional history and achievements.</CardDescription>
        </div>
        <Button type="button" size="sm" onClick={() => fieldArray.append(buildDefaultExperience())}>
          <Plus className="h-4 w-4" /> Add Role
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <MoveOrderArrowList
          items={fieldArray.fields.map((field, index) => ({
            key: field.id,
            content: (
              <div className="grid grid-cols-12 gap-3">
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.jobTitle`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6">
                      <FormLabel>Job Title</FormLabel>
                      <TextInput rhfField={field} />
                      <FormErrorMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.companyName`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6">
                      <FormLabel>Company</FormLabel>
                      <TextInput rhfField={field} />
                      <FormErrorMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6">
                      <FormLabel>Start Date</FormLabel>
                      <MonthPickerInput rhfField={field} />
                      <FormErrorMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6">
                      <FormLabel>End Date</FormLabel>
                      <MonthPickerInput
                        rhfField={field}
                        disabled={form.watch(`workExperiences.${index}.isCurrent`)}
                      />
                      <FormErrorMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.isCurrent`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 inline-flex items-center gap-2 text-sm">
                      <CheckboxInput
                        checked={Boolean(field.value)}
                        onCheckedChange={(checked) => {
                          const isChecked = checked === true;
                          field.onChange(isChecked);
                          if (isChecked) {
                            form.setValue(`workExperiences.${index}.endDate`, "", {
                              shouldDirty: true,
                              shouldValidate: true
                            });
                          }
                        }}
                      />
                      <FormLabel className="mb-0">Current Role</FormLabel>
                      <FormErrorMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Description</FormLabel>
                      <TextAreaInput rhfField={field} rows={4} placeholder="One bullet point per line" />
                      <FormErrorMessage />
                    </FormItem>
                  )}
                />
              </div>
            )
          }))}
          onChange={({ fromIndex, nextIndex }) => {
            fieldArray.swap(fromIndex, nextIndex);
          }}
          onRemove={({ index }) => {
            removeModal.open({
              index,
              label: (form.getValues(`workExperiences.${index}.jobTitle`) ?? "").trim() || "this role"
            });
          }}
        />

        {fieldArray.fields.length === 0 && (
          <div className="text-sm text-muted-foreground border-2 border-dashed rounded-md p-4 text-center">
            No work experience added yet.
          </div>
        )}

        <ConfirmRemoveDialog
          open={removeModal.state.isOpen}
          title="Delete Role?"
          itemLabel={removeModal.state.payload.label}
          confirmLabel="Delete"
          cancelLabel="Cancel"
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
