"use client";

// core
import { useForm } from "react-hook-form";

// components
import { toast } from "@/shared/ui/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Lock } from "lucide-react";
import { SignInFormValues, SignInSchema } from "./schema";
import { Form } from "@/shared/ui/form/form";
import { FormField } from "@/shared/ui/form/fields/form-field";
import { FormItem } from "@/shared/ui/form/fields/form-item";
import { FormErrorMessage } from "@/shared/ui/form/fields/form-error-message";
import { TextInput } from "@/shared/ui/form/inputs/text";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

// hooks
import { useAction } from "@/shared/hooks/use-action";

// actions
import { signInAction } from "@/shared/actions/signin/signin-action";

export function SignInForm() {
  const { execute, isLoading } = useAction(signInAction);

  const form = useForm({
    defaultValues: { password: "" },
    resolver: zodResolver(SignInSchema)
  });

  const isLocked = false;

  const handleSubmit = async (formValues: SignInFormValues) => {
    const result = await execute(formValues);
    if (!result?.success) {
      toast.error(result?.message);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader className="text-center">
        <div
          className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
            isLocked ? "bg-destructive/10" : "bg-primary/10"
          }`}
        >
          {isLocked ?
            <AlertCircle className="h-5 w-5 text-destructive" />
          : <Lock className="h-5 w-5 text-primary" />}
        </div>
        <CardTitle>{isLocked ? "Locked" : "Portfolio CMS"}</CardTitle>
        <CardDescription>
          {isLocked ? `Security lockout active.` : "Enter your password to access"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form} onValid={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <TextInput rhfField={field} type="password" placeholder="Secret is secret" />
                  <FormErrorMessage />
                </FormItem>
              )}
            />
            <Button type="submit" isLoading={isLoading} loadingContent="Verifying...">
              Sign in
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
