<template>
  <a-col class="banner">
    <a-col>
      <a-row>
        <a-col :span="20"
          ><a-typography-title :heading="5" style="margin-top: 0">
            {{ $t('workplace.welcome') }} {{ userInfo.name }}
          </a-typography-title></a-col
        >
        <a-col :span="4"
          ><a-month-picker
            v-model="data.month"
            style="width: 200px"
            @change="change"
        /></a-col>
      </a-row>
    </a-col>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useUserStore, useDashboardStore } from '@/store';

  const userStore = useUserStore();
  const dashboardStore = useDashboardStore();
  const userInfo = computed(() => {
    return {
      name: userStore.nickname,
    };
  });

  const data = computed(() => {
    return {
      month: dashboardStore.getMonth,
    };
  });
  const change = (dateString: any) => {
    dashboardStore.setMonth(dateString);
  };
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    padding: 20px 20px 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
</style>
