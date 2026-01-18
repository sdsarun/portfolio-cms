// components
import { BadgeTimestamp } from "@/shared/ui/badge/badge-timestamp";

// actions
import { getHealthAction } from "@/shared/actions/get-health/get-health-action";

export async function HealthTimestamp() {
  const health = await getHealthAction();
  return <BadgeTimestamp timestamp={health.success ? health.data.ts : null} />;
}
