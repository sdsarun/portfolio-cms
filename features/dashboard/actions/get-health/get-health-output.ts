export type HealthServiceStatus = "up" | "down";
export type Health = {
  ts: number;
  services: { database: HealthServiceStatus; portfolioSite: HealthServiceStatus };
};
