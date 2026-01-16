import { Main } from "@/shared/layout/main";
import { requireAuth } from "@/shared/auth/required-auth";
import { getDashboardDataAction } from "@/features/dashboard/actions/get-dashboard-action";
import { Button } from "@/shared/ui/button";
import { signOutAction } from "@/features/auth/actions/signout-action";

export type DashboardProps = PageProps<"/auth">;

export async function DashboardPage({}: DashboardProps) {
  await requireAuth();

  const dashboardData = await getDashboardDataAction();
  console.log("[LOG] - dashboard.tsx:13 - DashboardPage - dashboardData:", dashboardData);
  return (
    <Main variants="authPage">
      <h1>dashboard page</h1>
      <Button
        onClick={async () => {
          "use server";
          await signOutAction();
        }}
      >
        Sign Out
      </Button>
      <Button
        onClick={async () => {
          "use server";
          await getDashboardDataAction();
        }}
      >
        Fetch
      </Button>
      <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
    </Main>
  );
}
