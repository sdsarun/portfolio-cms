// core
import { Suspense } from "react";

// components
import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { FormManageContact } from "@/features/manage/components/form-manage-contact/form-manage-contact";
import { FormManageContactSkeleton } from "@/features/manage/components/form-manage-contact/form-manage-contact-skeleton";
import { BadgeTimestamp } from "@/shared/ui/badge/badge-timestamp";

// actions
import { requireAuth } from "@/features/auth/utils/require-auth";
import { getProfileLatestUpdatedAction } from "@/shared/actions/get-profile-latest-updated/get-profile-latest-updated-action";
import { getProfileContactAction } from "@/shared/actions/get-profile-contact/get-profile-contact-action";

export type ManageContactProps = PageProps<"/auth/manage/contact">;

export async function ManageContactPage({}: ManageContactProps) {
  await requireAuth();

  const profileContactPromise = getProfileContactAction();
  const latestUpdated = await getProfileLatestUpdatedAction();
  const latestUpdateTimestamp = latestUpdated.success ? latestUpdated.data.contact : null;

  return (
    <AuthMainContent
      title="Manage Contact"
      classNames={{ root: "flex flex-col gap-6" }}
      rightContent={<BadgeTimestamp timestamp={latestUpdateTimestamp} />}
    >
      <Suspense fallback={<FormManageContactSkeleton />}>
        <FormManageContact profileContactPromise={profileContactPromise} />
      </Suspense>
    </AuthMainContent>
  );
}
