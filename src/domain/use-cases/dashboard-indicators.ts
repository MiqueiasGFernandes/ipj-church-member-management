import { DashboardMetrics } from "@presentation/dto";

export interface DashboardIndicators {
  getMetrics(): Promise<DashboardMetrics>
}