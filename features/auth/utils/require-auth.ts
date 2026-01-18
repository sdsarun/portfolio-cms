import "server-only";

// utils
import { getToken } from "@/features/auth/utils/get-token";
import { redirectToNotFound } from "@/shared/utils/navigation/redirects";

export async function requireAuth(): Promise<{ token: string }> {
  const token = await getToken();
  if (!token) {
    redirectToNotFound();
  }
  return { token };
}
