import z from "zod";

const MONTH_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;

const monthField = z
  .string()
  .trim()
  .refine((value) => value === "" || MONTH_REGEX.test(value), {
    message: "Invalid month format"
  });

const nullableText = z.string();

export const FormManageResumeSchema = z.object({
  resumeUrl: z
    .string()
    .trim()
    .refine((value) => value === "" || z.url().safeParse(value).success, {
      message: "Resume URL must be a valid URL"
    }),
  workExperiences: z
    .array(
      z
        .object({
          id: z.string().optional().nullable(),
          jobTitle: nullableText,
          companyName: nullableText,
          startDate: monthField,
          endDate: monthField,
          isCurrent: z.boolean().default(false),
          description: nullableText
        })
        .refine((item) => !(item.isCurrent && item.endDate), {
          message: "End month must be empty when current role is enabled",
          path: ["endDate"]
        })
    )
    .default([]),
  skills: z
    .array(
      z.object({
        id: z.string().optional().nullable(),
        categoryName: nullableText,
        skillNames: nullableText
      })
    )
    .default([]),
  education: z
    .array(
      z.object({
        id: z.string().optional().nullable(),
        institution: nullableText,
        startDate: monthField
      })
    )
    .default([]),
  certification: z
    .array(
      z.object({
        id: z.string().optional().nullable(),
        name: nullableText,
        issuer: nullableText,
        completeDate: monthField
      })
    )
    .default([])
});

export type FormManageResumeValues = z.input<typeof FormManageResumeSchema>;
