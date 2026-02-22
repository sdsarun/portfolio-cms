"use server";

import { revalidateTag } from "next/cache";

import { requireAuth } from "@/features/auth/utils/require-auth";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";
import type { CreateApiKeyActionInput } from "@/shared/actions/create-api-key/create-api-key-input";
import type { CreateApiKeyActionOutput } from "@/shared/actions/create-api-key/create-api-key-output";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";

export const createApiKeyAction = createAction<CreateApiKeyActionInput, CreateApiKeyActionOutput>({
  action: async (input) => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/api-keys", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(input)
    });

    revalidateTag(CacheActionTags.GetApiKeys, "max");

    return response.json();
  }
});
