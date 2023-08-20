<template
  ><div class="content">
    <a-space direction="vertical" fill :size="15">
      <a-card title="出货单明细">
        <a-form :model="searchForm" @submit="search">
          <a-space direction="vertical" fill :size="15">
            <a-row>
              <a-col :span="6">
                <a-form-item field="name" label="机构名字">
                  <a-auto-complete
                    v-model:model-value="searchForm.organizationName"
                    allow-clear
                    :data="searchData"
                    placeholder="请输入机构名字"
                    style="width: 254px"
                    @search="handleSearch" /></a-form-item
              ></a-col>
              <a-col :span="6">
                <a-form-item field="name" label="机构类型">
                  <a-select
                    v-model:model-value="searchForm.organizationType"
                    allow-clear
                    :style="{ width: '254px' }"
                    placeholder="请选择机构类型"
                  >
                    <a-option>药店</a-option>
                    <a-option>分销商</a-option>
                  </a-select>
                </a-form-item></a-col
              >
              <a-col :span="6">
                <a-form-item field="name" label="单据类型">
                  <a-select
                    v-model:model-value="searchForm.orderType"
                    allow-clear
                    :style="{ width: '254px' }"
                    placeholder="请选择单据类型"
                  >
                    <a-option>销售单</a-option>
                    <a-option>销售退货单</a-option>
                    <a-option>客情单</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="name" label="出货时间">
                  <a-range-picker
                    v-model:model-value="searchForm.date"
                    allow-clear
                    style="width: 254px; marginbottom: 20px"
                  /> </a-form-item
              ></a-col>
            </a-row>
            <a-row>
              <a-col :span="6">
                <a-form-item field="name" label="商品名字">
                  <a-input
                    v-model="searchForm.productName"
                    allow-clear
                    placeholder="请输入商品名字"
                    style="width: 254px"
                  /> </a-form-item
              ></a-col>
            </a-row>
            <a-row justify="center">
              <a-space :size="30">
                <a-button type="primary" html-type="submit">搜索</a-button>
                <a-button @click="clearWhere">重制条件</a-button>
              </a-space>
            </a-row>
          </a-space>
        </a-form>
      </a-card>
      <a-table
        v-model:selected-keys="selectedKeys"
        :loading="loading"
        :data="tableData"
        :pagination="false"
        :bordered="{ cell: true }"
        :scroll="{ y: '435px', x: '100%' }"
        scrollbar
        :row-selection="{
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: true,
        }"
        row-key="id"
      >
        <template #columns>
          <a-table-column
            title="单据编号"
            fixed="left"
            :width="200"
            align="center"
            data-index="receiptId"
          ></a-table-column>
          <a-table-column
            align="center"
            title="单据类型"
            :width="130"
            data-index="type"
          >
            <template #cell="{ record }">
              <a-tag v-if="record.type === '客情单'" color="#168cff">{{
                record.type
              }}</a-tag>
              <a-tag
                v-else
                :color="record.type === '销售单' ? '#ffb400' : '#f53f3f'"
                >{{ record.type }}</a-tag
              >
            </template>
          </a-table-column>
          <a-table-column
            title="单据摘要"
            align="center"
            :width="260"
            data-index="documentAbstract"
          >
            <template #cell="{ record }">
              <a-popover
                title="单据摘要"
                :trigger="
                  record.documentAbstract.length > 10 ? 'hover' : 'click'
                "
              >
                <div>
                  {{
                    record.documentAbstract.length > 10
                      ? record.documentAbstract.slice(0, 10) + '...'
                      : record.documentAbstract
                  }}
                </div>
                <template #content>
                  <p>{{ record.documentAbstract }}</p>
                </template>
              </a-popover>
            </template>
          </a-table-column>
          <a-table-column
            title="商品名字"
            align="center"
            :width="300"
            data-index="productName"
          >
            <template #cell="{ record }">
              <a-popover
                title="单据摘要"
                :trigger="record.productName.length > 20 ? 'hover' : 'click'"
              >
                <div>
                  {{
                    record.productName.length > 20
                      ? record.productName.slice(0, 20) + '...'
                      : record.productName
                  }}
                </div>
                <template #content>
                  <p>{{ record.productName }}</p>
                </template>
              </a-popover>
            </template>
          </a-table-column>
          <a-table-column
            title="机构名字"
            align="center"
            :width="360"
            data-index="storeName"
          ></a-table-column>
          <a-table-column
            title="经办人"
            :width="200"
            align="center"
            data-index="agent"
          ></a-table-column>
          <a-table-column
            title="数量"
            :width="100"
            align="center"
            data-index="number"
          ></a-table-column>
          <a-table-column
            title="销售金额"
            align="center"
            :width="200"
            data-index="salesAmount"
          ></a-table-column>
          <a-table-column
            title="总成本"
            align="center"
            :width="200"
            data-index="totalCost"
          ></a-table-column>
          <a-table-column
            title="总利润"
            align="center"
            :width="200"
            data-index="profit"
          ></a-table-column>
          <a-table-column
            title="单据日期"
            align="center"
            :width="150"
            data-index="date"
          ></a-table-column>
          <a-table-column
            align="center"
            title="单据签名指纹"
            data-index="hashCode"
            :width="280"
          >
            <template #cell="{ record }">
              <a-tag>{{ record.hashCode }}</a-tag></template
            >
          </a-table-column>
        </template>
      </a-table>
      <a-pagination
        v-model:current="pageNo"
        v-model:pageSize="pageSize"
        :total="total"
        size="small"
        show-total
        show-jumper
        show-page-size
        @change="pageChange"
        @page-size-change="pageChange"
      />
    </a-space>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { PageGetParams, pageGet, searchOrganizationName } from '@/api/order';

  const { loading, setLoading } = useLoading(true);

  const pageSize = ref(20);
  const pageNo = ref(1);
  const total = ref(0);
  const searchForm = ref<any>({});

  const tableData = ref([]);

  const fetchData = async (params: PageGetParams) => {
    setLoading(true);
    try {
      const { data } = await pageGet(params);
      tableData.value = data.records;
      total.value = data.total;
      pageNo.value = data.current;
      pageSize.value = data.size;
    } catch (err) {
      // do...
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      pageNo: 1,
      pageSize: 20,
      ...searchForm.value,
    });
  };

  const pageChange = () => {
    fetchData({
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      ...searchForm.value,
    });
  };

  fetchData({ pageNo: pageNo.value, pageSize: pageSize.value });

  const searchData = ref([]);

  const handleSearch = async (value: string) => {
    if (value) {
      const { data } = await searchOrganizationName(value);
      searchData.value = data;
    } else {
      searchData.value = [];
    }
  };

  const selectedKeys = ref([]);

  const clearWhere = () => {
    searchForm.value = {};
  };
</script>

<style scoped lang="less">
  .content {
    margin: 25px;
  }
</style>
