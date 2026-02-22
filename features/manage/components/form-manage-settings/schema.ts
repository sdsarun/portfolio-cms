import z from "zod";
import { Messages } from "@/shared/constants/messages";

export const FormManageSettingsSchema = z
  .object({
    oldPassword: z.string().min(1, Messages.settings.validation.currentPasswordRequired),
    newPassword: z.string().min(1, Messages.settings.validation.newPasswordRequired),
    confirmPassword: z.string().min(1, Messages.settings.validation.confirmPasswordRequired)
  })
  .superRefine((value, ctx) => {
    if (value.oldPassword === value.newPassword) {
      ctx.addIssue({
        code: "custom",
        message: Messages.settings.validation.newPasswordMustDiffer,
        path: ["newPassword"]
      });
    }

    if (value.newPassword !== value.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: Messages.settings.validation.passwordsDoNotMatch,
        path: ["confirmPassword"]
      });
    }
  });

export type FormManageSettingsValues = z.infer<typeof FormManageSettingsSchema>;
