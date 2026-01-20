import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { requireAuth } from "@/features/auth/utils/require-auth";

export default async function ContactPage() {
  await requireAuth();
  return (
    <AuthMainContent
      title="Contact"
      description="Manage your contact information."
      classNames={{ root: "flex flex-col gap-6" }}
    >
      {/* Blank page content */}
    </AuthMainContent>
  );
}
