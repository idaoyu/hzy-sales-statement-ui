<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-grid :cols="24" :row-gap="16" class="panel">
      <a-grid-item
        class="panel-col"
        :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
      >
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="https://public.idaoyu.cn/public/images/余额.png"
            />
          </a-avatar>
          <a-statistic
            :title="`${month} 月销售额`"
            :value="data.totalSales"
            :precision="1"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit">{{ $t('workplace.pecs') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item
        class="panel-col"
        :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
      >
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="https://public.idaoyu.cn/public/images/股票.png"
            />
          </a-avatar>
          <a-statistic
            :title="`${month} 月销售额较 ${month - 1} 月变化`"
            :value="Math.abs(data.salesGrowth)"
            :value-from="0"
            animation
            show-group-separator
            :value-style="colorHandle(data.salesGrowth)"
          >
            <template #prefix>
              <icon-arrow-rise v-if="data.salesGrowth > 0" />
              <icon-arrow-fall v-else-if="data.salesGrowth < 0" />
            </template>
            <template #suffix>
              <span class="unit">{{ $t('workplace.pecs') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item
        class="panel-col"
        :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
      >
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="https://public.idaoyu.cn/public/images/资产.png"
            />
          </a-avatar>
          <a-statistic
            :title="`${month} 月毛利润`"
            :value="data.grossProfit"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit">{{ $t('workplace.pecs') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item
        class="panel-col"
        :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
        style="border-right: none"
      >
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="https://public.idaoyu.cn/public/images/概率.png"
            />
          </a-avatar>
          <a-statistic
            :title="`${month} 月毛利润较 ${month - 1} 月变化`"
            :value="Math.abs(data.profitGrowth)"
            :value-from="0"
            animation
            show-group-separator
            :value-style="colorHandle(data.profitGrowth)"
          >
            <template #prefix>
              <icon-arrow-rise v-if="data.salesGrowth > 0" />
              <icon-arrow-fall v-else-if="data.salesGrowth < 0" />
            </template>
            <template #suffix> 元 </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item
        class="panel-col"
        :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
        style="border-right: none"
      >
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="https://public.idaoyu.cn/public/images/更多应用.png"
            />
          </a-avatar>
          <a-statistic
            :title="`${month} 月活跃机构数量`"
            :value="data.numberActiveInstitutions"
            :value-from="0"
            animation
          >
            <template #suffix> 家 </template>
          </a-statistic>
        </a-space>
      </a-grid-item>
      <a-grid-item :span="24">
        <a-divider class="panel-border" />
      </a-grid-item>
    </a-grid>
  </a-spin>
</template>

<script lang="ts" setup>
  import { getBannerData } from '@/api/dashboard';
  import { useDashboardStore } from '@/store';
  import dayjs from 'dayjs';
  import { watch, computed, ref } from 'vue';
  import useLoading from '@/hooks/loading';

  const { loading, setLoading } = useLoading();

  const store = useDashboardStore();
  const lastDate = computed(() => store.date);
  const month = ref<number>(
    parseInt(dayjs(lastDate.value, 'YYYY-MM').format('M'), 10)
  );

  const colorHandle = (value: number) => {
    if (value > 0) {
      return { color: '#FF0000' };
    }
    if (value === 0) {
      return { color: '#FFAA33' };
    }
    return { color: '#0fbf60' };
  };

  const data = ref<any>({
    grossProfit: 0,
    numberActiveInstitutions: 0,
    profitGrowth: 0,
    salesGrowth: 0,
    totalSales: 0,
  });

  const getData = async (params: any) => {
    try {
      setLoading(true);
      const resp = await getBannerData(params);
      data.value = resp.data;
    } catch (err) {
      // do...
    } finally {
      setLoading(false);
    }
  };

  watch(lastDate, (newValue) => {
    if (!newValue) {
      return;
    }
    month.value = parseInt(dayjs(newValue, 'YYYY-MM').format('M'), 10);
    getData({ date: newValue });
  });
  getData({ date: lastDate.value });
</script>

<style lang="less" scoped>
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0 20px;
  }
  .panel-col {
    padding-left: 43px;
    border-right: 1px solid rgb(var(--gray-2));
  }
  .col-avatar {
    margin-right: 12px;
    background-color: var(--color-fill-2);
  }
  .up-icon {
    color: rgb(var(--red-6));
  }
  .unit {
    margin-left: 8px;
    color: rgb(var(--gray-8));
    font-size: 12px;
  }
  :deep(.panel-border) {
    margin: 4px 0 0 0;
  }
</style>
