import { Box } from "@/shared/layout/box";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/ui/class-merge";
import { DotPing } from "@/shared/ui/dot-ping";
import { Typography } from "@/shared/ui/typography";

export type HealthCardItemProps = {
  title: string;
  icon: React.ComponentType<{ className: string }>;
  healthStatus?: React.ReactNode;
  isHealty?: boolean;
  rightContent?: React.ReactNode;
};

export function HealthCardItem({
  icon: Icon,
  title,
  healthStatus,
  isHealty,
  rightContent
}: HealthCardItemProps) {
  return (
    <Card className="py-4">
      <CardHeader>
        <Box className="row-span-2  flex gap-2">
          <Box className="flex h-9 w-9 items-center justify-center rounded-full bg-muted/50">
            <Icon className="h-4 w-4 text-foreground" />
          </Box>
          <Box className="flex flex-col">
            <CardTitle className="text-sm">{title}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <DotPing
                className={cn({
                  "bg-emerald-500": isHealty,
                  "bg-red-600": !isHealty
                })}
              />
              <Typography
                as="span"
                className={cn("font-semibold text-xs", {
                  "text-emerald-500": isHealty,
                  "text-red-600": !isHealty
                })}
              >
                {healthStatus}
              </Typography>
            </CardDescription>
          </Box>
        </Box>
        {rightContent && <CardAction className="self-center-safe">{rightContent}</CardAction>}
      </CardHeader>
    </Card>
  );
}
