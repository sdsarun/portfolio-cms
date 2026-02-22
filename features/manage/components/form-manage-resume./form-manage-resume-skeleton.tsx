import { Box } from "@/shared/layout/box";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function FormManageResumeSkeleton() {
  return (
    <Box className="space-y-6">
      <Box className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-36 w-full" />
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box className="flex justify-end">
        <Skeleton className="h-9 w-32" />
      </Box>
    </Box>
  );
}
