import {
  AuthPageHeaderBadgeSkeleton,
  AuthPageLoadingShell
} from "@/features/auth/components/loading/auth-page-loading-shell";
import { FormManageWorkSkeleton } from "@/features/manage/components/form-manage-work/form-manage-work-skeleton";

export default function ManageWorkPageLoading() {
  return (
    <AuthPageLoadingShell title="Manage Work" rightContent={<AuthPageHeaderBadgeSkeleton />}>
      <FormManageWorkSkeleton />
    </AuthPageLoadingShell>
  );
}
