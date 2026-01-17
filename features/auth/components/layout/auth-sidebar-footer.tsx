// components
import { SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/shared/ui/sidebar";
import { Typography } from "@/shared/ui/typography";
import { LogOut } from "lucide-react";

// actions
import { signOutAction } from "@/shared/actions/signout/signout-action";

export function AuthSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={signOutAction} className="hover:cursor-pointer">
            <LogOut />
            <Typography as="span" variant="p0">
              Logout
            </Typography>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
