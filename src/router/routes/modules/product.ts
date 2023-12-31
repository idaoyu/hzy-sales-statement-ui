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
        roles: ['SuperAdmin', 'UserAdmin', 'Observer'],
      },
    },
    {
      path: 'sellPrice',
      name: 'SellPrice',
      component: () => import('@/views/product/sellPrice/index.vue'),
      meta: {
        locale: 'menu.product.sellPrice',
        requiresAuth: true,
        roles: ['SuperAdmin', 'UserAdmin', 'Observer'],
      },
    },
    {
      path: 'updateProduct',
      name: 'UpdateProduct',
      component: () => import('@/views/product/update/index.vue'),
      meta: {
        hideInMenu: true,
        noAffix: true,
        requiresAuth: true,
        roles: ['SuperAdmin', 'UserAdmin', 'Observer'],
      },
    },
  ],
};

export default DASHBOARD;
