<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px',
      }"
      :title="$t('workplace.contentData')"
    >
      <Chart height="289px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { graphic } from 'echarts';
  import useLoading from '@/hooks/loading';
  import { LineChart, getLineChart } from '@/api/dashboard';
  import useChartOption from '@/hooks/chart-option';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import { AnyObject } from '@/types/global';
  import dayjs from 'dayjs';

  function graphicFactory(side: AnyObject) {
    return {
      type: 'text',
      bottom: '8',
      ...side,
      style: {
        text: '',
        textAlign: 'center',
        fill: '#4E5969',
        fontSize: 12,
      },
    };
  }
  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const saleroomData = ref<number[]>([]);
  const netProfitData = ref<number[]>([]);
  const activeCustomersData = ref<number[]>([]);
  const graphicElements = ref([
    graphicFactory({ left: '2.6%' }),
    graphicFactory({ right: 0 }),
  ]);
  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: '2.9%',
        right: '0',
        top: '10',
        bottom: '30',
      },
      xAxis: {
        type: 'category',
        offset: 2,
        data: xAxis.value,
        boundaryGap: false,
        axisLabel: {
          color: '#4E5969',
          formatter(value: number, idx: number) {
            if (idx === 0) return '';
            if (idx === xAxis.value.length - 1) return '';
            return `${value}`;
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          interval: (idx: number) => {
            if (idx === 0) return false;
            if (idx === xAxis.value.length - 1) return false;
            return true;
          },
          lineStyle: {
            color: '#E5E8EF',
          },
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: any, idx: number) {
            if (idx === 0) return value;
            return `${value}w`;
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#E5E8EF',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const list = params as ToolTipFormatterParams[];
          return `<div>
            <p class="tooltip-title">${list[0].axisValueLabel}</p>
            <div class="content-panel"><span>月销售额</span><span class="tooltip-value">${(
              Number(list[0].value) * 10000
            ).toLocaleString()}元</span></div>
            <div class="content-panel"><span>月净利润</span><span class="tooltip-value">${(
              Number(list[1].value) * 10000
            ).toLocaleString()}元</span></div>
            <div class="content-panel"><span>活跃机构数量</span><span class="tooltip-value">${Number(
              list[2].value
            ).toLocaleString()}家</span></div>
          </div>`;
        },
        className: 'echarts-tooltip-diy',
      },
      graphic: {
        elements: graphicElements.value,
      },
      series: [
        // 总销售额
        {
          name: '销售额',
          data: saleroomData.value,
          type: 'line',
          smooth: true,
          // symbol: 'circle',
          symbolSize: 12,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          lineStyle: {
            width: 3,
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(30, 231, 255, 1)',
              },
              {
                offset: 0.5,
                color: 'rgba(36, 154, 255, 1)',
              },
              {
                offset: 1,
                color: 'rgba(111, 66, 251, 1)',
              },
            ]),
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(17, 126, 255, 0)',
              },
              {
                offset: 1,
                color: 'rgba(17, 128, 255, 0)',
              },
            ]),
          },
        },
        // 总净利润
        {
          name: '净利润',
          data: netProfitData.value,
          type: 'line',
          smooth: true,
          // symbol: 'circle',
          symbolSize: 12,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          lineStyle: {
            width: 3,
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(238, 206, 19, 1)',
              },
              {
                offset: 1,
                color: 'rgba(178, 16, 255, 1)',
              },
            ]),
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(17, 126, 255, 0)',
              },
              {
                offset: 1,
                color: 'rgba(17, 128, 255, 0)',
              },
            ]),
          },
        },
        // 活跃机构数量
        {
          name: '活跃机构数量',
          data: activeCustomersData.value,
          type: 'bar',
          smooth: true,
          // symbol: 'circle',
          symbolSize: 12,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          itemStyle: {
            width: 3,
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(255,248,134,1.000)',
              },
              {
                offset: 0.5,
                color: 'rgba(248,185,157,1.000)',
              },
              {
                offset: 1,
                color: 'rgba(240,114,182,1.000)',
              },
            ]),
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(99, 126, 255, 0)',
              },
              {
                offset: 1,
                color: 'rgba(17, 128, 255, 0)',
              },
            ]),
          },
        },
      ],
    };
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: chartData } = await getLineChart();
      chartData.forEach((el: LineChart, idx: number) => {
        xAxis.value.push(
          dayjs(`${new Date()}`)
            .subtract(11 - idx, 'month')
            .format('YYYY-MM')
        );
        saleroomData.value.push(el.saleroom);
        netProfitData.value.push(el.netProfit);
        activeCustomersData.value.push(el.activeCustomers);
        if (idx === 0) {
          graphicElements.value[0].style.text = dayjs(`${new Date()}`)
            .subtract(11, 'month')
            .format('YYYY-MM');
        }
        if (idx === chartData.length - 1) {
          graphicElements.value[1].style.text = dayjs(`${new Date()}`).format(
            'YYYY-MM'
          );
        }
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped lang="less"></style>
