// components
import Link from "next/link";
import {
  HealthCardItem,
  type HealthCardItemProps
} from "@/features/dashboard/components/health-cards/health-card-item";
import { MessageAlert } from "@/shared/ui/alert";
import { ArrowRight, Globe } from "lucide-react";
import { Box } from "@/shared/layout/box";
import { Button } from "@/shared/ui/button";

// actions
import { getHealthAction } from "@/shared/actions/get-health/get-health-action";
import { getProfileInfoAction } from "@/shared/actions/get-profile-info/get-profile-info-action";

export async function HealthCards() {
  const [health, profileInfo] = await Promise.all([getHealthAction(), getProfileInfoAction()]);

  if (!health.success) {
    return <MessageAlert title="Unable to fetch health" description={health.message} />;
  }

  if (!profileInfo.success) {
    return <MessageAlert title="Unable to fetch health" description={profileInfo.message} />;
  }

  const healthServiceItems: HealthCardItemProps[] = [
    {
      title: "Portfolio Website",
      icon: Globe,
      healthStatus: health.data.services?.portfolioSite === "up" ? "Healthy" : "Down",
      isHealty: health.data.services?.portfolioSite === "up",
      rightContent: (
        <>
          {profileInfo.data.profile.siteUrl && (
            <Button variant="ghost" size="sm">
              <Link
                href={profileInfo.data.profile.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Visit Site <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          )}
        </>
      )
    },
    {
      title: "Data Persistence",
      icon: Globe,
      healthStatus: health.data.services?.database === "up" ? "Connected" : "Down",
      isHealty: health.data.services?.database === "up"
    }
  ];

  return (
    <Box className="grid gap-4 md:grid-cols-2">
      {healthServiceItems.map((service) => (
        <HealthCardItem key={service.title} {...service} />
      ))}
    </Box>
  );
}
