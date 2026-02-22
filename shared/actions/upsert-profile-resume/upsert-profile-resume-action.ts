"use server";

// http
import { portfolioApi } from "@/shared/http/server-http-client";

// actions
import { requireAuth } from "@/features/auth/utils/require-auth";
import { createAction } from "@/shared/utils/action/create-action";
import type { UpsertProfileResumeActionInput } from "@/shared/actions/upsert-profile-resume/upsert-profile-resume-input";
import type { UpsertProfileResumeActionOutput } from "@/shared/actions/upsert-profile-resume/upsert-profile-resume-output";
import { revalidateTag } from "next/cache";
import { CacheActionTags } from "@/shared/actions/cache-action-tags";

export const upsertProfileResumeAction = createAction<
  UpsertProfileResumeActionInput,
  UpsertProfileResumeActionOutput
>({
  action: async (input) => {
    const auth = await requireAuth();
    const response = await portfolioApi("/v1/profile/resume", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      body: JSON.stringify(input)
    });

    revalidateTag(CacheActionTags.GetProfileResume, "max");
    revalidateTag(CacheActionTags.GetProfileLatestUpdated, "max");

    return response.json();
  }
});
