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
import { TextInput } from "@/shared/ui/form/inputs/text-input";
import { MoveOrderArrowList } from "@/shared/ui/move-order-arrow-list";
import { ConfirmRemoveDialog } from "@/shared/ui/confirm-remove-dialog";
import { useModalState } from "@/shared/hooks/use-modal-state";
import type { FormManageResumeValues } from "@/features/manage/components/form-manage-resume./schema";

type SkillsSectionProps = {
  form: UseFormReturn<FormManageResumeValues>;
};

function buildDefaultSkill() {
  return {
    id: null,
    categoryName: "",
    skillNames: ""
  };
}

export function SkillsSection({ form }: SkillsSectionProps) {
  const fieldArray = useFieldArray({
    control: form.control,
    name: "skills"
  });
  const removeModal = useModalState<{ index: number | null; label: string }>({
    payload: { index: null, label: "" }
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Group your tools and technologies by category.</CardDescription>
        </div>
        <Button type="button" size="sm" onClick={() => fieldArray.append(buildDefaultSkill())}>
          <Plus className="h-4 w-4" /> Add Category
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
                  name={`skills.${index}.categoryName`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-4">
                      <FormLabel>Category Name</FormLabel>
                      <TextInput rhfField={field} placeholder="Frontend, Backend, Tools" />
                      <FormErrorMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`skills.${index}.skillNames`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-8">
                      <FormLabel>Skills (comma separated)</FormLabel>
                      <TextInput rhfField={field} placeholder="React, TypeScript, Node.js" />
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
              label: (form.getValues(`skills.${index}.categoryName`) ?? "").trim() || "this category"
            });
          }}
        />

        {fieldArray.fields.length === 0 && (
          <div className="text-sm text-muted-foreground border-2 border-dashed rounded-md p-4 text-center">
            No skill categories added yet.
          </div>
        )}

        <ConfirmRemoveDialog
          open={removeModal.state.isOpen}
          title="Delete Category?"
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
