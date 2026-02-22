"use client";

import { Check, Copy } from "lucide-react";
import { Box } from "@/shared/layout/box";
import { Button } from "@/shared/ui/button";

type CodeBlockProps = {
  value: string;
  isCopied?: boolean;
  onCopy?: () => Promise<void> | void;
};

export function CodeBlock({ value, isCopied = false, onCopy }: CodeBlockProps) {
  return (
    <Box className="flex items-center justify-between gap-2 rounded bg-muted px-3 py-2">
      <Box as="code" className="text-xs break-all">
        {value}
      </Box>
      {onCopy && (
        <Button type="button" variant="ghost" size="icon" onClick={onCopy}>
          {isCopied ?
            <Check className="h-4 w-4 text-green-600" />
          : <Copy className="h-4 w-4" />}
        </Button>
      )}
    </Box>
  );
}
