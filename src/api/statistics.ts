import axios from 'axios';

export interface ExcelHandleData {
  file: File;
  yeah: string;
  month: string;
}

export function excelHandle(data: FormData) {
  return axios({
    url: '/api/data_statistics/excel_handle',
    method: 'post',
    responseType: 'blob',
    data,
  });
}

export function getWarnMessage(params: any) {
  return axios.get<any>('/api/data_statistics/warn_message', {
    params,
  });
}
