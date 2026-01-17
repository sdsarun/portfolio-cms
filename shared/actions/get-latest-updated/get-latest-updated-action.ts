"use server";

// auth
import { requireAuth } from "@/shared/auth/required-auth";

// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import type { LatestUpdatedActionOutput } from "@/shared/actions/get-latest-updated/get-latest-updated-output";
import { createAction } from "@/shared/utils/action/create-action";

export const getLatestUpdatedAction = createAction<LatestUpdatedActionOutput>({
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
