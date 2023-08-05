<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title> 热销商品榜单 </template>
      <template #extra>
        <a-select v-model="type" :style="{ width: '200px' }">
          <a-option value="month">本月数据</a-option>
          <a-option value="yeah">本年数据</a-option>
        </a-select>
      </template>
      <a-table
        :data="tableData"
        :pagination="false"
        :bordered="false"
        style="margin-bottom: 20px"
        :scroll="{ x: '100%', y: '350px' }"
      >
        <template #columns>
          <a-table-column
            title="排名"
            data-index="rank"
            align="center"
            :width="65"
          />
          <a-table-column
            title="商品全名"
            data-index="name"
            align="center"
            :width="220"
          />
          <a-table-column title="产生毛利润" data-index="price" align="center">
            <template #cell="{ record }"> {{ record.price }}元 </template>
          </a-table-column>
          <a-table-column
            title="出货量"
            data-index="quantityOfShipment"
            align="center"
          >
            <template #cell="{ record }">
              {{ record.quantityOfShipment }}件
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    queryPopularAuthor,
    PopularAuthorRes,
    HotProductRankListParams,
  } from '@/api/visualization';

  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  });

  const { loading, setLoading } = useLoading();
  const tableData = ref<PopularAuthorRes[]>([]);

  const type = ref('month');
  const fetchData = async (params: HotProductRankListParams) => {
    try {
      setLoading(true);
      const { data } = await queryPopularAuthor(params);
      tableData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData({ name: props.name, type: type.value, date: props.date });

  watch(type, (newValue: string) => {
    fetchData({ name: props.name, type: newValue, date: props.date });
  });
  watch(
    () => props.date,
    (newValue: string) => {
      fetchData({ name: props.name, type: type.value, date: newValue });
    }
  );
</script>

<style scoped lang="less">
  .general-card {
    max-height: 425px;
  }
</style>
