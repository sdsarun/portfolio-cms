import z from "zod";

export const contactTypeOptions = ["email", "link", "other"] as const;

const contactSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  type: z.enum(contactTypeOptions),
  label: z.string(),
  value: z.string(),
  displayValue: z.string()
});

export const FormManageContactSchema = z.object({
  contacts: z.array(contactSchema)
});

export type FormManageContactValues = z.infer<typeof FormManageContactSchema>;
