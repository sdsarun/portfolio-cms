// components
import { Box } from "@/shared/layout/box";
import { Typography } from "@/shared/ui/typography";
import { Clock } from "lucide-react";
import { cn } from "@/shared/ui/class-merge";

// utils
import { DateFormatter } from "@/shared/utils/formatter/date-formatter";

export type BadgeTimestampProps = {
  timestamp?: string | number | null;
  classNames?: {
    root?: string;
    clock?: string;
    text?: string;
  };
};

export function BadgeTimestamp({ timestamp, classNames }: BadgeTimestampProps) {
  return (
    <Box
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full",
        classNames?.root
      )}
    >
      <Clock className={cn("h-3 w-3", classNames?.clock)} />
      <Typography as="span" className={classNames?.text}>
        {`Updated ${timestamp ? DateFormatter.format(timestamp, { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric" }) : "never"}`}
      </Typography>
    </Box>
  );
}
