<template>
  <div class="content">
    <a-space direction="vertical" fill :size="15">
      <a-card title="销售额/利润分析">
        <a-form
          :model="formData"
          :label-col-props="{ span: 5 }"
          @submit="handleSubmit"
        >
          <a-row justify="center" align="center" :wrap="false">
            <a-col :span="6">
              <a-form-item field="name" label="机构名字"
                ><a-input
                  v-model="formData.name"
                  style="width: 250px"
                  placeholder="全部机构"
                ></a-input></a-form-item
            ></a-col>
            <a-col :span="6">
              <a-form-item field="date" label="时间">
                <a-range-picker
                  v-model="date"
                  mode="month"
                  style="width: 254px; marginbottom: 20px"
                  @change="changeDateHandle"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="type" label="机构类型">
                <a-checkbox-group
                  v-model="organizationType"
                  @change="checkboxChangeHandle"
                >
                  <a-checkbox value="药店">药店</a-checkbox>
                  <a-checkbox value="分销商">分销商</a-checkbox>
                </a-checkbox-group></a-form-item
              ></a-col
            >
            <a-col :span="6">
              <a-form-item field="type" label="排序规则">
                <a-radio-group v-model="formData.sortingRule">
                  <a-radio value="1">从小到大</a-radio>
                  <a-radio value="2">从大到小</a-radio>
                </a-radio-group></a-form-item
              ></a-col
            >
          </a-row>
          <a-row justify="center">
            <a-col :span="11">
              <a-form-item field="type" label="排序依据">
                <a-radio-group v-model="formData.sortingField">
                  <a-radio value="1">销售额</a-radio>
                  <a-radio value="2">销售额变化率</a-radio>
                  <a-radio value="3">毛利润</a-radio>
                  <a-radio value="4">毛利润变化幅度</a-radio>
                  <a-radio value="5">时间</a-radio>
                </a-radio-group></a-form-item
              ></a-col
            >

            <a-col :span="2">
              <a-button html-type="submit" type="primary">确认</a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-card>

      <a-table
        :data="tableData"
        :pagination="false"
        :bordered="true"
        :loading="loading"
      >
        <template #columns>
          <a-table-column align="center" title="时间" data-index="name">
            <template #cell="{ record }"
              >{{ dayjs(record.date).format('YYYY年MM月') }}
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            title="机构名字"
            data-index="name"
          ></a-table-column>
          <a-table-column align="center" title="机构类型" data-index="type">
            <template #cell="{ record }">
              <a-tag
                :color="record.type === '分销商' ? '#86909c' : '#165dff'"
                >{{ record.type }}</a-tag
              >
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            title="负责人"
            data-index="personInCharge"
          >
            <template #cell="{ record }">
              <a-space>
                <a-tag v-for="item in record.personInCharge" :key="item">{{
                  item
                }}</a-tag>
              </a-space>
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            title="月销售额"
            data-index="totalSales"
          >
            <template #cell="{ record }">
              <a-statistic :value="record.totalSales" show-group-separator>
                <template #suffix> 元</template>
              </a-statistic>
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            title="较上月销售额变化率"
            data-index="rateSalesChange"
          >
            <template #cell="{ record }">
              <a-statistic
                :value="Math.abs(record.rateSalesChange)"
                show-group-separator
                :value-style="colorHandle(record.rateSalesChange)"
              >
                <template #prefix>
                  <icon-arrow-up v-if="record.rateSalesChange > 0" />
                  <icon-arrow-down v-else-if="record.rateSalesChange < 0" />
                  <icon-swap v-else />
                </template>
                <template #suffix>
                  % 上月:{{ record.totalSalesLastMonth }} 元</template
                >
              </a-statistic>
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            title="月毛利润"
            data-index="grossProfit"
          >
            <template #cell="{ record }">
              <a-statistic :value="record.grossProfit" show-group-separator>
                <template #suffix> 元</template>
              </a-statistic>
            </template>
          </a-table-column>
          <a-table-column
            title="较上月毛利润变化率"
            align="center"
            data-index="rateChangeGrossProfit"
          >
            <template #cell="{ record }">
              <a-statistic
                :value="Math.abs(record.rateChangeGrossProfit)"
                :value-style="colorHandle(record.rateChangeGrossProfit)"
              >
                <template #prefix>
                  <icon-arrow-up v-if="record.rateChangeGrossProfit > 0" />
                  <icon-arrow-down
                    v-else-if="record.rateChangeGrossProfit < 0"
                  />
                  <icon-swap v-else />
                </template>
                <template #suffix>
                  % 上月:{{ record.grossProfitLastMonth }} 元
                </template>
              </a-statistic></template
            >
          </a-table-column>
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-space
                ><a-button
                  size="small"
                  type="primary"
                  @click="toDataAnalysis(record.name)"
                  >数据分析</a-button
                ></a-space
              >
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-row>
        <a-pagination
          v-model:current="formData.pageNo"
          v-model:pageSize="formData.pageSize"
          :total="total"
          size="small"
          show-total
          show-jumper
          show-page-size
          @change="pageChange"
          @page-size-change="pageChange"
        />
      </a-row>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import {
    NetProfitAnalysisParams,
    TableData,
    netProfitAnalysis,
  } from '@/api/report';
  import router from '@/router';
  import dayjs from 'dayjs';
  import { ref } from 'vue';

  const formData = ref<NetProfitAnalysisParams>({});

  const changeDateHandle = (value: any) => {
    formData.value.date = value.join(',');
  };

  const date = ref<string[]>([]);

  const tableData = ref<TableData[]>([]);

  const loading = ref(false);
  const organizationType = ref(['药店', '分销商']);
  const total = ref(0);

  const toDataAnalysis = (name: string) => {
    router.push({ path: '/dashboard/detailAnalysis', query: { name } });
  };

  const colorHandle = (value: number) => {
    if (value > 0) {
      return { color: '#FF0000' };
    }
    if (value === 0) {
      return { color: '#FFAA33' };
    }
    return { color: '#0fbf60' };
  };

  const checkboxChangeHandle = (value: any[]) => {
    let result = value.join(',');
    if (value.length < 2) {
      result += ',';
    }
    formData.value.type = result;
  };

  const fetchData = async (params: NetProfitAnalysisParams) => {
    loading.value = true;
    try {
      const { data: resultData } = await netProfitAnalysis(params);
      tableData.value = resultData.records;
      total.value = resultData.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      loading.value = false;
    }
  };

  const handleSubmit = (data: any) => {
    fetchData({ ...data.values });
  };

  const pageChange = () => {
    fetchData(formData.value);
  };

  const init = () => {
    const startDate = dayjs().add(-2, 'month').format('YYYY-MM');
    const endDate = dayjs().add(-1, 'month').format('YYYY-MM');
    date.value = [startDate, endDate];
    formData.value = {
      date: `${startDate},${endDate}`,
      type: '药店,分销商',
      sortingField: '1',
      sortingRule: '2',
      pageNo: 1,
      pageSize: 10,
    };
    fetchData(formData.value);
  };
  init();
</script>

<style scoped lang="less">
  .content {
    margin: 25px;
  }
</style>
