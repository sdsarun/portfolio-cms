// components
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/shared/ui/card";
import { ArrowRight } from "lucide-react";
import { Box } from "@/shared/layout/box";

// utils
import { BadgeTimestamp } from "@/shared/ui/badge/badge-timestamp";

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
          <BadgeTimestamp
            classNames={{
              root: "border-t mt-2 w-full border-t bg-background rounded-none pt-4"
            }}
            timestamp={lastUpdated}
          />
        </CardFooter>
      </Card>
    </Link>
  );
}
