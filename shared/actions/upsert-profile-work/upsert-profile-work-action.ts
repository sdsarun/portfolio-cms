"use server";

import { revalidateTag } from "next/cache";

import { requireAuth } from "@/features/auth/utils/require-auth";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";
import type { UpsertProfileWorkActionInput } from "@/shared/actions/upsert-profile-work/upsert-profile-work-input";
import type { UpsertProfileWorkActionOutput } from "@/shared/actions/upsert-profile-work/upsert-profile-work-output";

export const upsertProfileWorkAction = createAction<
  UpsertProfileWorkActionInput,
  UpsertProfileWorkActionOutput
>({
  action: async (input) => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/work", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(input)
    });

    revalidateTag(CacheActionTags.GetProfileWork, "max");
    revalidateTag(CacheActionTags.GetProfileLatestUpdated, "max");

    return response.json();
  }
});
