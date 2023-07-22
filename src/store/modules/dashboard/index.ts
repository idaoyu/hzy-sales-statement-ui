import { defineStore } from 'pinia';
import { get } from '@/api/dashboard';
import { Dashboard } from './types';

const useDashboardStore = defineStore('dashboard', {
  state: (): Dashboard => ({
    month: undefined,
    bannerDTO: undefined,
  }),

  getters: {
    dashboard(state: Dashboard): Dashboard {
      return { ...state };
    },
    getMonth: (state) => {
      return state.month;
    },
  },

  actions: {
    setMonth(month: any) {
      this.$state.month = month;
      get({ month }).then((res) => {
        this.$state = res.data;
      });
    },
    setData(data: Dashboard) {
      this.$state = data;
    },
    getBannerDTO() {
      const store = useDashboardStore();
      return store.bannerDTO;
    },
  },
});

export default useDashboardStore;
