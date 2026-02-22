import { Suspense } from "react";

// components
import { FormManageResume } from "@/features/manage/components/form-manage-resume./form-manage-resume";
import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { BadgeTimestamp } from "@/shared/ui/badge/badge-timestamp";
import { FormManageResumeSkeleton } from "@/features/manage/components/form-manage-resume./form-manage-resume-skeleton";

// actions
import { requireAuth } from "@/features/auth/utils/require-auth";
import { getProfileLatestUpdatedAction } from "@/shared/actions/get-profile-latest-updated/get-profile-latest-updated-action";
import { getProfileResumeAction } from "@/shared/actions/get-profile-resume/get-profile-resume-action";

export type ManageResumeProps = PageProps<"/auth/manage/resume">;

export async function ManageResumePage({}: ManageResumeProps) {
  await requireAuth();

  const profileResumePromise = getProfileResumeAction();
  const latestUpdated = await getProfileLatestUpdatedAction();
  const latestUpdateTimestamp = latestUpdated.success ? latestUpdated.data.resume : null;

  return (
    <AuthMainContent
      title="Manage Resume"
      classNames={{ root: "flex flex-col gap-6" }}
      rightContent={<BadgeTimestamp timestamp={latestUpdateTimestamp} />}
    >
      <Suspense fallback={<FormManageResumeSkeleton />}>
        <FormManageResume profileResumePromise={profileResumePromise} />
      </Suspense>
    </AuthMainContent>
  );
}
