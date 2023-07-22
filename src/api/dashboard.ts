import { Dashboard } from '@/store/modules/dashboard/types';
import axios from 'axios';

export interface DashboardRequest {
  month: string;
}

export function get(params: any) {
  return axios.get<Dashboard>('/api/dashboard/get', { params });
}
