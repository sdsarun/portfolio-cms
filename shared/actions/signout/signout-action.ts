"use server";

import { redirectToSignOut } from "@/shared/utils/navigation/redirects";

export async function signOutAction() {
  redirectToSignOut();
}
