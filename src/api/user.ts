import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  tokenValue: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/security/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/security/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
