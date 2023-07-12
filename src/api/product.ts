import axios from 'axios';

export interface PageInfo {
  pageNo: number;
  pageSize: number;
  name: string;
}

export function listProduct(params: PageInfo) {
  return axios.get<any>('/api/product', { params });
}

export function deleteProduct(id: number) {
  return axios.delete(`/api/product/${id}`);
}

export function updateProduct(id: number, cost: number) {
  return axios.put(`/api/product/${id}`, { cost });
}
