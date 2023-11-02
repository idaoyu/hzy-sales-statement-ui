<template>
  <a-card
    class="general-card"
    title="数据分析"
    :header-style="{ paddingBottom: '12px' }"
  >
    <a-grid :cols="24" :col-gap="12" :row-gap="12">
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <ChainItem
          title="总销售额（总共的价税合计）"
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
          title="总毛利率（带来百分之多少的毛利润）"
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
          title="总毛利润（具体毛利润金额）"
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
          title="出货最多的商品"
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
        :model-value="props.date"
        style="width: 200px"
        @change="dateChangeHandle"
      />
    </template>
  </a-card>
</template>

<script lang="ts" setup>
  import useThemes from '@/hooks/themes';
  import ChainItem from './chain-item.vue';

  const { isDark } = useThemes();
  const emit = defineEmits(['update:date']);

  const dateChangeHandle = (dateString: string) => {
    emit('update:date', dateString);
  };

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
</script>
