// components
import { AuthSidebarContent } from "@/features/auth/components/layout/auth-sidebar-content";
import { AuthSidebarFooter } from "@/features/auth/components/layout/auth-sidebar-footer";
import { AuthSidebarHeader } from "@/features/auth/components/layout/auth-sidebar-header";
import { Header } from "@/shared/layout/header";
import { Separator } from "@/shared/ui/separator";
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider style={{ "--sidebar-width": "13rem" } as React.CSSProperties}>
      <Sidebar collapsible="icon">
        <AuthSidebarHeader />
        <AuthSidebarContent />
        <AuthSidebarFooter />
      </Sidebar>
      <SidebarInset>
        <Header className="sticky top-0 bg-background flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentPath?.label || "Dashboard"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
        </Header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
