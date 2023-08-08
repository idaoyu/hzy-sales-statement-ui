import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/organization',
  name: 'organization',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.organization',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 3,
  },
  children: [
    {
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/organization/manage/index.vue'),
      meta: {
        locale: 'menu.organization.manage',
        requiresAuth: true,
        roles: ['SuperAdmin', 'UserAdmin', 'Observer'],
      },
    },
    {
      path: 'updateOrganization',
      name: 'UpdateOrganization',
      component: () => import('@/views/organization/update/index.vue'),
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
