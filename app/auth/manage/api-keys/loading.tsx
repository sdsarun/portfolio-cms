import { AuthPageLoadingShell } from "@/features/auth/components/loading/auth-page-loading-shell";
import { ManageApiKeysSkeleton } from "@/features/manage/components/manage-api-keys/manage-api-keys-skeleton";

export default function ManageApiKeysPageLoading() {
  return (
    <AuthPageLoadingShell title="Manage API Keys">
      <ManageApiKeysSkeleton />
    </AuthPageLoadingShell>
  );
}
