import "server-only";

// core
import { cookies } from "next/headers";

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  return tokenCookie ? tokenCookie.value : null;
}
