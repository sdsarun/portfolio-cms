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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

// hooks
import { useAuthSidebar } from "@/features/auth/hooks/use-auth-sidebar";

export function AuthSidebarContent() {
  const { expanded, currentPath, menuItems } = useAuthSidebar();
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <Tooltip open={expanded ? false : undefined}>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      isActive={
                        item.path === currentPath?.path ||
                        (typeof currentPath?.alias !== "undefined" && item?.alias === currentPath?.alias)
                      }
                      asChild
                    >
                      <Link href={item.path}>
                        <item.icon />
                        <Typography as="span" variant="p0">
                          {item.label}
                        </Typography>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">asdfsdf</TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
