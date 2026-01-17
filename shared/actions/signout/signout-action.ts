"use server";

import { createAction } from "@/shared/utils/action/create-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signOutAction = createAction({
  action: async () => {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/");
  }
});
