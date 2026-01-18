// actions
import { requireAuth } from "@/features/auth/utils/require-auth";

export type RequireAuthProps = React.PropsWithChildren;

export async function RequireAuth({ children }: RequireAuthProps) {
  await requireAuth();
  return children;
}
