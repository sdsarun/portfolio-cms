"use server";

// auth
import { requireAuth } from "@/features/auth/utils/require-auth";

// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import type { GetProfileLatestUpdatedActionOutput } from "@/shared/actions/get-profile-latest-updated/get-profile-latest-updated-output";
import { createAction } from "@/shared/utils/action/create-action";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";

export const getProfileLatestUpdatedAction = createAction<GetProfileLatestUpdatedActionOutput>({
  action: async () => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/latest-updated", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      next: {
        tags: [CacheActionTags.GetProfileLatestUpdated]
      }
    });
    return response.json();
  }
});
