"use server";

// core
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import { createAction } from "@/shared/utils/action/create-action";
import type { SignInActionInput } from "@/shared/actions/signin/signin-input";
import type { SignInActionOutput } from "@/shared/actions/signin/signin-output";

export const signInAction = createAction<SignInActionInput>({
  action: async (input) => {
    const response = await portfolioApi("/v1/auth/signin", {
      method: "POST",
      body: JSON.stringify(input)
    });
    const result = (await response.json()) as SignInActionOutput;
    const decoded = jwtDecode(result.token);

    const expiresAtMs = (decoded?.exp || 0) * 1000;
    const nowMs = Date.now();
    const maxAgeSeconds = Math.floor((expiresAtMs - nowMs) / 1000);

    const cookieStore = await cookies();
    cookieStore.set("token", result.token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAgeSeconds
    });

    redirect("/auth/dashboard");
  }
});
