import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/product',
  name: 'product',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.product',
    requiresAuth: true,
    icon: 'icon-select-all',
    order: 2,
  },
  children: [
    {
      path: 'cost',
      name: 'cost',
      component: () => import('@/views/product/cost/index.vue'),
      meta: {
        locale: 'menu.product.cost',
        requiresAuth: true,
        roles: ['user', 'admin'],
      },
    },
  ],
};

export default DASHBOARD;
