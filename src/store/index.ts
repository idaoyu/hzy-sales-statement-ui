import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useDashboardStore from './modules/dashboard';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useDashboardStore };
export default pinia;
