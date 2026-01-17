"use server";

// components
import {
  MenuCardItem,
  MenuCardItemProps
} from "@/features/dashboard/components/menu-cards/menu-card-item";
import { MessageAlert } from "@/shared/ui/alert";
import { Monitor, Briefcase, FileText, Phone } from "lucide-react";
import { Box } from "@/shared/layout/box";

// actions
import { getLatestUpdatedAction } from "@/features/dashboard/actions/get-latest-updated/get-latest-updated-action";

export async function MenuCards() {
  const latestUpdated = await getLatestUpdatedAction();
  if (!latestUpdated.success) {
    return <MessageAlert title="Unable to fetch data" description={latestUpdated.message} />;
  }

  const menuCardItems: MenuCardItemProps[] = [
    {
      title: "Home Page",
      description: "Manage your personal brand, introduction, and bio.",
      icon: Monitor,
      href: "/auth/manage/home",
      lastUpdated: latestUpdated.data?.info
    },
    {
      title: "Work & Projects",
      description: "Showcase your best work and case studies.",
      icon: Briefcase,
      href: "/auth/manage/work",
      lastUpdated: latestUpdated.data?.work
    },
    {
      title: "Resume & CV",
      description: "Update your experience, education and skills.",
      icon: FileText,
      href: "/auth/manage/resume",
      lastUpdated: latestUpdated.data?.resume
    },
    {
      title: "Contact Info",
      description: "Manage how people can reach you.",
      icon: Phone,
      href: "/auth/manage/contact",
      lastUpdated: latestUpdated.data?.contact
    }
  ];

  return (
    <Box as="section" className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {menuCardItems.map((item) => (
        <MenuCardItem key={item.href} {...item} />
      ))}
    </Box>
  );
}
