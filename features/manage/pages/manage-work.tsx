// core
import { Suspense } from "react";

// components
import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { FormManageWork } from "@/features/manage/components/form-manage-work/form-manage-work";
import { FormManageWorkSkeleton } from "@/features/manage/components/form-manage-work/form-manage-work-skeleton";
import { BadgeTimestamp } from "@/shared/ui/badge/badge-timestamp";

// actions
import { requireAuth } from "@/features/auth/utils/require-auth";
import { getProfileLatestUpdatedAction } from "@/shared/actions/get-profile-latest-updated/get-profile-latest-updated-action";
import { getProfileWorkAction } from "@/shared/actions/get-profile-work/get-profile-work-action";

export type ManageWorkProps = PageProps<"/auth/manage/work">;

export async function ManageWorkPage({}: ManageWorkProps) {
  await requireAuth();

  const profileWorkPromise = getProfileWorkAction();
  const latestUpdated = await getProfileLatestUpdatedAction();
  const latestUpdateTimestamp = latestUpdated.success ? latestUpdated.data.work : null;

  return (
    <AuthMainContent
      title="Manage Work"
      classNames={{ root: "flex flex-col gap-6" }}
      rightContent={<BadgeTimestamp timestamp={latestUpdateTimestamp} />}
    >
      <Suspense fallback={<FormManageWorkSkeleton />}>
        <FormManageWork profileWorkPromise={profileWorkPromise} />
      </Suspense>
    </AuthMainContent>
  );
}
