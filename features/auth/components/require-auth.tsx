// actions
import { requireAuth } from "@/shared/auth/required-auth";

export type RequireAuthProps = React.PropsWithChildren;

export async function RequireAuth({ children }: RequireAuthProps) {
  await requireAuth();
  return children;
}
