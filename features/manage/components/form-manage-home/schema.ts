import z from "zod";

export const FormManageHomeSchema = z.object({
  displayName: z.string().nullish(),
  roleName: z.string().nullish(),
  bioTitle: z.string().nullish(),
  bioDescription: z.string().nullish()
});

export type FormManageHomeValues = z.infer<typeof FormManageHomeSchema>;
