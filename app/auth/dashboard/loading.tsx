// components
import { AuthPageLoadingShell } from "@/features/auth/components/loading/auth-page-loading-shell";
import { HealthCardSkeleton } from "@/features/dashboard/components/health-cards/health-card-skeleton";
import { MenuCardsSkeleton } from "@/features/dashboard/components/menu-cards/menu-cards-skeleton";
import { Box } from "@/shared/layout/box";
import { Typography } from "@/shared/ui/typography";

export default function DashboardPageLoading() {
  return (
    <AuthPageLoadingShell
      title="Dashboard"
      description="Manage your portfolio content and check system status."
    >
      <MenuCardsSkeleton />
      <Box as="section" className="flex flex-col gap-4">
        <Typography className="text-xl font-semibold tracking-tight">System Health</Typography>
        <HealthCardSkeleton />
      </Box>
    </AuthPageLoadingShell>
  );
}
