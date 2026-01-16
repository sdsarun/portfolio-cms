import "server-only";

import { HttpClientError } from "@/shared/http/http-client";
import { isRedirectError, RedirectType } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export type ActionInput<TInput = void> = TInput extends void ? void : TInput;

export type ActionOutputSuccess<TOutput = void> = {
  success: true;
  data: TOutput extends void ? null : TOutput;
};

export type ActionOutputFailure = {
  success: false;
  message: string;
};

export type ActionOutput<TOutput = void> = ActionOutputSuccess<TOutput> | ActionOutputFailure;

export type ActionFunction<TInput = void, TOutput = void> =
  TInput extends void ? () => Promise<TOutput> : (input: ActionInput<TInput>) => Promise<TOutput>;

export type ActionAuthOptions = {
  redirectIfUnAuthorize?: boolean;
};

export type CreateActionOptions<TInput = void, TOutput = void> = {
  action: ActionFunction<TInput, TOutput>;
  auth?: ActionAuthOptions;
};

const RESOLVE_ERROR_MESSAGE_KEYS: string[] = ["message", "detail"];

export function createAction<TInput = void, TOutput = void>({
  action,
  auth
}: CreateActionOptions<TInput, TOutput>) {
  const { redirectIfUnAuthorize = false } = auth || {};
  return async (input: ActionInput<TInput>): Promise<ActionOutput<TOutput>> => {
    try {
      const result = await action(input);
      return {
        success: true,
        data: (result === undefined ? null : result) as ActionOutputSuccess<TOutput>["data"]
      };
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
      let message: string = "Unknown error";
      if (error instanceof HttpClientError) {
        if (error.response) {
          const responseStatus = error.response.status;
          if (responseStatus === 401 && redirectIfUnAuthorize) {
            redirect("/", RedirectType.replace);
          }

          const errorResult = await error.response.json();
          if (typeof errorResult === "object") {
            for (const errorKey in errorResult) {
              if (RESOLVE_ERROR_MESSAGE_KEYS.includes(errorKey)) {
                message = errorResult[errorKey];
              }
            }
          }
        }
      } else if (error instanceof Error) {
        message = error.message;
      } else {
        message = "Unexpected error";
      }
      return { success: false, message };
    }
  };
}
