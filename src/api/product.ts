import axios from 'axios';

export interface PageInfo {
  pageNo: number;
  pageSize: number;
  name: string;
}

export interface Product {
  productName: string;
  productAliasName: string;
  costPrice: number;
}

export function listProduct(params: PageInfo) {
  return axios.get<any>('/api/product', { params });
}

export function getOne(id: any) {
  return axios.get<any>(`/api/product/${id}`);
}

export async function changeLog(id: any) {
  return axios.get<any>(`/api/product/change_log/${id}`);
}

export function deleteProduct(id: number) {
  return axios.delete(`/api/product/${id}`);
}

export function updateProduct(id: any, data: any) {
  return axios.put(`/api/product/${id}`, { ...data });
}

export function addProduct(data: Product) {
  return axios.post('/api/product', data);
}
