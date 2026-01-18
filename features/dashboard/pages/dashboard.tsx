// components
import { Suspense } from "react";
import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { MenuCards } from "@/features/dashboard/components/menu-cards/menu-cards";
import { MenuCardsSkeleton } from "@/features/dashboard/components/menu-cards/menu-cards-skeleton";
import { HealthCards } from "@/features/dashboard/components/health-cards/health-cards";
import { HealthCardSkeleton } from "@/features/dashboard/components/health-cards/health-card-skeleton";
import { Box } from "@/shared/layout/box";
import { Typography } from "@/shared/ui/typography";

// actions
import { requireAuth } from "@/shared/auth/required-auth";
import { HealthTimestamp } from "@/features/dashboard/components/health-cards/health-timestamp";
import { Skeleton } from "@/shared/ui/skeleton";

export type DashboardProps = PageProps<"/auth">;

export async function DashboardPage({}: DashboardProps) {
  await requireAuth();
  return (
    <AuthMainContent
      title="Dashboard"
      description="Manage your portfolio content and check system status."
      classNames={{
        root: "flex flex-col gap-6"
      }}
    >
      <Suspense fallback={<MenuCardsSkeleton />}>
        <MenuCards />
      </Suspense>
      <Box as="section" className="flex flex-col gap-4">
        <Box className="flex items-center justify-between">
          <Typography className="text-xl font-semibold tracking-tight">System Health</Typography>
          <Suspense fallback={<Skeleton className="h-6 w-2xs" />}>
            <HealthTimestamp />
          </Suspense>
        </Box>
        <Suspense fallback={<HealthCardSkeleton />}>
          <HealthCards />
        </Suspense>
      </Box>
    </AuthMainContent>
  );
}
