import { Dashboard } from '@/store/modules/dashboard/types';
import axios from 'axios';

// 以后删掉
export interface ContentDataRecord {
  x: string;
  y: number;
}

export interface DashboardRequest {
  month: string;
}

export interface LineChart {
  saleroom: number;
  netProfit: number;
  activeCustomers: number;
}

export function get(params: any) {
  return axios.get<Dashboard>('/api/dashboard/get', { params });
}

export function getLineChart() {
  return axios.get<LineChart[]>('/api/dashboard/line_chart');
}
