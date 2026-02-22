import {
  AuthPageHeaderBadgeSkeleton,
  AuthPageLoadingShell
} from "@/features/auth/components/loading/auth-page-loading-shell";
import { FormManageHomeSkeleton } from "@/features/manage/components/form-manage-home/form-manage-home-skeleton";

export default function ManageHomePageLoading() {
  return (
    <AuthPageLoadingShell title="Manage Home" rightContent={<AuthPageHeaderBadgeSkeleton />}>
      <FormManageHomeSkeleton />
    </AuthPageLoadingShell>
  );
}
