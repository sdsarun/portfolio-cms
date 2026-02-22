import {
  AuthPageHeaderBadgeSkeleton,
  AuthPageLoadingShell
} from "@/features/auth/components/loading/auth-page-loading-shell";
import { FormManageResumeSkeleton } from "@/features/manage/components/form-manage-resume./form-manage-resume-skeleton";

export default function ManageResumePageLoading() {
  return (
    <AuthPageLoadingShell title="Manage Resume" rightContent={<AuthPageHeaderBadgeSkeleton />}>
      <FormManageResumeSkeleton />
    </AuthPageLoadingShell>
  );
}
