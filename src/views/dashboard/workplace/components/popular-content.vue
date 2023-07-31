<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 21px 20px' }"
    >
      <template #title>
        {{ $t('workplace.popularContent') }}
      </template>
      <a-space direction="vertical" :size="10" fill>
        <a-radio-group
          v-model:model-value="type"
          type="button"
          @change="typeChange as any"
        >
          <a-radio value="product">
            {{ $t('workplace.popularContent.product') }}
          </a-radio>
          <a-radio value="pharmacy">
            {{ $t('workplace.popularContent.pharmacy') }}
          </a-radio>
          <a-radio value="distribution">
            {{ $t('workplace.popularContent.distribution') }}
          </a-radio>
        </a-radio-group>
        <a-table
          :data="renderList"
          :pagination="false"
          :bordered="false"
          :scroll="{ x: '100%', y: '264px' }"
        >
          <template #columns>
            <a-table-column
              :width="60"
              title="排名"
              data-index="no"
              align="center"
            ></a-table-column>
            <a-table-column
              align="center"
              :width="290"
              title="名字"
              data-index="name"
            >
            </a-table-column>
            <a-table-column
              align="left"
              title="销售额"
              data-index="quantityOfShipment"
            >
              <template #cell="{ record }">
                <div class="increases-cell">
                  <span>{{ record.quantityOfShipment.toFixed(2) }}w 元</span>
                </div>
              </template>
            </a-table-column>
            <a-table-column align="left" title="占比" data-index="scale">
              <template #cell="{ record }">
                <div class="increases-cell">
                  <span>{{ (record.scale * 100).toFixed(2) }}%</span>
                </div>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import useLoading from '@/hooks/loading';
  import { StatisticalData, getStatisticalData } from '@/api/dashboard';
  import useDashboardStore from '@/store/modules/dashboard';

  const store = useDashboardStore();
  const lastDate = computed(() => store.date);
  const type = ref('product');
  const { loading, setLoading } = useLoading();
  const renderList = ref<StatisticalData[]>();
  const fetchData = async (
    contentType: string,
    localDate: string | undefined
  ) => {
    try {
      setLoading(true);
      const { data } = await getStatisticalData({
        type: contentType,
        date: localDate,
      });
      renderList.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const typeChange = (contentType: string) => {
    fetchData(contentType, lastDate.value);
  };
  watch(lastDate, (newValue) => {
    if (!newValue) {
      return;
    }
    fetchData('product', lastDate.value);
  });
  fetchData('product', lastDate.value);
</script>

<style scoped lang="less">
  .general-card {
    min-height: 395px;
  }
  :deep(.arco-table-tr) {
    height: 44px;
    .arco-typography {
      margin-bottom: 0;
    }
  }
  .increases-cell {
    display: flex;
    align-items: center;
    span {
      margin-right: 4px;
    }
  }
</style>
