// components
import { AuthMainHeader } from "@/features/auth/components/layout/auth-main-header";
import { AuthSidebarContent } from "@/features/auth/components/layout/auth-sidebar-content";
import { AuthSidebarFooter } from "@/features/auth/components/layout/auth-sidebar-footer";
import { AuthSidebarHeader } from "@/features/auth/components/layout/auth-sidebar-header";
import { Sidebar, SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider style={{ "--sidebar-width": "13rem" } as React.CSSProperties}>
      <Sidebar collapsible="icon">
        <AuthSidebarHeader />
        <AuthSidebarContent />
        <AuthSidebarFooter />
      </Sidebar>
      <SidebarInset>
        <AuthMainHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
