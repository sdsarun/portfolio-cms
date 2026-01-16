import React from "react";
import { Toaster } from "@/shared/ui/sonner";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
