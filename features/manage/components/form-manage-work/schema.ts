import z from "zod";
import { Messages } from "@/shared/constants/messages";

const monthRegex = /^\d{4}-\d{2}$/;
const imageDataUrlRegex = /^data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+$/;

const projectLinkSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  name: z.string(),
  url: z.string()
});

const attachmentRefSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  name: z.string().nullable().optional(),
  mime: z.string().nullable().optional(),
  sha: z.string().nullable().optional(),
  streamUrl: z.string().nullable().optional(),
  content: z.string().nullable().optional()
});

const projectSchema = z
  .object({
    id: z.string().uuid().nullable().optional(),
    title: z.string(),
    isInProgress: z.boolean(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
    tags: z.string(),
    imageUrl: z.string(),
    links: z.array(projectLinkSchema),
    attachments: z.array(attachmentRefSchema)
  })
  .superRefine((value, ctx) => {
    if (value.startDate && !monthRegex.test(value.startDate)) {
      ctx.addIssue({
        code: "custom",
        message: Messages.work.validation.startMonthFormat,
        path: ["startDate"]
      });
    }

    if (value.endDate && !monthRegex.test(value.endDate)) {
      ctx.addIssue({
        code: "custom",
        message: Messages.work.validation.endMonthFormat,
        path: ["endDate"]
      });
    }

    if (value.isInProgress && value.endDate) {
      ctx.addIssue({
        code: "custom",
        message: Messages.work.validation.endMonthWhenInProgress,
        path: ["endDate"]
      });
    }

    const imageUrl = value.imageUrl?.trim();
    if (imageUrl) {
      const isValidHttpUrl = z.url().safeParse(imageUrl).success;
      const isValidDataImage = imageDataUrlRegex.test(imageUrl);
      if (!isValidHttpUrl && !isValidDataImage) {
        ctx.addIssue({
          code: "custom",
          message: Messages.work.validation.imageUrlInvalid,
          path: ["imageUrl"]
        });
      }
    }

    for (const [index, link] of value.links.entries()) {
      const linkName = link.name?.trim() ?? "";
      const linkUrl = link.url?.trim() ?? "";
      const hasAnyValue = Boolean(linkName || linkUrl || link.id);

      if (!hasAnyValue) {
        continue;
      }

      if (!linkName) {
        ctx.addIssue({
          code: "custom",
          message: Messages.work.validation.linkNameRequired,
          path: ["links", index, "name"]
        });
      }

      if (!linkUrl) {
        ctx.addIssue({
          code: "custom",
          message: Messages.work.validation.linkUrlRequired,
          path: ["links", index, "url"]
        });
      } else {
        const parsed = z.url().safeParse(linkUrl);
        if (!parsed.success) {
          ctx.addIssue({
            code: "custom",
            message: Messages.work.validation.linkUrlInvalid,
            path: ["links", index, "url"]
          });
        }
      }
    }
  });

export const FormManageWorkSchema = z.object({
  projectExperiences: z.array(projectSchema)
});

export type FormManageWorkValues = z.infer<typeof FormManageWorkSchema>;
