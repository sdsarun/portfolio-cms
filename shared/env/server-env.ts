// core
import z from "zod";

// env
import { validateEnv } from "@/shared/env/env-utils";

const serverEnvSchema = z
  .object({
    NODE_ENV: z.string(),
    SERVICE_NAME: z.string().default("portfolio"),
    PORTFOLIO_BACKEND_URL: z.url(),
    SESSION_SECRET: z.string().min(1, "SESSION_SECRET is required")
  })
  .readonly();

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export const serverEnv = validateEnv(serverEnvSchema);
