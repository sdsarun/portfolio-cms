"use client";

// core
import { usePathname } from "next/navigation";

// components
import { LayoutDashboard, Monitor, FileText, Briefcase, Phone, Key, Settings } from "lucide-react";

// hooks
import { useSidebar } from "@/shared/ui/sidebar";

export type MenuItem = {
  icon: React.ComponentType;
  label: string;
  path: string;
  alias?: string;
};

export function useAuthSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/auth", alias: "/auth/dashboard" },
    { icon: Monitor, label: "Home", path: "/auth/manage/home" },
    { icon: FileText, label: "Resume", path: "/auth/manage/resume" },
    { icon: Briefcase, label: "Work", path: "/auth/manage/work" },
    { icon: Phone, label: "Contact", path: "/auth/manage/contact" },
    { icon: Key, label: "API Keys", path: "/auth/manage/api-keys" },
    { icon: Settings, label: "Settings", path: "/auth/manage/settings" }
  ];

  const currentPath = menuItems.find((item) => item.path === pathname || item?.alias === pathname);

  return {
    expanded: state === "expanded",
    menuItems,
    currentPath
  };
}
