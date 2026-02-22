import { AuthPageLoadingShell } from "@/features/auth/components/loading/auth-page-loading-shell";
import { FormManageSettingsSkeleton } from "@/features/manage/components/form-manage-settings/form-manage-settings-skeleton";

export default function ManageSettingsPageLoading() {
  return (
    <AuthPageLoadingShell
      title="Settings"
      description="Manage your account settings and security preferences."
    >
      <FormManageSettingsSkeleton />
    </AuthPageLoadingShell>
  );
}
