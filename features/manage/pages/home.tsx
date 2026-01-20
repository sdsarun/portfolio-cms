import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { requireAuth } from "@/features/auth/utils/require-auth";

export default async function HomePage() {
  await requireAuth();
  return (
    <AuthMainContent
      title="Home"
      description="Manage your home page content."
      classNames={{ root: "flex flex-col gap-6" }}
    >
      {/* Blank page content */}
    </AuthMainContent>
  );
}
