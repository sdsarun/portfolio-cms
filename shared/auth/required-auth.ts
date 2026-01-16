import "server-only";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function requireAuth(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/not-found", RedirectType.replace);
  }
  return token.value;
}
