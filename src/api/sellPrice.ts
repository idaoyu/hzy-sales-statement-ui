import axios from 'axios';

export interface PageParams {
  pageNo: number;
  pageSize: number;
}

export interface UpdatePaternityParams {
  id: number;
  startTime: string;
  endTime: string;
}

export interface AddPaternityParams {
  targetName: string;
  parentName: string;
  startTime: string;
  endTime: string;
}

export async function pageGetSellPrice(params: PageParams) {
  return axios.get<any>('/api/product-sell-price', { params });
}

export function addSellPrice(params: AddPaternityParams) {
  return axios.post<any>('/api/product-sell-price', { ...params });
}

export function deleteSellPrice(id: number) {
  return axios.delete<any>(`/api/product-sell-price/${id}`);
}
