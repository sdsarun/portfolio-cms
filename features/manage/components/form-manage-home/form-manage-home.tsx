"use client";

// core
import { use } from "react";
import { useForm } from "react-hook-form";

// components
import { toast } from "@/shared/ui/sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { FormField } from "@/shared/ui/form/fields/form-field";
import { Form } from "@/shared/ui/form/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItem } from "@/shared/ui/form/fields/form-item";
import { FormLabel } from "@/shared/ui/form/fields/form-label";
import { TextInput } from "@/shared/ui/form/inputs/text-input";
import { FormErrorMessage } from "@/shared/ui/form/fields/form-error-message";
import { TextAreaInput } from "@/shared/ui/form/inputs/text-area-input";
import { UnableToFetchDataAlert } from "@/shared/ui/alert/alert-fetch-failed";
import { FormActionFooter } from "@/shared/ui/form/form-action-footer";

// hooks
import { useAction } from "@/shared/hooks/use-action";

// actions
import { updateHomeAction } from "@/shared/actions/update-home/update-home-action";
import type { GetProfileInfoOutput } from "@/shared/actions/get-profile-info/get-profile-info-output";

// schema
import {
  FormManageHomeSchema,
  type FormManageHomeValues
} from "@/features/manage/components/form-manage-home/schema";
import type { ActionOutput } from "@/shared/utils/action/create-action";

type FormManageHomeProps = {
  profileInfoPromise: Promise<ActionOutput<GetProfileInfoOutput>>;
};

export function FormManageHome({ profileInfoPromise }: FormManageHomeProps) {
  const profileInfoResponse = use(profileInfoPromise);
  const { execute, isLoading } = useAction(updateHomeAction);
  const defaultValues: FormManageHomeValues =
    profileInfoResponse.success ?
      {
        bioDescription: profileInfoResponse.data.profile.bioDescription,
        bioTitle: profileInfoResponse.data.profile.bioTitle,
        displayName: profileInfoResponse.data.profile.displayName,
        roleName: profileInfoResponse.data.profile.roleName
      }
    : {
        bioDescription: undefined,
        bioTitle: undefined,
        displayName: undefined,
        roleName: undefined
      };

  const form = useForm<FormManageHomeValues>({
    resolver: zodResolver(FormManageHomeSchema),
    defaultValues
  });

  const handleSubmit = async (formValues: FormManageHomeValues) => {
    const result = await execute(formValues);
    if (result.success) {
      toast.success("Your changes have been saved");
    } else {
      toast.error(result.message);
    }
  };

  if (!profileInfoResponse.success) {
    return <UnableToFetchDataAlert description={profileInfoResponse.message} />;
  }

  return (
    <Form form={form} onValid={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Home Content</CardTitle>
          <CardDescription>Edit the content displayed on your home page.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-3">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Display Name</FormLabel>
                <TextInput rhfField={field} />
                <FormErrorMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roleName"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Job Title / Role</FormLabel>
                <TextInput rhfField={field} />
                <FormErrorMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bioTitle"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Bio Title</FormLabel>
                <TextInput rhfField={field} />
                <FormErrorMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bioDescription"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Bio</FormLabel>
                <TextAreaInput rhfField={field} />
                <FormErrorMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <FormActionFooter
          className="px-6"
          isLoading={isLoading}
          isDirty={form.formState.isDirty}
          onCancel={() => form.reset(defaultValues)}
        />
      </Card>
    </Form>
  );
}
