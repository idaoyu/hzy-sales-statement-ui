<template>
  <div class="container">
    <a-page-header title="返回" :subtitle="name" @back="back"> </a-page-header>
    <a-space direction="vertical" :size="12" fill>
      <a-space direction="vertical" :size="16" fill>
        <div class="space-unit">
          <PublicOpinion />
        </div>
        <div>
          <a-grid :cols="24" :col-gap="16" :row-gap="16">
            <a-grid-item
              :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 16, xxl: 16 }"
            >
              <ContentPublishRatio />
            </a-grid-item>
            <a-grid-item
              :span="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 8, xxl: 8 }"
            >
              <PopularAuthor />
            </a-grid-item>
          </a-grid>
        </div>
        <div>
          <!-- <ContentPeriodAnalysis /> -->
        </div>
      </a-space>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router';
  import PublicOpinion from './components/public-opinion.vue';
  // import ContentPeriodAnalysis from './components/content-period-analysis.vue';
  import ContentPublishRatio from './components/content-publish-ratio.vue';
  import PopularAuthor from './components/popular-author.vue';

  const route = useRoute();
  const router = useRouter();
  const { name } = route.query;

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
    padding: 0 20px 20px 20px;
    margin-bottom: 20px;
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
