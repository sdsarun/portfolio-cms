"use server";

// core
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export type SignOutActionOptions = {
  redictType?: RedirectType;
};

export async function signOutAction(options?: SignOutActionOptions) {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/", options?.redictType ?? RedirectType.replace);
}
