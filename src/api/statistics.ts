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
