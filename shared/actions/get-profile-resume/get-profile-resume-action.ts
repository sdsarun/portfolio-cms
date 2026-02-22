// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import type { GetProfileResumeOutput } from "@/shared/actions/get-profile-resume/get-profile-resume-output";
import { requireAuth } from "@/features/auth/utils/require-auth";
import { createAction } from "@/shared/utils/action/create-action";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";

export const getProfileResumeAction = createAction<GetProfileResumeOutput>({
  action: async () => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/resume", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      next: {
        tags: [CacheActionTags.GetProfileResume]
      }
    });
    return response.json();
  }
});
