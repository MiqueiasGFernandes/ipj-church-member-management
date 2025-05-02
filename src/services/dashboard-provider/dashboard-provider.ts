export type DashboardMetrics = {
  totalMembers: number,
  frequenterMembers: number,
  requests: number,
}

export interface DashboardProvider {
  fetchMetrics(): Promise<DashboardMetrics>
}