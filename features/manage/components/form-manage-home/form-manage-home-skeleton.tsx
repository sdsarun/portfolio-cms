import { Box } from "@/shared/layout/box";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function FormManageHomeSkeleton() {
  return (
    <Box className="space-y-6 h-full flex flex-col">
      <Box className="flex-1 space-y-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Box className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </Box>
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
