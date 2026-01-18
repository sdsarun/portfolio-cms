"use server";

// core
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/", RedirectType.replace);
}
