"use server";

import { revalidateTag } from "next/cache";

import { requireAuth } from "@/features/auth/utils/require-auth";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";
import type { DeleteApiKeyByIdActionInput } from "@/shared/actions/delete-api-key-by-id/delete-api-key-by-id-input";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";

export const deleteApiKeyByIdAction = createAction<DeleteApiKeyByIdActionInput, void>({
  action: async (input) => {
    const auth = await requireAuth();
    await portfolioApi(`/v1/api-keys/${input.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });

    revalidateTag(CacheActionTags.GetApiKeys, "max");
  }
});
