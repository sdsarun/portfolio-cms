import { Main } from "@/shared/layout/main";
import { requireAuth } from "@/shared/auth/required-auth";
import { getDashboardDataAction } from "@/features/dashboard/actions/get-dashboard-action";
import { Button } from "@/shared/ui/button";
import { signOutAction } from "@/features/auth/actions/signout-action";

export type DashboardProps = PageProps<"/auth">;

export async function DashboardPage({}: DashboardProps) {
  await requireAuth();
  return (
    <Main variant="authPage">
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
    </Main>
  );
}
