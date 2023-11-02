<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{
        padding: '20px',
      }"
    >
      <template #title> 毛利润组成 </template>
      <Chart height="230px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import useChartOption from '@/hooks/chart-option';
  import { computed, ref, watch } from 'vue';
  import { proditComposition } from '@/api/dashboard';
  import useDashboardStore from '@/store/modules/dashboard';

  const { loading, setLoading } = useLoading();
  const keyList = ref<string[]>([]);
  const valueList = ref<any[]>([]);
  const totalPrice = ref<string>('0');
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
        formatter: '毛利润: {c}w 元',
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
              fontSize: 12,
            },
          },
          {
            type: 'text',
            left: 'center',
            top: '50%',
            style: {
              text: `${totalPrice.value}w 元`,
              textAlign: 'center',
              fill: isDark ? '#ffffffb3' : '#1D2129',
              fontSize: 13,
              fontWeight: 500,
            },
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '40%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{d}%',
            fontSize: 9,
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
      const { data } = await proditComposition({
        date: paramDate,
      });
      keyList.value = [];
      valueList.value = [];
      let total = 0;
      data.forEach((el) => {
        keyList.value.push(el.key);
        valueList.value.push({
          value: (el.value / 10000).toFixed(2),
          name: el.key,
        });
        total += el.value;
      });
      totalPrice.value = (total / 10000).toFixed(2);
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
