// components
import Link from "next/link";
import { Command } from "lucide-react";
import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/shared/ui/sidebar";
import { Box } from "@/shared/layout/box";
import { Typography } from "@/shared/ui/typography";

export function AuthSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link href="/auth/dashboard">
              <Box className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Command className="size-4" />
              </Box>
              <Box className="grid flex-1 text-left text-sm leading-tight">
                <Typography as="span" className="truncate font-semibold">
                  Portfolio CMS
                </Typography>
              </Box>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
