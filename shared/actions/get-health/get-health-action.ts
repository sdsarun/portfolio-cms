// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import type { HealthActionOutput } from "@/shared/actions/get-health/get-health-output";
import { createAction } from "@/shared/utils/action/create-action";

export const getHealthAction = createAction<HealthActionOutput>({
  action: async () => {
    const response = await portfolioApi("/health");
    return response.json();
  }
});
