import "server-only";

// core
import { redirect, RedirectType } from "next/navigation";

export function redirectToSignOut(): never {
  redirect("/auth/signout", RedirectType.replace);
}

export function redirectToNotFound(): never {
  redirect("/not-found", RedirectType.replace);
}
