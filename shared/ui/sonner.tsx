"use client";

import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { toast as sonnerToast, Toaster as Sonner, type ToasterProps } from "sonner";

export type ToastId = string | number;

export type ToastPromiseMessages<T> = {
  loading: React.ReactNode;
  success: (data: T) => React.ReactNode;
  error: React.ReactNode;
};

export interface ToastAPI {
  success(message: React.ReactNode): ToastId;
  error(message: React.ReactNode): ToastId;
  info(message: React.ReactNode): ToastId;
  warning(message: React.ReactNode): ToastId;
  loading(message: React.ReactNode): ToastId;
  dismiss(id?: ToastId): void;
  promise<T>(promise: Promise<T>, messages: ToastPromiseMessages<T>): ToastId;
}

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"light"}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />
      }}
      toastOptions={{}}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)"
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

const toast: ToastAPI = {
  success(message) {
    return sonnerToast.success(message) as ToastId;
  },
  error(message) {
    return sonnerToast.error(message, {
      style: {
        "--normal-bg": "color-mix(in oklab, var(--destructive) 10%, var(--background))",
        "--normal-text": "var(--destructive)",
        "--normal-border": "transparent"
      } as React.CSSProperties
    }) as ToastId;
  },
  info(message) {
    return sonnerToast.info(message) as ToastId;
  },
  warning(message) {
    return sonnerToast.warning(message) as ToastId;
  },
  loading(message) {
    return sonnerToast.loading(message) as ToastId;
  },
  dismiss(id) {
    sonnerToast.dismiss(id);
  },
  promise(promise, messages) {
    return sonnerToast.promise(promise, messages) as ToastId;
  }
};

export { Toaster, toast };
