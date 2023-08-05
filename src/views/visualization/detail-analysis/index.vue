<template>
  <div class="container">
    <a-page-header title="返回" :subtitle="(name as string)" @back="back">
    </a-page-header>
    <a-space direction="vertical" :size="12" fill>
      <a-space direction="vertical" :size="16" fill>
        <div class="space-unit">
          <PublicOpinion v-model:date="date" :name="(name as string)" />
        </div>
        <div>
          <a-grid :cols="24" :col-gap="16" :row-gap="16">
            <a-grid-item
              :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 16, xxl: 16 }"
            >
              <ContentPublishRatio
                :date="(date as string)"
                :name="(name as string)"
              />
            </a-grid-item>
            <a-grid-item
              :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 8, xxl: 8 }"
            >
              <PopularAuthor v-model:date="date" :name="(name as string)" />
            </a-grid-item>
          </a-grid>
        </div>
        <div> </div>
      </a-space>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router';
  import dayjs from 'dayjs';
  import { ref } from 'vue';
  import PublicOpinion from './components/public-opinion.vue';
  import ContentPublishRatio from './components/content-publish-ratio.vue';
  import PopularAuthor from './components/popular-author.vue';

  const route = useRoute();
  const router = useRouter();
  const { name } = route.query;
  const date = ref(dayjs().add(-1, 'month').format('YYYY-MM'));

  const back = () => {
    router.push({ path: '/dashboard/grossProfitAnalysis' });
  };
</script>

<script lang="ts">
  export default {
    name: 'DataAnalysis',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 0 20px;
    margin-bottom: 8px;
  }

  .space-unit {
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  .title-fix {
    margin: 0 0 12px 0;
    font-size: 14;
  }
  :deep(.section-title) {
    margin: 0 0 12px 0;
    font-size: 14px;
  }
</style>
