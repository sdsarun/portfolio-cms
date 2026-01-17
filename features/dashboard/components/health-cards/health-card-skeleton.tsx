// components
import { Skeleton } from "@/shared/ui/skeleton";
import { Card, CardContent } from "@/shared/ui/card";
import { Box } from "@/shared/layout/box";

export function HealthCardSkeleton() {
  return (
    <Box as="section" className="grid gap-4 md:grid-cols-2">
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardContent className="p-4 flex items-center justify-between">
            <Box className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Box className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </Box>
            </Box>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
