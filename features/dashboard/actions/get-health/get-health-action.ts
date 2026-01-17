// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import { createAction } from "@/shared/utils/action/create-action";
import { type Health } from "@/features/dashboard/actions/get-health/get-health-output";

export const getHealthAction = createAction<Health>({
  action: async () => {
    const response = await portfolioApi("/health");
    return response.json();
  }
});
