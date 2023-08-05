<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title> 活跃机构平均毛利润同比该机构毛利润 </template>
      <Chart style="width: 100%; height: 347px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useLoading from '@/hooks/loading';
  import {
    queryContentPublish,
    GrossProfitComparison,
  } from '@/api/visualization';
  import useChartOption from '@/hooks/chart-option';

  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
    <p>
      <span style="background-color: ${
        el.color
      }" class="tooltip-item-icon"></span>
      <span>
      ${el.seriesName}
      </span>
    </p>
    <span class="tooltip-value">
      ${Number(el.value).toFixed(2).toLocaleString()} 元
    </span>
  </div>`
      )
      .join('');
  };

  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const textChartsData = ref<number[]>([]);
  const imgChartsData = ref<number[]>([]);
  const { chartOption } = useChartOption((isDark) => {
    return {
      grid: {
        left: '4%',
        right: 0,
        top: '20',
        bottom: '60',
      },
      legend: {
        bottom: 0,
        icon: 'circle',
        textStyle: {
          color: '#4E5969',
        },
      },
      xAxis: {
        type: 'category',
        data: xAxis.value,
        axisLine: {
          lineStyle: {
            color: isDark ? '#3f3f3f' : '#A9AEB8',
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: {
            color: '#86909C',
          },
        },
        axisLabel: {
          color: '#86909C',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#86909C',
          formatter(value: number, idx: number) {
            if (idx === 0) return `${value}`;
            return `${value / 1000}k`;
          },
        },
        splitLine: {
          lineStyle: {
            color: isDark ? '#3F3F3F' : '#E5E6EB',
          },
        },
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[];
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
        },
        className: 'echarts-tooltip-diy',
      },
      series: [
        {
          name: '平均',
          data: textChartsData.value,
          stack: 'one',
          type: 'bar',
          barWidth: 16,
          color: isDark ? '#4A7FF7' : '#246EFF',
        },
        {
          name: '本机构',
          data: imgChartsData.value,
          stack: 'one',
          type: 'bar',
          color: isDark ? '#085FEF' : '#00B2FF',
        },
      ],
    };
  });
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
  const fetchData = async (params: GrossProfitComparison) => {
    setLoading(true);
    try {
      const { data: chartData } = await queryContentPublish(params);
      xAxis.value = chartData.x;
      imgChartsData.value = chartData.current;
      textChartsData.value = chartData.average;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData({ name: props.name, date: props.date });

  watch(
    () => props.date,
    (newValue: string) => {
      fetchData({ name: props.name, date: newValue });
    }
  );
</script>

<style scoped lang="less"></style>
