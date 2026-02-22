"use client";

// core
import { type UseFormReturn } from "react-hook-form";
import { Link as LinkIcon } from "lucide-react";

// components
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { FormErrorMessage } from "@/shared/ui/form/fields/form-error-message";
import { FormField } from "@/shared/ui/form/fields/form-field";
import { FormItem } from "@/shared/ui/form/fields/form-item";
import { FormLabel } from "@/shared/ui/form/fields/form-label";
import { TextInput } from "@/shared/ui/form/inputs/text-input";
import type { FormManageResumeValues } from "@/features/manage/components/form-manage-resume./schema";

type ResumeUrlSectionProps = {
  form: UseFormReturn<FormManageResumeValues>;
};

export function ResumeUrlSection({ form }: ResumeUrlSectionProps) {
  const resumeUrl = form.watch("resumeUrl") ?? "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume File</CardTitle>
        <CardDescription>Provide a link to your downloadable PDF resume.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="resumeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PDF URL</FormLabel>
              <div className="flex items-center gap-2">
                <TextInput
                  rhfField={field}
                  placeholder="https://example.com/my-resume.pdf"
                  className="flex-1"
                />
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={resumeUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={!resumeUrl ? "pointer-events-none opacity-50" : ""}
                    title="Open Link"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <FormErrorMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
