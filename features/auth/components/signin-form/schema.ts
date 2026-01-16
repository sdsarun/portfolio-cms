import z from "zod/v4";

export const SignInSchema = z.object({
  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .max(10000, "Password is too long"),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;
