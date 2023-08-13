import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/statement',
  name: 'statement',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.statement',
    requiresAuth: true,
    icon: 'icon-bar-chart',
    order: 1,
  },
  children: [
    {
      path: 'excelHandle',
      name: 'ExcelHandle',
      component: () => import('@/views/excel-handle/index.vue'),
      meta: {
        locale: 'menu.statement.excle',
        requiresAuth: true,
        roles: ['SuperAdmin', 'UserAdmin', 'Observer'],
      },
    },
  ],
};

export default DASHBOARD;
