// components
import { AuthLayout as Layout } from "@/features/auth/components/layout/auth-layout";
import { RequireAuth } from "@/features/auth/components/require-auth";

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return (
    <RequireAuth>
      <Layout>{children}</Layout>;
    </RequireAuth>
  );
}
