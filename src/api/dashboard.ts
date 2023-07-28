import { BannerDTO } from '@/store/modules/dashboard/types';
import axios from 'axios';

// 以后删掉
export interface ContentDataRecord {
  x: string;
  y: number;
}

export interface DashboardRequest {
  month: string;
}

export interface StatisticalData {
  no: number;
  name: string;
  quantityOfShipment: number;
  scale: number;
}

export interface ResponsibleForShipmentAnalysisDTO {
  list: any[];
  keyList: string[];
  totalPrice: number;
}

export function getBannerData(params: any) {
  return axios.get<BannerDTO>('/api/dashboard/general_situation', { params });
}

export function getLineChart() {
  return axios.get<ContentDataRecord[]>('/api/dashboard/net_profit');
}

export function getStatisticalData(params: any) {
  return axios.get<StatisticalData[]>('/api/dashboard/statistical_data', {
    params,
  });
}

export function responsibleForShipmentAnalysis(params: any) {
  return axios.get<ResponsibleForShipmentAnalysisDTO>(
    '/api/dashboard/responsible_for_shipment_analysis',
    { params }
  );
}
