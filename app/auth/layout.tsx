import { AuthLayout as Layout } from "@/features/auth/components/layout/auth-layout";

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return <Layout>{children}</Layout>;
}
