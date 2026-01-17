// components
import { Skeleton } from "@/shared/ui/skeleton";
import { Card, CardAction, CardHeader } from "@/shared/ui/card";
import { Box } from "@/shared/layout/box";

export function HealthCardSkeleton() {
  return (
    <Box as="section" className="grid gap-4 md:grid-cols-2">
      {[1, 2].map((i) => (
        <Card key={i} className="py-4">
          <CardHeader>
            <Box className="row-span-2 flex gap-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Box className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </Box>
            </Box>
            <CardAction className="self-center-safe">
              <Skeleton className="h-8 w-24" />
            </CardAction>
          </CardHeader>
        </Card>
      ))}
    </Box>
  );
}
