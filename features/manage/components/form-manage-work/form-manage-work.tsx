"use client";

// core
import { use, useMemo, useRef } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { ImageUp, Plus, Trash2, Upload } from "lucide-react";
import { Box } from "@/shared/layout/box";
import { useModalState } from "@/shared/hooks/use-modal-state";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ConfirmDialog } from "@/shared/ui/dialogs/confirm-dialog";
import { UnableToFetchDataAlert } from "@/shared/ui/alert/alert-fetch-failed";
import { Form } from "@/shared/ui/form/form";
import { FormActionFooter } from "@/shared/ui/form/form-action-footer";
import { FormErrorMessage } from "@/shared/ui/form/fields/form-error-message";
import { FormField } from "@/shared/ui/form/fields/form-field";
import { FormItem } from "@/shared/ui/form/fields/form-item";
import { FormLabel } from "@/shared/ui/form/fields/form-label";
import { CheckboxInput } from "@/shared/ui/form/inputs/checkbox-input";
import { MonthPickerInput } from "@/shared/ui/form/inputs/month-picker-input";
import { useAction } from "@/shared/hooks/use-action";
import { TextAreaInput } from "@/shared/ui/form/inputs/text-area-input";
import { TextInput } from "@/shared/ui/form/inputs/text-input";
import { Image } from "@/shared/ui/image";
import { MoveOrderArrowList } from "@/shared/ui/list/move-order-arrow-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Typography } from "@/shared/ui/typography";
import { toast } from "@/shared/ui/sonner";
import {
  FormManageWorkSchema,
  type FormManageWorkValues
} from "@/features/manage/components/form-manage-work/schema";
import { Messages } from "@/shared/constants/messages";

// actions
import { upsertProfileWorkAction } from "@/shared/actions/upsert-profile-work/upsert-profile-work-action";
import type { ActionOutput } from "@/shared/utils/action/create-action";
import type { GetProfileWorkOutput } from "@/shared/actions/get-profile-work/get-profile-work-output";
import type { UpsertProfileWorkActionInput } from "@/shared/actions/upsert-profile-work/upsert-profile-work-input";
import Link from "next/link";

type FormManageWorkProps = {
  profileWorkPromise: Promise<ActionOutput<GetProfileWorkOutput>>;
};

type RemoveModalPayload = {
  index: number | null;
  label: string;
};

type RemoveLinkModalPayload = {
  projectIndex: number | null;
  linkIndex: number | null;
};

type RemoveImageModalPayload = {
  projectIndex: number | null;
};

type ProjectAttachmentFormValue =
  FormManageWorkValues["projectExperiences"][number]["attachments"][number];
const MAX_ATTACHMENT_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export function FormManageWork({ profileWorkPromise }: FormManageWorkProps) {
  const profileWorkResponse = use(profileWorkPromise);
  const { execute, isLoading } = useAction(upsertProfileWorkAction);

  const imageInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const defaultValues = useMemo(() => mapToDefaultValues(profileWorkResponse), [profileWorkResponse]);

  const form = useForm<FormManageWorkValues>({
    resolver: zodResolver(FormManageWorkSchema),
    defaultValues
  });

  const projects = useFieldArray({
    control: form.control,
    name: "projectExperiences"
  });
  const watchedProjects = useWatch({
    control: form.control,
    name: "projectExperiences"
  });

  const removeModal = useModalState<RemoveModalPayload>({
    payload: {
      index: null,
      label: ""
    }
  });
  const removeLinkModal = useModalState<RemoveLinkModalPayload>({
    payload: {
      projectIndex: null,
      linkIndex: null
    }
  });
  const removeImageModal = useModalState<RemoveImageModalPayload>({
    payload: {
      projectIndex: null
    }
  });

  const handleAddProject = () => {
    projects.append(createEmptyProject());
  };

  const handleAddLink = (projectIndex: number) => {
    const currentLinks = form.getValues(`projectExperiences.${projectIndex}.links`) ?? [];
    form.setValue(
      `projectExperiences.${projectIndex}.links`,
      [...currentLinks, { id: null, name: "", url: "" }],
      {
        shouldDirty: true
      }
    );
  };

  const handleRemoveLink = (projectIndex: number, linkIndex: number) => {
    const currentLinks = form.getValues(`projectExperiences.${projectIndex}.links`) ?? [];
    const nextLinks = currentLinks.filter((_, index) => index !== linkIndex);

    form.setValue(`projectExperiences.${projectIndex}.links`, nextLinks, {
      shouldDirty: true,
      shouldValidate: true
    });
  };

  const openProjectImagePicker = (projectFieldId: string) => {
    imageInputRefs.current[projectFieldId]?.click();
  };

  const handleProjectImageFileChange = async (
    projectIndex: number,
    onImageChange: (value: string) => void,
    file: File
  ) => {
    if (file.size > MAX_ATTACHMENT_FILE_SIZE_BYTES) {
      toast.error(Messages.work.validation.attachmentMaxSize);
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const base64Content = extractBase64FromDataUrl(dataUrl);
      const computedSha = await sha256HexFromBase64(base64Content);

      const currentAttachments = form.getValues(`projectExperiences.${projectIndex}.attachments`) ?? [];
      const currentPrimaryAttachment = currentAttachments[0];

      const nextAttachment: ProjectAttachmentFormValue = {
        id: currentPrimaryAttachment?.id ?? null,
        name: file.name || currentPrimaryAttachment?.name || "project-image",
        mime: file.type || currentPrimaryAttachment?.mime || null,
        sha: computedSha,
        streamUrl: currentPrimaryAttachment?.streamUrl ?? null,
        content: base64Content
      };

      form.setValue(`projectExperiences.${projectIndex}.attachments`, [nextAttachment], {
        shouldDirty: true,
        shouldValidate: true
      });
      onImageChange(dataUrl);
    } catch {
      toast.error("Failed to read image file");
    }
  };

  const handleSubmit = async (values: FormManageWorkValues) => {
    const result = await execute(mapToPayload(values));

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(Messages.common.toast.saved);
    form.reset(mapToDefaultValues({ success: true, data: result.data }));
  };

  if (!profileWorkResponse.success) {
    return <UnableToFetchDataAlert description={profileWorkResponse.message} />;
  }

  return (
    <Form form={form} onValid={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <Box>
            <CardTitle>Work Projects</CardTitle>
            <CardDescription>
              Manage your project portfolio, ordering, and project links.
            </CardDescription>
          </Box>
          <Button type="button" size="sm" onClick={handleAddProject}>
            <Plus className="h-4 w-4" /> Add Project
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <MoveOrderArrowList
            items={projects.fields.map((projectField, projectIndex) => ({
              key: projectField.id,
              content: (
                <Box className="grid grid-cols-12 gap-3">
                  <FormField
                    control={form.control}
                    name={`projectExperiences.${projectIndex}.title`}
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Project Title</FormLabel>
                        <TextInput rhfField={field} placeholder="Project name" />
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projectExperiences.${projectIndex}.isInProgress`}
                    render={({ field }) => (
                      <FormItem className="col-span-12 flex items-center justify-center md:justify-start gap-2">
                        <CheckboxInput
                          checked={Boolean(field.value)}
                          onCheckedChange={(checked) => {
                            const nextValue = checked === true;
                            field.onChange(nextValue);
                            if (nextValue) {
                              form.setValue(`projectExperiences.${projectIndex}.endDate`, "", {
                                shouldDirty: true,
                                shouldValidate: true
                              });
                            }
                          }}
                        />
                        <FormLabel className="mb-0">In Progress</FormLabel>
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projectExperiences.${projectIndex}.startDate`}
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-6">
                        <FormLabel>Start Month</FormLabel>
                        <MonthPickerInput rhfField={field} />
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projectExperiences.${projectIndex}.endDate`}
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-6">
                        <FormLabel>End Month</FormLabel>
                        <MonthPickerInput
                          rhfField={field}
                          disabled={Boolean(watchedProjects?.[projectIndex]?.isInProgress)}
                        />
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projectExperiences.${projectIndex}.tags`}
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Tags (comma separated)</FormLabel>
                        <TextInput rhfField={field} placeholder="React, Next.js, Prisma" />
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projectExperiences.${projectIndex}.description`}
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Description</FormLabel>
                        <TextAreaInput rhfField={field} rows={4} />
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`projectExperiences.${projectIndex}.imageUrl`}
                    render={({ field }) => (
                      <FormItem className="col-span-12 space-y-3 rounded-md border p-3">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={(element) => {
                            imageInputRefs.current[projectField.id] = element;
                          }}
                          onChange={(event) => {
                            const selectedFile = event.target.files?.[0];
                            if (selectedFile) {
                              void handleProjectImageFileChange(
                                projectIndex,
                                field.onChange,
                                selectedFile
                              );
                            }
                            event.target.value = "";
                          }}
                        />
                        <Box className="flex items-center justify-between">
                          <FormLabel className="mb-0">Project Image</FormLabel>
                        </Box>

                        {!field.value ?
                          <Tabs defaultValue="upload" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="upload">Upload File</TabsTrigger>
                              <TabsTrigger value="url">Image URL</TabsTrigger>
                            </TabsList>

                            <TabsContent value="upload" className="mt-3">
                              <Button
                                type="button"
                                variant="outline"
                                className="h-44 w-full flex-col gap-2 border-dashed"
                                onClick={() => openProjectImagePicker(projectField.id)}
                              >
                                <Upload className="h-6 w-6" />
                                <Box as="span" className="text-sm font-medium">
                                  Click to upload cover
                                </Box>
                                <Box as="span" className="text-xs text-muted-foreground">
                                  Support for SVG, PNG, JPG or GIF
                                </Box>
                              </Button>
                            </TabsContent>

                            <TabsContent value="url" className="mt-3">
                              <TextInput
                                value={field.value ?? ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name={field.name}
                                placeholder="https://images.unsplash.com/..."
                              />
                            </TabsContent>
                          </Tabs>
                        : <Box className="space-y-3 rounded-md border bg-card p-3">
                            <Image
                              src={field.value}
                              alt={
                                form.getValues(`projectExperiences.${projectIndex}.title`) ||
                                "Project image preview"
                              }
                              className="object-cover"
                              wrapperClassName="h-44 w-full"
                            />
                            <Box className="flex justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => openProjectImagePicker(projectField.id)}
                              >
                                <ImageUp className="h-4 w-4" />
                                Replace
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeImageModal.open({ projectIndex })}
                              >
                                <Trash2 className="h-4 w-4" />
                                Remove
                              </Button>
                            </Box>
                          </Box>
                        }
                        <FormErrorMessage />
                      </FormItem>
                    )}
                  />

                  <Box className="col-span-12 space-y-3 rounded-md border p-3">
                    <Box className="flex items-center justify-between">
                      <Typography as="p" className="text-sm font-medium">
                        Project Attachments
                      </Typography>
                    </Box>
                    {(watchedProjects?.[projectIndex]?.attachments ?? []).length > 0 ?
                      <Box className="space-y-3">
                        {(watchedProjects?.[projectIndex]?.attachments ?? []).map(
                          (attachment, attachmentIndex) => (
                            <Box
                              key={
                                attachment.id ?? attachment.sha ?? `${projectIndex}-${attachmentIndex}`
                              }
                              className="flex items-center justify-between rounded-md border bg-card p-3"
                            >
                              <Typography as="p" className="text-sm">
                                {attachment.name || "Unnamed attachment"}
                              </Typography>
                              {attachment.streamUrl ?
                                <Link
                                  href={attachment.streamUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-sm text-primary hover:underline"
                                >
                                  Open
                                </Link>
                              : <Typography as="p" className="text-xs text-muted-foreground">
                                  No stream URL
                                </Typography>
                              }
                            </Box>
                          )
                        )}
                      </Box>
                    : <Typography as="p" className="text-sm text-muted-foreground">
                        No attachments available
                      </Typography>
                    }
                  </Box>

                  <Box className="col-span-12 space-y-2 rounded-md border p-3">
                    <Box className="flex items-center justify-between gap-2">
                      <Typography as="p" className="text-sm font-medium">
                        Project Links
                      </Typography>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddLink(projectIndex)}
                      >
                        <Plus className="h-4 w-4" /> Add Link
                      </Button>
                    </Box>

                    {(watchedProjects?.[projectIndex]?.links ?? []).map((_, linkIndex) => (
                      <Box key={linkIndex} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`projectExperiences.${projectIndex}.links.${linkIndex}.name`}
                          render={({ field }) => (
                            <FormItem className="">
                              <TextInput rhfField={field} placeholder="Link Name" />
                              <FormErrorMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`projectExperiences.${projectIndex}.links.${linkIndex}.url`}
                          render={({ field }) => (
                            <FormItem className="flex-1 basis-3xs">
                              <TextInput rhfField={field} placeholder="https://..." />
                              <FormErrorMessage />
                            </FormItem>
                          )}
                        />

                        <Box className="">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() =>
                              removeLinkModal.open({
                                projectIndex,
                                linkIndex
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                            <Box as="span" className="sr-only">
                              Remove link
                            </Box>
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )
            }))}
            onChange={({ fromIndex, nextIndex }) => {
              projects.swap(fromIndex, nextIndex);
            }}
            onRemove={({ index }) => {
              removeModal.open({
                index,
                label: normalizeLabel(form.getValues(`projectExperiences.${index}.title`))
              });
            }}
          />

          {projects.fields.length === 0 && (
            <Box className="text-sm text-muted-foreground border-2 border-dashed rounded-md p-4 text-center">
              No projects added yet.
            </Box>
          )}

          <ConfirmDialog
            open={removeModal.state.isOpen}
            title={Messages.work.dialog.deleteProjectTitle}
            confirmLabel={Messages.common.dialog.confirmDelete}
            cancelLabel={Messages.common.dialog.cancel}
            onOpenChange={(open) => {
              if (!open) {
                removeModal.close({ index: null, label: "" });
              }
            }}
            onConfirm={() => {
              if (removeModal.state.payload.index !== null) {
                projects.remove(removeModal.state.payload.index);
              }
              removeModal.close({ index: null, label: "" });
            }}
          />

          <ConfirmDialog
            open={removeLinkModal.state.isOpen}
            title={Messages.work.dialog.deleteProjectLinkTitle}
            confirmLabel={Messages.common.dialog.confirmDelete}
            cancelLabel={Messages.common.dialog.cancel}
            onOpenChange={(open) => {
              if (!open) {
                removeLinkModal.close({ projectIndex: null, linkIndex: null });
              }
            }}
            onConfirm={() => {
              const { projectIndex, linkIndex } = removeLinkModal.state.payload;
              if (projectIndex !== null && linkIndex !== null) {
                handleRemoveLink(projectIndex, linkIndex);
              }
              removeLinkModal.close({ projectIndex: null, linkIndex: null });
            }}
          />

          <ConfirmDialog
            open={removeImageModal.state.isOpen}
            title={Messages.work.dialog.deleteProjectImageTitle}
            confirmLabel={Messages.common.dialog.confirmDelete}
            cancelLabel={Messages.common.dialog.cancel}
            onOpenChange={(open) => {
              if (!open) {
                removeImageModal.close({ projectIndex: null });
              }
            }}
            onConfirm={() => {
              const { projectIndex } = removeImageModal.state.payload;
              if (projectIndex !== null) {
                form.setValue(`projectExperiences.${projectIndex}.imageUrl`, "", {
                  shouldDirty: true,
                  shouldValidate: true
                });
                form.setValue(`projectExperiences.${projectIndex}.attachments`, [], {
                  shouldDirty: true,
                  shouldValidate: true
                });
              }
              removeImageModal.close({ projectIndex: null });
            }}
          />

          <FormActionFooter
            isLoading={isLoading}
            isDirty={form.formState.isDirty}
            onCancel={() => form.reset(defaultValues)}
          />
        </CardContent>
      </Card>
    </Form>
  );
}

function createEmptyProject() {
  return {
    id: null,
    title: "",
    isInProgress: false,
    startDate: "",
    endDate: "",
    description: "",
    tags: "",
    imageUrl: "",
    links: [],
    attachments: []
  };
}

function normalizeMonth(value?: string | null): string {
  if (!value) {
    return "";
  }

  return value.slice(0, 7);
}

function normalizeDate(value?: string): string | null {
  const cleaned = value?.trim();
  if (!cleaned) {
    return null;
  }

  return `${cleaned}-01`;
}

function normalizeLabel(value?: string | null, fallback = "this project"): string {
  const normalized = value?.trim();
  return normalized || fallback;
}

function normalizeUrlForInput(value?: string | null): string {
  if (!value) {
    return "";
  }

  if (value.startsWith("mailto:")) {
    return value.replace(/^mailto:/, "");
  }

  return value;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function extractBase64FromDataUrl(dataUrl: string): string {
  const parts = dataUrl.split(",");
  return parts[1] ?? "";
}

async function sha256HexFromBase64(base64: string): Promise<string> {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

function mapToDefaultValues(response: ActionOutput<GetProfileWorkOutput>): FormManageWorkValues {
  if (!response.success) {
    return {
      projectExperiences: []
    };
  }

  return {
    projectExperiences: response.data.projectExperiences.map((item) => ({
      id: item.id,
      title: item.title ?? "",
      isInProgress: Boolean(item.isInProgress),
      startDate: normalizeMonth(item.startDate),
      endDate: normalizeMonth(item.endDate),
      description: item.description ?? "",
      tags: item.tags ?? "",
      imageUrl: item.attachments?.[0]?.streamUrl ?? "",
      links: (item.links ?? []).map((link) => ({
        id: link.id,
        name: link.name ?? "",
        url: normalizeUrlForInput(link.url)
      })),
      attachments: (item.attachments ?? []).map((attachment) => ({
        id: attachment.id,
        name: attachment.name,
        mime: attachment.mime,
        sha: attachment.sha,
        streamUrl: attachment.streamUrl,
        content: null
      }))
    }))
  };
}

function mapToPayload(values: FormManageWorkValues): UpsertProfileWorkActionInput {
  return {
    projectExperiences: (values.projectExperiences ?? []).map((item, index) => ({
      id: item.id || undefined,
      title: item.title?.trim() || undefined,
      isInProgress: Boolean(item.isInProgress),
      startDate: normalizeDate(item.startDate) || undefined,
      endDate: item.isInProgress ? undefined : normalizeDate(item.endDate) || undefined,
      description: item.description?.trim() || undefined,
      tags:
        item.tags
          ?.split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
          .join(", ") || undefined,
      imageUrl: item.imageUrl?.trim() || undefined,
      displayOrder: index + 1,
      links: (item.links ?? [])
        .filter((link) => Boolean(link.id || link.name?.trim() || link.url?.trim()))
        .map((link) => ({
          id: link.id || undefined,
          name: link.name?.trim() || undefined,
          url: link.url?.trim() || undefined
        })),
      attachments: (item.attachments ?? [])
        .filter((attachment) => Boolean(attachment.id || attachment.content))
        .map((attachment) => ({
          id: attachment.id || undefined,
          name: attachment.name || undefined,
          mime: attachment.mime || undefined,
          sha: attachment.sha || undefined,
          content: attachment.content || undefined
        }))
    }))
  };
}
