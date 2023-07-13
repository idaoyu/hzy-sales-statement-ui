import axios from 'axios';

export interface GetInfo {
  organizationName: string;
  organizationNameTag: string;
  type: string;
  responsibleType: string;
  pageNo: number;
  pageSize: number;
}

export function listOrganization(params: GetInfo) {
  return axios.get<any>('/api/organization', { params });
}

export function deleteOrganization(id: number) {
  return axios.delete<any>(`/api/organization/${id}`);
}

export function addOrganization(data: any) {
  return axios.post<any>('/api/organization', data);
}
