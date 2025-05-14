import { DashboardMetrics } from "@application/dto";

export interface IDashboardGetIndicators {
  execute(): Promise<DashboardMetrics>
}