import axios from 'axios';

export interface PageGetParams {
  pageNo: number;
  pageSize: number;
  date?: Array<string>;
  orderType?: string;
  organizationName?: string;
  organizationType?: string;
  productName?: string;
  startDate?: string;
  endDate?: string;
}

export function pageGet(params: PageGetParams) {
  if (params.date && params.date.length >= 2) {
    const startDate = params.date[0];
    const endDate = params.date[1];
    params.date = undefined;
    params.startDate = startDate;
    params.endDate = endDate;
  }
  return axios.get<any>('/api/order', { params });
}

export async function searchOrganizationName(name: string) {
  return axios.get<any>('/api/order/search', { params: { name } });
}
