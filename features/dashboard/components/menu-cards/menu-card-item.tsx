// components
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/shared/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { Box } from "@/shared/layout/box";
import { Typography } from "@/shared/ui/typography";

// utils
import { DateFormatter } from "@/shared/utils/formatter/date-formatter";

export type MenuCardItemProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className: string }>;
  href: string;
  lastUpdated?: string | null;
};

export function MenuCardItem({ title, description, icon: Icon, href, lastUpdated }: MenuCardItemProps) {
  return (
    <Link href={href}>
      <Card className="group flex flex-col justify-between transition-all hover:shadow-lg hover:border-primary/20 h-full pb-0">
        <CardHeader>
          <Box className="flex items-start justify-between">
            <Box className="p-2.5 rounded-xl bg-muted/50 text-foreground transition-colors">
              <Icon className="h-6 w-6" />
            </Box>
            <Box className="flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Box>
          </Box>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-base line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter className="pt-0 pb-4">
          <Box className="flex items-center gap-2 text-xs text-muted-foreground w-full pt-4 border-t mt-2">
            <Clock className="h-3.5 w-3.5" />
            <Typography as="span">
              {`Updated ${lastUpdated ? DateFormatter.format(lastUpdated, { day: "numeric", month: "long", year: "numeric" }) : "never"}`}
            </Typography>
          </Box>
        </CardFooter>
      </Card>
    </Link>
  );
}
