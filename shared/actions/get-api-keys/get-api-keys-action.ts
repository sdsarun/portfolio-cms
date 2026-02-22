"use server";

import { requireAuth } from "@/features/auth/utils/require-auth";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";
import type { GetApiKeysActionInput } from "@/shared/actions/get-api-keys/get-api-keys-input";
import type { GetApiKeysActionOutput } from "@/shared/actions/get-api-keys/get-api-keys-output";

export const getApiKeysAction = createAction<GetApiKeysActionInput, GetApiKeysActionOutput>({
  action: async (input) => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/api-keys", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      params: {
        offset: input.offset,
        limit: input.limit
      },
      next: {
        tags: [CacheActionTags.GetApiKeys]
      }
    });

    return response.json();
  }
});
