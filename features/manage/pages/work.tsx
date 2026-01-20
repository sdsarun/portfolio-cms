import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { requireAuth } from "@/features/auth/utils/require-auth";

export default async function WorkPage() {
  await requireAuth();
  return (
    <AuthMainContent
      title="Work"
      description="Manage your work experience."
      classNames={{ root: "flex flex-col gap-6" }}
    >
      {/* Blank page content */}
    </AuthMainContent>
  );
}
