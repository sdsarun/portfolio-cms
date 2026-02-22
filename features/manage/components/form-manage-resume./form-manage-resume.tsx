"use client";

import { Box } from "@/shared/layout/box";

// core
import { use, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import { toast } from "@/shared/ui/sonner";
import { Form } from "@/shared/ui/form/form";
import { UnableToFetchDataAlert } from "@/shared/ui/alert/alert-fetch-failed";
import { FormActionFooter } from "@/shared/ui/form/form-action-footer";
import { ExperienceSection } from "@/features/manage/components/form-manage-resume./sections/experience-section";
import { SkillsSection } from "@/features/manage/components/form-manage-resume./sections/skills-section";
import { EducationSection } from "@/features/manage/components/form-manage-resume./sections/education-section";
import { CertificationSection } from "@/features/manage/components/form-manage-resume./sections/certification-section";
import { ResumeUrlSection } from "@/features/manage/components/form-manage-resume./sections/resume-url-section";

// hooks
import { useAction } from "@/shared/hooks/use-action";

// actions
import type { GetProfileResumeOutput } from "@/shared/actions/get-profile-resume/get-profile-resume-output";
import type { ActionOutput } from "@/shared/utils/action/create-action";
import { upsertProfileResumeAction } from "@/shared/actions/upsert-profile-resume/upsert-profile-resume-action";
import type { UpsertProfileResumeActionInput } from "@/shared/actions/upsert-profile-resume/upsert-profile-resume-input";
import { Messages } from "@/shared/constants/messages";

// schema
import {
  FormManageResumeSchema,
  type FormManageResumeValues
} from "@/features/manage/components/form-manage-resume./schema";

type FormManageResumeProps = {
  profileResumePromise: Promise<ActionOutput<GetProfileResumeOutput>>;
};

export function FormManageResume({ profileResumePromise }: FormManageResumeProps) {
  const profileResumeResponse = use(profileResumePromise);
  const { execute, isLoading } = useAction(upsertProfileResumeAction);

  const defaultValues = useMemo<FormManageResumeValues>(() => {
    if (!profileResumeResponse.success) {
      return {
        resumeUrl: "",
        workExperiences: [],
        skills: [],
        education: [],
        certification: []
      };
    }

    const data = profileResumeResponse.data;

    return {
      resumeUrl: data.profile?.resumeUrl ?? "",
      workExperiences: data.workExperiences.map((item) => ({
        id: item.id,
        jobTitle: item.jobTitle ?? "",
        companyName: item.companyName ?? "",
        startDate: item.startDate?.slice(0, 7) ?? "",
        endDate: item.endDate?.slice(0, 7) ?? "",
        isCurrent: Boolean(item.isCurrent),
        description: item.description ?? ""
      })),
      skills: data.skills.map((item) => ({
        id: item.id,
        categoryName: item.categoryName ?? "",
        skillNames: item.skillNames ?? ""
      })),
      education: data.education.map((item) => ({
        id: item.id,
        institution: item.institution ?? "",
        startDate: item.startDate?.slice(0, 7) ?? ""
      })),
      certification: data.certification.map((item) => ({
        id: item.id,
        name: item.name ?? "",
        issuer: item.issuer ?? "",
        completeDate: item.completeDate?.slice(0, 7) ?? ""
      }))
    };
  }, [profileResumeResponse]);

  const form = useForm<FormManageResumeValues>({
    resolver: zodResolver(FormManageResumeSchema),
    defaultValues
  });

  const handleSubmit = async (formValues: FormManageResumeValues) => {
    const payload: UpsertProfileResumeActionInput = {
      resumeUrl: formValues.resumeUrl?.trim() ? formValues.resumeUrl.trim() : null,
      workExperiences: (formValues.workExperiences ?? []).map((item, index) => ({
        id: item.id || null,
        jobTitle: item.jobTitle?.trim() ? item.jobTitle.trim() : null,
        companyName: item.companyName?.trim() ? item.companyName.trim() : null,
        startDate: item.startDate?.trim() ? `${item.startDate.trim()}-01` : null,
        endDate:
          item.isCurrent ? null
          : item.endDate?.trim() ? `${item.endDate.trim()}-01`
          : null,
        isCurrent: Boolean(item.isCurrent),
        description: item.description?.trim() ? item.description.trim() : null,
        displayOrder: index + 1
      })),
      skills: (formValues.skills ?? []).map((item, index) => ({
        id: item.id || null,
        categoryName: item.categoryName?.trim() ? item.categoryName.trim() : null,
        skillNames:
          item.skillNames
            ?.split(",")
            .map((name) => name.trim())
            .filter(Boolean)
            .join(", ") || null,
        displayOrder: index + 1
      })),
      education: (formValues.education ?? []).map((item, index) => ({
        id: item.id || null,
        institution: item.institution?.trim() ? item.institution.trim() : null,
        startDate: item.startDate?.trim() ? `${item.startDate.trim()}-01` : null,
        displayOrder: index + 1
      })),
      certification: (formValues.certification ?? []).map((item, index) => ({
        id: item.id || null,
        name: item.name?.trim() ? item.name.trim() : null,
        issuer: item.issuer?.trim() ? item.issuer.trim() : null,
        completeDate: item.completeDate?.trim() ? `${item.completeDate.trim()}-01` : null,
        displayOrder: index + 1
      }))
    };

    const result = await execute(payload);

    if (result.success) {
      toast.success(Messages.common.toast.saved);

      form.reset({
        resumeUrl: result.data.profile?.resumeUrl ?? "",
        workExperiences: result.data.workExperiences.map((item) => ({
          id: item.id,
          jobTitle: item.jobTitle ?? "",
          companyName: item.companyName ?? "",
          startDate: item.startDate?.slice(0, 7) ?? "",
          endDate: item.endDate?.slice(0, 7) ?? "",
          isCurrent: Boolean(item.isCurrent),
          description: item.description ?? ""
        })),
        skills: result.data.skills.map((item) => ({
          id: item.id,
          categoryName: item.categoryName ?? "",
          skillNames: item.skillNames ?? ""
        })),
        education: result.data.education.map((item) => ({
          id: item.id,
          institution: item.institution ?? "",
          startDate: item.startDate?.slice(0, 7) ?? ""
        })),
        certification: result.data.certification.map((item) => ({
          id: item.id,
          name: item.name ?? "",
          issuer: item.issuer ?? "",
          completeDate: item.completeDate?.slice(0, 7) ?? ""
        }))
      });
      return;
    }

    toast.error(result.message);
  };

  if (!profileResumeResponse.success) {
    return <UnableToFetchDataAlert description={profileResumeResponse.message} />;
  }

  return (
    <Form form={form} onValid={handleSubmit}>
      <Box className="space-y-6">
        <ExperienceSection form={form} />
        <SkillsSection form={form} />
        <EducationSection form={form} />
        <CertificationSection form={form} />
        <ResumeUrlSection form={form} />
        <FormActionFooter
          isLoading={isLoading}
          isDirty={form.formState.isDirty}
          onCancel={() => form.reset(defaultValues)}
        />
      </Box>
    </Form>
  );
}
