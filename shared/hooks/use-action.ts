import { useState } from "react";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export type UseActionOutput<TInput, TOutput> = {
  execute: (input: TInput) => Promise<TOutput>;
  isLoading: boolean;
};

export function useAction<TInput, TOutput>(
  action: (input: TInput) => TOutput
): UseActionOutput<TInput, TOutput> {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = async (input: TInput): Promise<TOutput> => {
    setIsLoading(true);
    try {
      const result = await action(input);
      return result;
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
      return error as TOutput;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    execute,
    isLoading
  };
}
