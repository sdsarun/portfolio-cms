import { Box } from "@/shared/layout/box";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function FormManageSettingsSkeleton() {
  return (
    <Box className="space-y-6">
      <Skeleton className="h-px w-full rounded-none" />

      <Box className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="lg:w-1/6">
          <Skeleton className="h-10 w-full" />
        </aside>

        <Box className="flex-1">
          <Box className="max-w-4xl space-y-6">
            <Card>
              <CardHeader className="space-y-2">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-5 w-[32rem] max-w-full" />
              </CardHeader>

              <CardContent className="space-y-4">
                <Box className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-9 w-full" />
                </Box>

                <Box className="grid gap-4 sm:grid-cols-2">
                  <Box className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-9 w-full" />
                  </Box>

                  <Box className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-9 w-full" />
                  </Box>
                </Box>

                <Skeleton className="h-4 w-64" />
              </CardContent>

              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Box className="flex w-full items-center justify-between gap-4">
                  <Skeleton className="h-4 w-56" />
                  <Box className="flex items-center gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-36" />
                  </Box>
                </Box>
              </CardFooter>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
