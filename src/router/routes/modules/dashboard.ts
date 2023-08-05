import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['SuperAdmin', 'UserAdmin', 'Observer'],
      },
    },
    {
      path: 'grossProfitAnalysis',
      name: 'GrossProfitAnalysis',
      component: () =>
        import('@/views/dashboard/grossProfitAnalysis/index.vue'),
      meta: {
        locale: 'menu.dashboard.grossProfitAnalysis',
        requiresAuth: true,
        roles: ['SuperAdmin', 'UserAdmin', 'Observer'],
      },
    },
    {
      path: 'detailAnalysis',
      name: 'DetailAnalysis',
      component: () =>
        import('@/views/visualization/detail-analysis/index.vue'),
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
