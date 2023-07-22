<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item
      class="panel-col"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space>
        <a-avatar :size="54" class="col-avatar">
          <img
            alt="avatar"
            src="https://img1.imgtp.com/2023/07/09/QG3ppfQx.png"
          />
        </a-avatar>
        <a-statistic
          :title="$t('workplace.onlineContent')"
          :value="saleroom"
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
            src="https://img1.imgtp.com/2023/07/09/j1yeN4wF.png"
          />
        </a-avatar>
        <a-statistic
          :title="$t('workplace.putIn')"
          :value="netProfit"
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
            src="https://img1.imgtp.com/2023/07/09/B3076rna.png"
          />
        </a-avatar>
        <a-statistic
          :title="$t('workplace.newDay')"
          :value="salesChange"
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
            src="https://img1.imgtp.com/2023/07/09/i8DP0V2I.png"
          />
        </a-avatar>
        <a-statistic
          :title="$t('workplace.newFromYesterday')"
          :value="activeCustomers"
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
</template>

<script lang="ts" setup>
  import { useDashboardStore } from '@/store';
  import { ref } from 'vue';

  const store = useDashboardStore();
  const saleroom = ref(0.0);
  const netProfit = ref(0.0);
  const salesChange = ref(0.0);
  const activeCustomers = ref(0);
  store.getBannerDTO().then((res) => {
    saleroom.value = res && res.saleroom ? res.saleroom : 0.0;
    netProfit.value = res && res.netProfit ? res.netProfit : 0.0;
    salesChange.value = res && res.salesChange ? res.salesChange : 0.0;
    activeCustomers.value =
      res && res.activeCustomers ? res.activeCustomers : 0;
  });
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
