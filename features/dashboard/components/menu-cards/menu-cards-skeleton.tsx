// components
import { Box } from "@/shared/layout/box";
import { Card, CardHeader, CardContent, CardFooter } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function MenuCardsSkeleton() {
  return (
    <Box as="section" className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="flex flex-col h-full pb-0">
          <CardHeader>
            <Box className="flex items-start justify-between">
              <Skeleton className="h-11 w-11 rounded-xl" />
              <Skeleton className="h-8 w-8 rounded-md opacity-20" />
            </Box>
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </CardHeader>
          <CardContent />
          <CardFooter className="pt-0 pb-4">
            <div className="w-full pt-4 mt-2 border-t">
              <Skeleton className="h-4 w-32" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </Box>
  );
}
