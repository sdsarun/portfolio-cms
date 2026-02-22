import {
  AuthPageHeaderBadgeSkeleton,
  AuthPageLoadingShell
} from "@/features/auth/components/loading/auth-page-loading-shell";
import { FormManageContactSkeleton } from "@/features/manage/components/form-manage-contact/form-manage-contact-skeleton";

export default function ManageContactPageLoading() {
  return (
    <AuthPageLoadingShell title="Manage Contact" rightContent={<AuthPageHeaderBadgeSkeleton />}>
      <FormManageContactSkeleton />
    </AuthPageLoadingShell>
  );
}
