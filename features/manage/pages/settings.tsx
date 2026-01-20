import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { requireAuth } from "@/features/auth/utils/require-auth";

export default async function SettingsPage() {
  await requireAuth();
  return (
    <AuthMainContent
      title="Settings"
      description="Manage your account settings."
      classNames={{ root: "flex flex-col gap-6" }}
    >
      {/* Blank page content */}
    </AuthMainContent>
  );
}
