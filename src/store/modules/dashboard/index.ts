import { defineStore } from 'pinia';
import { BannerDTO, Dashboard } from './types';

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
    setData(data: Dashboard) {
      this.$state = data;
    },
    async getBannerDTO() {
      const store = useDashboardStore();
      return store.bannerDTO;
    },
  },
});

export default useDashboardStore;
