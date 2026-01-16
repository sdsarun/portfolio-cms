"use client";

import { Box } from "@/shared/layout/box";
import { Header } from "@/shared/layout/header";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/shared/ui/breadcrumb";
import { Separator } from "@/shared/ui/separator";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger
} from "@/shared/ui/sidebar";
import {
  LayoutDashboard,
  Monitor,
  FileText,
  Briefcase,
  Phone,
  Key,
  Settings,
  Link,
  Command,
  LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Monitor, label: "Home Page", path: "/home-editor" },
    { icon: FileText, label: "Resume", path: "/resume" },
    { icon: Briefcase, label: "Work", path: "/work" },
    { icon: Phone, label: "Contact", path: "/contact" },
    { icon: Key, label: "API Keys", path: "/api-keys" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  const currentPath = menuItems.find((i) => i.path === pathname);

  return (
    <SidebarProvider style={{ "--sidebar-width": "13rem" } as React.CSSProperties}>
      <SidebarInset></SidebarInset>
    </SidebarProvider>
  );
}
