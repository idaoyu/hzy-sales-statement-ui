<template>
  <a-card
    class="general-card"
    title="数据分析"
    :header-style="{ paddingBottom: '12px' }"
  >
    <a-grid :cols="24" :col-gap="12" :row-gap="12">
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          title="总销售额"
          quota="salesVolume"
          chart-type="line"
          :date="date"
          :name="props.name"
          :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          title="总毛利率"
          quota="profitRate"
          chart-type="bar"
          :date="date"
          :name="props.name"
          :card-style="{
            background: isDark
              ? ' linear-gradient(180deg, #3D492E 0%, #263827 100%)'
              : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          title="总毛利润"
          quota="grossProfit"
          chart-type="line"
          :date="date"
          :name="props.name"
          :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #294B94 0%, #0F275C 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          title="当月出货量"
          quota="quantityShipment"
          chart-type="pie"
          :date="date"
          :name="props.name"
          :card-style="{
            background: isDark
              ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
              : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)',
          }"
        />
      </a-grid-item>
    </a-grid>
    <template #extra>
      <a-month-picker
        :model-value="date"
        style="width: 200px"
        @change="dateChangeHandle"
      />
    </template>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useThemes from '@/hooks/themes';
  import dayjs from 'dayjs';
  import ChainItem from './chain-item.vue';

  const { isDark } = useThemes();
  const date = ref(dayjs().add(-1, 'month').format('YYYY-MM'));

  const dateChangeHandle = (dateString: string) => {
    date.value = dateString;
  };

  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
  });
</script>
