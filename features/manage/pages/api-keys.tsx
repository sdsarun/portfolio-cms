import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { requireAuth } from "@/features/auth/utils/require-auth";

export default async function ApiKeysPage() {
  await requireAuth();
  return (
    <AuthMainContent
      title="API Keys"
      description="Manage your API keys."
      classNames={{ root: "flex flex-col gap-6" }}
    >
      {/* Blank page content */}
    </AuthMainContent>
  );
}
