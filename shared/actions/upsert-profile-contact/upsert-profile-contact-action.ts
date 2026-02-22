"use server";

import { revalidateTag } from "next/cache";

import { requireAuth } from "@/features/auth/utils/require-auth";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";
import { portfolioApi } from "@/shared/http/server-http-client";
import { createAction } from "@/shared/utils/action/create-action";
import type { UpsertProfileContactActionInput } from "@/shared/actions/upsert-profile-contact/upsert-profile-contact-input";
import type { UpsertProfileContactActionOutput } from "@/shared/actions/upsert-profile-contact/upsert-profile-contact-output";

export const upsertProfileContactAction = createAction<
  UpsertProfileContactActionInput,
  UpsertProfileContactActionOutput
>({
  action: async (input) => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/contact", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(input)
    });

    revalidateTag(CacheActionTags.GetProfileContact, "max");
    revalidateTag(CacheActionTags.GetProfileLatestUpdated, "max");

    return response.json();
  }
});
