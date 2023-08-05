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
      path: 'market',
      name: 'market',
      component: () => import('@/views/statement/index.vue'),
      meta: {
        locale: 'menu.statement.market',
        requiresAuth: true,
        roles: ['SuperAdmin', 'UserAdmin', 'Observer'],
      },
    },
  ],
};

export default DASHBOARD;
