import { Box } from "@/shared/layout/box";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function FormManageContactSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <Box className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-80" />
        </Box>
        <Skeleton className="h-9 w-32" />
      </CardHeader>

      <CardContent className="space-y-4">
        {[1, 2, 3].map((index) => (
          <Box key={index} className="rounded-lg border p-4 space-y-3">
            <Box className="grid grid-cols-12 gap-3">
              <Skeleton className="col-span-12 md:col-span-3 h-9" />
              <Skeleton className="col-span-12 md:col-span-3 h-9" />
              <Skeleton className="col-span-12 md:col-span-4 h-9" />
              <Skeleton className="col-span-12 md:col-span-2 h-9" />
            </Box>
            <Box className="flex justify-end gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </Box>
          </Box>
        ))}

        <Box className="flex justify-end gap-2 border-t pt-4">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
        </Box>
      </CardContent>
    </Card>
  );
}
