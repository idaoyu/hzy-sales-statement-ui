import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/order',
  name: 'order',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.order',
    requiresAuth: true,
    icon: 'icon-common',
    order: 4,
  },
  children: [
    {
      path: 'list',
      name: 'list',
      component: () => import('@/views/order/index.vue'),
      meta: {
        locale: 'menu.order.list',
        requiresAuth: true,
        roles: ['SuperAdmin', 'UserAdmin', 'Observer'],
      },
    },
  ],
};

export default DASHBOARD;
