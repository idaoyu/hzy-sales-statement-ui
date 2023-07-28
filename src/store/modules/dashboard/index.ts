import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import { Dashboard } from './types';

const useDashboardStore = defineStore('dashboard', {
  state: (): Dashboard => ({
    date: undefined,
  }),

  getters: {
    dashboard(state: Dashboard): Dashboard {
      return { ...state };
    },
  },

  actions: {
    setDate(date: string) {
      this.$patch({
        date,
      });
    },
    async getLastDate() {
      const date = dayjs(`${new Date()}`)
        .subtract(1, 'month')
        .format('YYYY-MM');
      this.setDate(date);
    },
  },
});

export default useDashboardStore;
