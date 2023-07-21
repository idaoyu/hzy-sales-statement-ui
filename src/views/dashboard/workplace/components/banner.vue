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
          ><a-month-picker v-model="month" style="width: 200px"
        /></a-col>
      </a-row>
    </a-col>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useUserStore } from '@/store';
  import { dateFormat } from '@/utils/date';

  const userStore = useUserStore();
  const userInfo = computed(() => {
    return {
      name: userStore.nickname,
    };
  });

  const month = ref(dateFormat(new Date(), 'YYYY_MM'));
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
