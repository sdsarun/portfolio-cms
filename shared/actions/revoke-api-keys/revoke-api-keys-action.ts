"use server";

import { revalidateTag } from "next/cache";

import { requireAuth } from "@/features/auth/utils/require-auth";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";
import type { RevokeApiKeysActionInput } from "@/shared/actions/revoke-api-keys/revoke-api-keys-input";
import type { RevokeApiKeysActionOutput } from "@/shared/actions/revoke-api-keys/revoke-api-keys-output";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";

export const revokeApiKeysAction = createAction<
  RevokeApiKeysActionInput,
  RevokeApiKeysActionOutput
>({
  action: async (input) => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/api-keys/revoke", {
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
