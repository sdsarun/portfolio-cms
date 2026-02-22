import { Box } from "@/shared/layout/box";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function FormManageWorkSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <Box className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-96" />
        </Box>
        <Skeleton className="h-9 w-32" />
      </CardHeader>

      <CardContent className="space-y-4">
        {[1, 2].map((index) => (
          <Box key={index} className="rounded-lg border p-4 space-y-4">
            <Box className="grid grid-cols-12 gap-3">
              <Skeleton className="col-span-12 md:col-span-8 h-9" />
              <Skeleton className="col-span-12 md:col-span-4 h-9" />
              <Skeleton className="col-span-12 md:col-span-6 h-9" />
              <Skeleton className="col-span-12 md:col-span-6 h-9" />
              <Skeleton className="col-span-12 h-9" />
              <Skeleton className="col-span-12 h-24" />
            </Box>

            <Box className="rounded-md border p-3 space-y-3">
              <Skeleton className="h-5 w-32" />
              <Box className="grid w-full grid-cols-2 gap-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </Box>
              <Skeleton className="h-40 w-full" />
            </Box>

            <Box className="rounded-md border p-3 space-y-3">
              <Box className="flex items-center justify-between">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-8 w-24" />
              </Box>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
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
