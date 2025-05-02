import { DashboardMetrics } from "@presentation/dto";

export interface DashboardProvider {
  fetchMetrics(): Promise<DashboardMetrics>
}