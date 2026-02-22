"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Box } from "@/shared/layout/box";
import { Button } from "@/shared/ui/button";
import { type TextInputProps, TextInput } from "@/shared/ui/form/inputs/text-input";

export type PasswordInputProps = TextInputProps & {
  toggleLabel?: string;
};

export function PasswordInput({ toggleLabel = "Toggle password visibility", ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box className="relative">
      <TextInput {...props} type={isVisible ? "text" : "password"} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        {isVisible ?
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        : <Eye className="h-4 w-4 text-muted-foreground" />}
        <span className="sr-only">{toggleLabel}</span>
      </Button>
    </Box>
  );
}
