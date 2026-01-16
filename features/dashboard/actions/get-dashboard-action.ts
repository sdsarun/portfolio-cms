"use server";

import { requireAuth } from "@/shared/auth/required-auth";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";

export const getDashboardDataAction = createAction({
  action: async () => {
    const token = await requireAuth();
    const response = await portfolioApi("/v1/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      next: {
        tags: ["get-dashboard"]
      }
    });
    const result = await response.json();
    return result;
  }
});
