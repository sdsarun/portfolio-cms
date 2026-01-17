// components
import { Header } from "@/shared/layout/header";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { AuthBreadcrumbIndicator } from "@/features/auth/components/layout/auth-breadcrumb-indicator";

export function AuthMainHeader() {
  return (
    <Header className="sticky top-0 bg-background flex h-12 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <AuthBreadcrumbIndicator />
    </Header>
  );
}
