import { Box } from "@/shared/layout/box";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function ManageApiKeysSkeleton() {
  return (
    <Box className="space-y-6">
      <Box className="flex items-center justify-end">
        <Skeleton className="h-9 w-36" />
      </Box>

      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-72" />
        </CardHeader>

        <CardContent className="space-y-4">
          <Box className="rounded-md border">
            <Box className="grid grid-cols-12 gap-2 px-4 py-3">
              <Skeleton className="col-span-5 md:col-span-4 h-4" />
              <Skeleton className="hidden md:block md:col-span-3 h-4" />
              <Skeleton className="col-span-3 md:col-span-2 h-4" />
              <Skeleton className="col-span-4 md:col-span-3 h-4" />
            </Box>
            <Box className="border-t px-4 py-3">
              <Skeleton className="h-14 w-full" />
            </Box>
            <Box className="border-t px-4 py-3">
              <Skeleton className="h-14 w-full" />
            </Box>
            <Box className="border-t px-4 py-3">
              <Skeleton className="h-14 w-full" />
            </Box>
          </Box>

          <Box className="flex items-center justify-between gap-4 border-t pt-4">
            <Skeleton className="h-4 w-36" />
            <Box className="flex items-center gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
