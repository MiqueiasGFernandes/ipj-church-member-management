import { DashboardMetrics } from "@application/dto";

export interface IDashboardGetIndicators {
  getMetrics(): Promise<DashboardMetrics>
}