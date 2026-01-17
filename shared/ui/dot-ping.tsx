// components
import { cn } from "@/shared/ui/class-merge";
import { Box, BoxProps } from "@/shared/layout/box";

export type DotPingProps = Omit<BoxProps, "as"> & {};

export function DotPing({ className, ...props }: DotPingProps) {
  return (
    <Box
      as="span"
      className={cn("relative inline-block size-2 rounded-full bg-foreground", className)}
      {...props}
    >
      <Box
        as="span"
        className={cn(
          "absolute h-full w-full inset-0 animate-ping opacity-75 bg-foreground rounded-full",
          className
        )}
      />
    </Box>
  );
}
