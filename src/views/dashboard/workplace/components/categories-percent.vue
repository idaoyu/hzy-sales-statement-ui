<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{
        padding: '20px',
      }"
    >
      <template #title>
        {{ $t('workplace.categoriesPercent') }}
      </template>
      <Chart height="310px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import useChartOption from '@/hooks/chart-option';
  import { computed, ref, watch } from 'vue';
  import { responsibleForShipmentAnalysis } from '@/api/dashboard';
  import useDashboardStore from '@/store/modules/dashboard';

  const { loading, setLoading } = useLoading();
  const keyList = ref<string[]>([]);
  const valueList = ref<any[]>([]);
  const totalPrice = ref<number>(0);
  const { chartOption } = useChartOption((isDark) => {
    // echarts support https://echarts.apache.org/zh/theme-builder.html
    // It's not used here
    return {
      legend: {
        left: 'center',
        data: keyList.value,
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
        textStyle: {
          color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
        },
        itemStyle: {
          borderWidth: 0,
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: '{b}: 销售额: {c}w 元 占比:{d}%',
      },
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '40%',
            style: {
              text: '总出货量',
              textAlign: 'center',
              fill: isDark ? '#ffffffb3' : '#4E5969',
              fontSize: 14,
            },
          },
          {
            type: 'text',
            left: 'center',
            top: '50%',
            style: {
              text: `${totalPrice.value.toFixed(2)}w 元`,
              textAlign: 'center',
              fill: isDark ? '#ffffffb3' : '#1D2129',
              fontSize: 16,
              fontWeight: 500,
            },
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{d}%',
            fontSize: 14,
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
          },
          itemStyle: {
            borderColor: isDark ? '#232324' : '#fff',
            borderWidth: 1,
          },
          data: valueList.value,
        },
      ],
    };
  });

  const store = useDashboardStore();
  const lastDate = computed(() => store.date);

  const fetchData = async (paramDate: string | undefined) => {
    try {
      setLoading(true);
      const { data } = await responsibleForShipmentAnalysis({
        date: paramDate,
      });
      keyList.value = [];
      valueList.value = [];
      data.keyList.forEach((el: any) => keyList.value.push(el));
      data.list.forEach((el: any) =>
        valueList.value.push({
          value: [el.value.toFixed(2)],
          name: el.key,
        })
      );
      totalPrice.value = data.totalPrice;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  watch(lastDate, (newValue) => {
    if (!newValue) {
      return;
    }
    fetchData(newValue);
  });
  fetchData(lastDate.value);
</script>

<style scoped lang="less"></style>
