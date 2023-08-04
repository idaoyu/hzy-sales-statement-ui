<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card :bordered="false" :style="cardStyle">
      <div class="content-wrap">
        <div class="content">
          <a-statistic
            :title="title"
            :value="renderData.count"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #suffix> {{ renderData.unit }} </template>
          </a-statistic>
          <div class="desc">
            <a-typography-text type="secondary" class="label">
              较上月
            </a-typography-text>
            <a-typography-text :type="colorHandle(renderData.change)">
              {{ Math.abs(renderData.change) }}{{ renderData.scale }}
              {{ renderData.unit }}
              <icon-arrow-rise v-if="renderData.change > 0" />
              <icon-arrow-fall v-else-if="renderData.change < 0" />
              <icon-swap v-else />
            </a-typography-text>
          </div>
        </div>
        <div class="chart">
          <Chart v-if="!loading" :option="chartOption" />
        </div>
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, PropType, CSSProperties, watch } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    queryPublicOpinionAnalysis,
    PublicOpinionAnalysis,
    PublicOpinionAnalysisRes,
  } from '@/api/visualization';
  import useChartOption from '@/hooks/chart-option';
  import { ToolTipFormatterParams } from '@/types/echarts';

  const colorHandle = (value: number) => {
    if (value > 0) {
      return 'danger';
    }
    if (value === 0) {
      return 'warning';
    }
    return 'success';
  };

  const barChartOptionsFactory = () => {
    const data = ref<any>({
      x: [],
      y: [],
      name: '',
      unit: '',
    });
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 10,
          bottom: 0,
        },
        xAxis: {
          type: 'category',
          show: false,
          data: data.value.x,
        },
        yAxis: {
          show: false,
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter(params) {
            const list = params as ToolTipFormatterParams[];
            return `<div>
            <p class="tooltip-title">${list[0].axisValueLabel}</p>
            <div class="content-panel"><span>净利润</span><span class="tooltip-value">${list[0].value} ${data.value.unit}</span></div>
          </div>`;
          },
          className: 'echarts-tooltip-diy',
        },
        series: {
          name: data.value.name,
          data: data.value.y,
          type: 'bar',
          barWidth: 7,
          itemStyle: {
            borderRadius: 2,
          },
        },
      };
    });
    return {
      data,
      chartOption,
    };
  };

  const lineChartOptionsFactory = () => {
    const data = ref<any>({
      x: [],
      y: [],
      name: '',
      unit: '',
    });
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 10,
          bottom: 0,
        },
        xAxis: {
          type: 'category',
          show: false,
          data: data.value.x,
        },
        yAxis: {
          show: false,
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          formatter(params) {
            const list = params as ToolTipFormatterParams[];
            return `<div>
            <p class="tooltip-title">${list[0].axisValueLabel}</p>
            <div class="content-panel"><span>${data.value.name}</span><span class="tooltip-value">${list[0].value} ${data.value.unit}</span></div>
          </div>`;
          },
          className: 'echarts-tooltip-diy',
        },
        series: [
          {
            name: data.value.name,
            data: data.value.y,
            type: 'line',
            showSymbol: false,
            smooth: true,
            lineStyle: {
              color: '#165DFF',
              width: 3,
              type: 'dashed',
            },
          },
        ],
      };
    });
    return {
      data,
      chartOption,
    };
  };

  const pieChartOptionsFactory = () => {
    const data = ref<any>([]);
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        legend: {
          show: true,
          top: 'center',
          right: '-6',
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: '#4E5969',
          },
        },
        tooltip: {
          show: true,
          formatter(params: any) {
            return `<div>
            <p class="tooltip-title">${data.value.name}</p>
            <div class="content-panel"><span>${params.data.name}</span><span class="tooltip-value">${params.data.value} ${data.value.unit}</span></div>
          </div>`;
          },
          className: 'echarts-tooltip-diy',
        },
        series: [
          {
            name: '总计',
            type: 'pie',
            center: ['20%', '50%'],
            radius: ['50%', '70%'],
            label: {
              show: false,
            },
            data,
          },
        ],
      };
    });
    return {
      data,
      chartOption,
    };
  };

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    quota: {
      type: String,
      default: '',
    },
    chartType: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => {
        return {};
      },
    },
  });

  const { loading, setLoading } = useLoading(true);
  const { chartOption: lineChartOption, data: lineData } =
    lineChartOptionsFactory();
  const { chartOption: barChartOption, data: barData } =
    barChartOptionsFactory();
  const { chartOption: pieChartOption, data: pieData } =
    pieChartOptionsFactory();
  const renderData = ref<PublicOpinionAnalysisRes>({
    count: 0,
    change: 0,
    result: [],
    name: '',
    unit: '',
    scale: '',
  });
  const chartOption = ref({});
  const fetchData = async (params: PublicOpinionAnalysis) => {
    try {
      const { data } = await queryPublicOpinionAnalysis(params);
      renderData.value = data;
      const { result } = data;
      if (props.chartType === 'bar') {
        barData.value = {
          x: [],
          y: [],
          name: '',
          unit: '',
        };
        result.forEach((el, idx) => {
          barData.value.x.push(el.x);
          barData.value.y.push({
            value: el.y,
            itemStyle: { color: idx % 2 ? '#2CAB40' : '#86DF6C' },
          });
        });
        barData.value.name = data.name;
        barData.value.unit = data.unit;
        chartOption.value = barChartOption.value;
      } else if (props.chartType === 'line') {
        lineData.value = {
          x: [],
          y: [],
          name: '',
          unit: '',
        };
        result.forEach((el) => {
          lineData.value.x.push(el.x);
          lineData.value.y.push(el.y);
        });
        lineData.value.name = data.name;
        lineData.value.unit = data.unit;
        chartOption.value = lineChartOption.value;
      } else {
        pieData.value = [];
        result.forEach((el) => {
          pieData.value.push({ value: el.y, name: el.x });
        });
        pieData.value.name = data.name;
        pieData.value.unit = data.unit;
        chartOption.value = pieChartOption.value;
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData({ type: props.quota, name: props.name, date: props.date });

  watch(
    () => props.date,
    (newValue: string) => {
      fetchData({ type: props.quota, name: props.name, date: newValue });
    }
  );
</script>

<style scoped lang="less">
  :deep(.arco-card) {
    border-radius: 4px;
  }
  :deep(.arco-card-body) {
    width: 100%;
    height: 134px;
    padding: 0;
  }
  .content-wrap {
    width: 100%;
    padding: 16px;
    white-space: nowrap;
  }
  :deep(.content) {
    float: left;
    width: 108px;
    height: 102px;
  }
  :deep(.arco-statistic) {
    .arco-statistic-title {
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
    }
    .arco-statistic-content {
      margin-top: 10px;
    }
  }

  .chart {
    float: right;
    width: calc(100% - 108px);
    height: 90px;
    vertical-align: bottom;
  }

  .label {
    font-size: 12px;
  }
</style>
