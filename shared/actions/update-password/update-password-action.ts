"use server";

import { requireAuth } from "@/features/auth/utils/require-auth";
import type { UpdatePasswordActionInput } from "@/shared/actions/update-password/update-password-input";
import type { UpdatePasswordActionOutput } from "@/shared/actions/update-password/update-password-output";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";

export const updatePasswordAction = createAction<
  UpdatePasswordActionInput,
  UpdatePasswordActionOutput
>({
  action: async (input) => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/auth/update-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(input)
    });

    return response.json();
  }
});
