"use client";

import { useState } from "react";

export type ModalState<TPayload> = {
  isOpen: boolean;
  payload: TPayload;
};

export type UseModalStateInitializeOptions<TPayload> = {
  isOpen?: boolean;
  payload: TPayload;
};

export type UseModalStateOutput<TPayload> = {
  state: ModalState<TPayload>;
  open: (payload?: TPayload) => void;
  close: (payload?: TPayload) => void;
};

export function useModalState<TPayload>(
  options: UseModalStateInitializeOptions<TPayload>
): UseModalStateOutput<TPayload> {
  const [state, setState] = useState<ModalState<TPayload>>({
    isOpen: options.isOpen ?? false,
    payload: options.payload
  });

  const open = (payload?: TPayload) => {
    setState((prevState) => ({
      isOpen: true,
      payload: payload ?? prevState.payload
    }));
  };

  const close = (payload?: TPayload) => {
    setState((prevState) => ({
      isOpen: false,
      payload: payload ?? prevState.payload
    }));
  };

  return {
    state,
    open,
    close
  };
}
