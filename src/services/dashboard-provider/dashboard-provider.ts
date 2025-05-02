import { DashboardMetrics } from "@application/dto";

export interface DashboardProvider {
  fetchMetrics(): Promise<DashboardMetrics>
}