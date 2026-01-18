// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import type { GetProfileInfoOutput } from "@/shared/actions/get-profile-info/get-profile-info-output";
import { requireAuth } from "@/features/auth/utils/require-auth";
import { createAction } from "@/shared/utils/action/create-action";

export const getProfileInfoAction = createAction<GetProfileInfoOutput>({
  action: async () => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/info", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    return response.json();
  }
});
