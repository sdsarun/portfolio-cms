import { requireAuth } from "@/features/auth/utils/require-auth";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";
import type { GetProfileWorkOutput } from "@/shared/actions/get-profile-work/get-profile-work-output";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";

export const getProfileWorkAction = createAction<GetProfileWorkOutput>({
  action: async () => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/work", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      next: {
        tags: [CacheActionTags.GetProfileWork]
      }
    });

    return response.json();
  }
});
