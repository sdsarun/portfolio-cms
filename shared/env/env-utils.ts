import { ZodType } from "zod";

export const isDev = () => process.env.NODE_ENV === "development";
export const isClient = () => typeof window !== "undefined";
export const validateEnv = <T>(schema: ZodType<T>): T => {
  const parsed = schema.safeParse(process.env);
  if (parsed.success) {
    return parsed.data;
  }
  console.error("❌ Invalid environment variables:");
  const messageLines = parsed.error.issues.map((issue) => `- ${issue.path.join(".")}: ${issue.message}`);
  throw new Error(`Invalid environment variables:\n${messageLines.join("\n")}`);
};
