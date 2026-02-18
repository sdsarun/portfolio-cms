"use server";

// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import { requireAuth } from "@/features/auth/utils/require-auth";
import { createAction } from "@/shared/utils/action/create-action";
import type { UpdateHomeActionInput } from "@/shared/actions/update-home/update-home-input";
import type { UpdateHomeActionOutput } from "@/shared/actions/update-home/update-home-output";
import { revalidateTag } from "next/cache";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";

export const updateHomeAction = createAction<UpdateHomeActionInput, UpdateHomeActionOutput>({
  action: async (input) => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/info", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(input)
    });

    revalidateTag(CacheActionTags.GetProfileLatestUpdated, "max");

    return response.json();
  }
});
