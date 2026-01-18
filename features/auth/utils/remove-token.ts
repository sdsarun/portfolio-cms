import "server-only";

// core
import { cookies } from "next/headers";

export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
