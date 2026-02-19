import { Suspense } from "react";

// components
import { FormManageHome } from "@/features/manage/components/form-manage-home/form-manage-home";
import { FormManageHomeSkeleton } from "@/features/manage/components/form-manage-home/form-manage-home-skeleton";
import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { BadgeTimestamp } from "@/shared/ui/badge/badge-timestamp";

// actions
import { requireAuth } from "@/features/auth/utils/require-auth";
import { getProfileLatestUpdatedAction } from "@/shared/actions/get-profile-latest-updated/get-profile-latest-updated-action";
import { getProfileInfoAction } from "@/shared/actions/get-profile-info/get-profile-info-action";

export type ManageHomeProps = PageProps<"/auth">;

export async function ManageHomePage({}: ManageHomeProps) {
  await requireAuth();

  const profileInfoPromise = getProfileInfoAction();
  const latestUpdated = await getProfileLatestUpdatedAction();
  const latestUpdateTimestamp = latestUpdated.success ? latestUpdated.data.info : null;

  return (
    <AuthMainContent
      title="Manage Home"
      classNames={{ root: "flex flex-col gap-6" }}
      rightContent={<BadgeTimestamp timestamp={latestUpdateTimestamp} />}
    >
      <Suspense fallback={<FormManageHomeSkeleton />}>
        <FormManageHome profileInfoPromise={profileInfoPromise} />
      </Suspense>
    </AuthMainContent>
  );
}
