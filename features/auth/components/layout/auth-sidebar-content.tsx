"use client";

// components
import Link from "next/link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/shared/ui/sidebar";
import { Typography } from "@/shared/ui/typography";

// hooks
import { useAuthSidebar } from "@/features/auth/hooks/use-auth-sidebar";

export function AuthSidebarContent() {
  const { currentPath, menuItems } = useAuthSidebar();
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    item.path === currentPath?.path ||
                    (typeof currentPath?.alias !== "undefined" && item?.alias === currentPath?.alias)
                  }
                >
                  <Link href={item.path}>
                    <item.icon />
                    <Typography as="span" variant="p0">
                      {item.label}
                    </Typography>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
