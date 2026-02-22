// core
import { Suspense } from "react";

// components
import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { ManageApiKeys } from "@/features/manage/components/manage-api-keys/manage-api-keys";
import { ManageApiKeysSkeleton } from "@/features/manage/components/manage-api-keys/manage-api-keys-skeleton";
import { ManagePageConfig } from "@/features/manage/constants/page-config";

// utils
import { toPositiveInt } from "@/shared/utils/number";

// actions
import { requireAuth } from "@/features/auth/utils/require-auth";
import { getApiKeysAction } from "@/shared/actions/get-api-keys/get-api-keys-action";

export type ManageApiKeysProps = PageProps<"/auth/manage/api-keys">;

export async function ManageApiKeysPage({ searchParams }: ManageApiKeysProps) {
  await requireAuth();

  const resolvedSearchParams = await searchParams;
  const initialPage = toPositiveInt(
    resolvedSearchParams?.page,
    ManagePageConfig.apiKeys.pagination.defaultPage
  );
  const initialPageSize = toPositiveInt(
    resolvedSearchParams?.pageSize,
    ManagePageConfig.apiKeys.pagination.defaultPageSize
  );
  const initialOffset = (initialPage - 1) * initialPageSize;

  const initialApiKeysPromise = getApiKeysAction({ offset: initialOffset, limit: initialPageSize });

  return (
    <AuthMainContent title="Manage API Keys" classNames={{ root: "flex flex-col gap-6" }}>
      <Suspense fallback={<ManageApiKeysSkeleton />}>
        <ManageApiKeys
          key={`${initialPage}-${initialPageSize}`}
          initialApiKeysPromise={initialApiKeysPromise}
          initialPage={initialPage}
          initialPageSize={initialPageSize}
        />
      </Suspense>
    </AuthMainContent>
  );
}
