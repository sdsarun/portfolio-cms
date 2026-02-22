"use client";

import { Box } from "@/shared/layout/box";

import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAction } from "@/shared/hooks/use-action";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Form } from "@/shared/ui/form/form";
import { FormErrorMessage } from "@/shared/ui/form/fields/form-error-message";
import { FormField } from "@/shared/ui/form/fields/form-field";
import { FormItem } from "@/shared/ui/form/fields/form-item";
import { FormLabel } from "@/shared/ui/form/fields/form-label";
import { PasswordInput } from "@/shared/ui/form/inputs/password-input";
import { Separator } from "@/shared/ui/separator";
import { toast } from "@/shared/ui/sonner";
import { Typography } from "@/shared/ui/typography";
import { updatePasswordAction } from "@/shared/actions/update-password/update-password-action";
import { Messages } from "@/shared/constants/messages";
import {
  FormManageSettingsSchema,
  type FormManageSettingsValues
} from "@/features/manage/components/form-manage-settings/schema";

const defaultValues: FormManageSettingsValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
};

export function FormManageSettings() {
  const { execute, isLoading } = useAction(updatePasswordAction);

  const form = useForm<FormManageSettingsValues>({
    resolver: zodResolver(FormManageSettingsSchema),
    defaultValues
  });

  const handleSubmit = async (values: FormManageSettingsValues) => {
    const result = await execute({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.data.message || Messages.settings.toast.passwordUpdatedFallback);
    form.reset(defaultValues);
  };

  return (
    <Form form={form} onValid={handleSubmit}>
      <Box className="space-y-6">
        <Separator />

        <Box className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/6">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              <Button
                type="button"
                variant="ghost"
                className="justify-start bg-muted hover:bg-muted font-semibold w-full"
              >
                <Lock className="mr-2 h-4 w-4" />
                Security
              </Button>
            </nav>
          </aside>

          <Box className="flex-1">
            <Box className="max-w-4xl space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password securely. Please use a strong password including numbers and symbols.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <PasswordInput
                          rhfField={field}
                          placeholder="Enter current password"
                          toggleLabel="Toggle current password visibility"
                        />
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <Box className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <PasswordInput
                            rhfField={field}
                            placeholder="Enter new password"
                            toggleLabel="Toggle new password visibility"
                          />
                          <FormErrorMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <PasswordInput
                            rhfField={field}
                            placeholder="Confirm new password"
                            toggleLabel="Toggle confirm password visibility"
                          />
                          <FormErrorMessage />
                        </FormItem>
                      )}
                    />
                  </Box>

                  <Typography as="p" className="text-[0.8rem] text-muted-foreground">
                    Password must be at least 6 characters long.
                  </Typography>
                </CardContent>

                <CardFooter className="border-t bg-muted/50 px-6 py-4">
                  <Box className="flex w-full items-center justify-between gap-4">
                    <Typography as="p" className="text-xs text-muted-foreground">
                      Your password is encrypted and secure.
                    </Typography>
                    <Box className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset(defaultValues)}
                        disabled={!form.formState.isDirty || isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        loadingContent="Updating..."
                        disabled={!form.formState.isDirty}
                      >
                        Update Password
                      </Button>
                    </Box>
                  </Box>
                </CardFooter>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </Form>
  );
}
