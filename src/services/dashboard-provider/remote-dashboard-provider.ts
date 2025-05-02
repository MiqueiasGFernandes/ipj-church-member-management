import axios from 'axios';
import { DashboardMetrics, DashboardProvider } from './dashboard-provider';

export class RemoteDashboardProvider implements DashboardProvider {
  async fetchMetrics(): Promise<DashboardMetrics> {
    const url = `${process.env.REACT_APP_API_URL}/dashboard`;
    const authorization = { authorization: `Bearer ${localStorage.getItem('token')}` };
    const { data } = await axios.get(url, { headers: { ...authorization } });
    return Promise.resolve(data);  
  }
};

export default RemoteDashboardProvider;
