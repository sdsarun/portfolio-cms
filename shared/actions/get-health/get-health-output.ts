export type HealthServiceStatus = "up" | "down";
export type HealthServices = {
  database: HealthServiceStatus;
  portfolioSite: HealthServiceStatus;
};
export type HealthActionOutput = {
  ts: number;
  services: HealthServices;
};
