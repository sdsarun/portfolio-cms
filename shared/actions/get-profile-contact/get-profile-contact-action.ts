import { requireAuth } from "@/features/auth/utils/require-auth";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";
import type { GetProfileContactOutput } from "@/shared/actions/get-profile-contact/get-profile-contact-output";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";

export const getProfileContactAction = createAction<GetProfileContactOutput>({
  action: async () => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/contact", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      next: {
        tags: [CacheActionTags.GetProfileContact]
      }
    });

    return response.json();
  }
});
