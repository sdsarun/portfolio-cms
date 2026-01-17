"use server";

// auth
import { requireAuth } from "@/shared/auth/required-auth";

// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import { type LatestUpdated } from "@/features/dashboard/actions/get-latest-updated/get-latest-updated-output";
import { createAction } from "@/shared/utils/action/create-action";

export const getLatestUpdatedAction = createAction<LatestUpdated>({
  action: async () => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/latest-updated", {
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      next: {
        tags: ["profile", "latest-updated"]
      }
    });
    return response.json();
  }
});
