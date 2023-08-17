import axios from 'axios';
import { number } from 'echarts';

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

export async function page(params: PageParams) {
  return axios.get<any>('/api/paternity', { params });
}

export function updateTime(params: UpdatePaternityParams) {
  return axios.put<any>('/api/paternity', { ...params });
}

export function addPatenity(params: AddPaternityParams) {
  return axios.post<any>('/api/paternity', { ...params });
}

export function deletePatenity(id: number) {
  return axios.delete<any>(`/api/paternity/${id}`);
}

export async function searchOrganizationName(name: string) {
  return axios.get<any>('/api/paternity/search', { params: { name } });
}
