import axios from 'axios';

export interface GetInfo {
  organizationName: string;
  organizationNameTag: string;
  type: string;
  responsibleType: string;
  pageNo: number;
  pageSize: number;
}

export interface UpdateParams {
  newValue: {
    responsibleType: string;
    principalId: string;
  };
  effectiveTime: string;
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

export async function getOne(id: any) {
  return axios.get<any>(`/api/organization/${id}`);
}

export function update(id: any, params: UpdateParams) {
  return axios.put<any>(`/api/organization/${id}`, { ...params });
}

export async function changeLog(id: any) {
  return axios.get<any>(`/api/organization/change_log/${id}`);
}
