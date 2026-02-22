// components
import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { FormManageSettings } from "@/features/manage/components/form-manage-settings/form-manage-settings";

// actions
import { requireAuth } from "@/features/auth/utils/require-auth";

export type ManageSettingsProps = PageProps<"/auth/manage/settings">;

export async function ManageSettingsPage({}: ManageSettingsProps) {
  await requireAuth();

  return (
    <AuthMainContent
      title="Settings"
      description="Manage your account settings and security preferences."
      classNames={{ root: "flex flex-col gap-6" }}
    >
      <FormManageSettings />
    </AuthMainContent>
  );
}
