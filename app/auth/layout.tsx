import { AuthLayout as Layout } from "@/features/auth/components/layout/auth";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return <>{children}</>;
}
