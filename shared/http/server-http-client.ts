import "server-only";

// env
import { serverEnv } from "@/shared/env/server-env";

// http
import { createHttpClient } from "@/shared/http/http-client";

export const portfolioApi = createHttpClient({
  baseUrl: serverEnv.PORTFOLIO_BACKEND_URL
});
