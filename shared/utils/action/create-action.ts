import "server-only";

import { HttpClientError } from "@/shared/http/http-client";
import { isRedirectError, RedirectType } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

const RESOLVE_ERROR_MESSAGE_KEYS: string[] = ["message", "detail"];

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

export type ActionFunction<TInput = void, TOutput = void> = (input: TInput) => Promise<TOutput>;

export type ActionAuthOptions = {
  redirectIfUnAuthorize?: boolean;
};

export type CreateActionOptions<TInput = void, TOutput = void> = {
  action: ActionFunction<TInput, TOutput>;
  auth?: ActionAuthOptions;
};

export function createAction<TOutput>(
  options: CreateActionOptions<void, TOutput>
): () => Promise<ActionOutput<TOutput>>;

export function createAction<TInput, TOutput>(
  options: CreateActionOptions<TInput, TOutput>
): (input: TInput) => Promise<ActionOutput<TOutput>>;

export function createAction<TInput = void, TOutput = void>({
  action,
  auth
}: CreateActionOptions<TInput, TOutput>) {
  const { redirectIfUnAuthorize = false } = auth || {};

  const wrappedAction = async (input: TInput): Promise<ActionOutput<TOutput>> => {
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
          if (typeof errorResult === "object" && errorResult !== null) {
            for (const errorKey of RESOLVE_ERROR_MESSAGE_KEYS) {
              if (errorKey in errorResult) {
                const potentialMessage = (errorResult as Record<string, unknown>)[errorKey];
                if (typeof potentialMessage === "string") {
                  message = potentialMessage;
                  break;
                }
              }
            }
          }
        }
      } else if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else {
        message = "Unexpected error";
      }
      return { success: false, message };
    }
  };
  return wrappedAction as TInput extends void ? () => Promise<ActionOutput<TOutput>>
  : (input: TInput) => Promise<ActionOutput<TOutput>>;
}
