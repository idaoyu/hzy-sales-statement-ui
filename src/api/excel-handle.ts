import axios from 'axios';

export interface TaskFileHandleLog {
  id: string;
  description: string;
  sourceFilePath: string;
  resultFilePath: string;
  status: number;
  errorMessage: string;
  errorType: string;
  errorData: string;
  operator: string;
  createTime: string;
}

export interface PageQueryParams {
  pageNo: number;
  pageSize: number;
}

export function pageExcelHandle(params: PageQueryParams) {
  return axios.get<any>('/api/excel_handle/page_list', { params });
}

export function uploadFile(data: FormData) {
  return axios.post<any>('/api/excel_handle/upload', data);
}

export function getOne(id: string) {
  return axios.get<any>(`/api/excel_handle/${id}`);
}
