"use client";

// components
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/shared/ui/breadcrumb";

// hooks
import { useAuthSidebar } from "@/features/auth/hooks/use-auth-sidebar";

export function AuthBreadcrumbIndicator() {
  const { currentPath } = useAuthSidebar();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/auth">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {currentPath?.label && (
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPath?.label}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
