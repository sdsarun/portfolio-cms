import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { Card, CardHeader, CardContent, CardFooter } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export default function Loading() {
  return (
    <AuthMainContent>
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-64 md:w-96" />
        </div>
      </div>

      {/* Main Modules Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-12">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="flex flex-col h-full">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <Skeleton className="h-8 w-8 rounded-md opacity-20" />
              </div>
              <Skeleton className="mt-4 h-6 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-5/6" />
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter className="pt-0 pb-4">
              <div className="w-full pt-4 border-t mt-2">
                <Skeleton className="h-4 w-32" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* System Health Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthMainContent>
  );
}
