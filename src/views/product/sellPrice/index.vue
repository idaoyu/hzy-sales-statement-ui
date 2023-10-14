<template>
  <div class="content">
    <a-space direction="vertical" fill :size="15">
      <a-page-header
        :style="{ background: 'var(--color-bg-2)' }"
        title="指定分销商出货价配置"
        :show-back="false"
      >
        <template #extra>
          <a-button type="primary" @click="openAddModal">新增配置</a-button>
        </template>
      </a-page-header>

      <a-table
        :loading="loading"
        :bordered="true"
        :data="tableDate"
        :pagination="false"
        :scroll="{ x: '100%', y: '475px' }"
      >
        <template #columns>
          <a-table-column
            align="center"
            title="分销商名字"
            data-index="organizationName"
          ></a-table-column>
          <a-table-column
            align="center"
            title="商品名字"
            data-index="productName"
          ></a-table-column>
          <a-table-column align="center" title="商品出货价" data-index="price">
            <template #cell="{ record }">
              {{ record.price }}元
            </template></a-table-column
          >
          <a-table-column
            align="center"
            title="生效时间"
            data-index="startTime"
          >
          </a-table-column>
          <a-table-column align="center" title="失效时间" data-index="endTime">
            <template #cell="{ record }">
              {{ record.endTime == null ? '未定义失效时间' : record.endTime }}
            </template></a-table-column
          >
          <a-table-column align="center" title="操作">
            <template #cell="{ record }">
              <a-space>
                <a-popconfirm
                  content="确定要删除这条记录吗？"
                  @ok="handleDelete(record.id)"
                >
                  <a-button>删除</a-button>
                </a-popconfirm>
              </a-space>
            </template>
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

    <a-modal
      v-model:visible="addVisible"
      title="新增出货价配置"
      :width="530"
      :on-before-ok="handleAddBeforeOk"
      :ok-loading="okLoading"
      @cancel="handleAddCancel"
    >
      <a-form
        ref="formRef"
        :model="addModalForm"
        :label-col-props="{ span: 7, offest: 0 }"
        :wrapper-col-props="{ span: 17, offest: 0 }"
      >
        <a-form-item field="productName" label="商品名字">
          <a-auto-complete
            v-model:model-value="addModalForm.productName"
            :data="searchProductData"
            :style="{ width: '197px' }"
            placeholder="请输入商品名字"
            @search="handleProductSearch"
          />
        </a-form-item>
        <a-form-item field="organizationName" label="分销商名字">
          <a-auto-complete
            v-model:model-value="addModalForm.organizationName"
            :data="searchData"
            :style="{ width: '197px' }"
            placeholder="请输入分销商名字"
            @search="handleSearch"
          />
        </a-form-item>
        <a-form-item field="price" label="商品出货价">
          <a-input
            v-model="addModalForm.price"
            placeholder="请输入商品出货价"
            :style="{ width: '197px' }"
          ></a-input>
        </a-form-item>
        <a-form-item field="startTime" label="配置生效开始时间">
          <a-date-picker
            v-model="addModalForm.startTime"
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item field="endTime" label="配置生效结束时间">
          <a-date-picker
            v-model="addModalForm.endTime"
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import {
    pageGetSellPrice,
    addSellPrice,
    deleteSellPrice,
  } from '@/api/sellPrice';
  import { searchProduct } from '@/api/product';
  import { searchOrganizationName } from '@/api/paternity';

  const { loading, setLoading } = useLoading(true);

  const pageNo = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  const tableDate = ref([]);
  const fetchData = async (no: number, size: number) => {
    setLoading(true);
    try {
      const { data } = await pageGetSellPrice({ pageNo: no, pageSize: size });
      total.value = data.total;
      tableDate.value = data.records;
    } catch (err) {
      // do ...
    } finally {
      setLoading(false);
    }
  };

  const pageChange = () => {
    fetchData(pageNo.value, pageSize.value);
  };
  fetchData(pageNo.value, pageSize.value);

  const okLoading = ref(false);

  const addVisible = ref(false);
  const addModalForm = ref<any>({});

  const handleAddBeforeOk = async (done: any) => {
    const { data } = await addSellPrice(addModalForm.value);
    if (data) {
      fetchData(pageNo.value, pageSize.value);
      Message.success('添加成功');
      addModalForm.value = {};
      done();
    }
  };

  const handleAddCancel = () => {
    addModalForm.value = {};
  };

  const openAddModal = () => {
    addVisible.value = true;
  };

  const searchData = ref([]);
  const handleSearch = async (value: string) => {
    if (value) {
      const { data } = await searchOrganizationName(value);
      searchData.value = data;
    } else {
      searchData.value = [];
    }
  };

  const searchProductData = ref([]);
  const handleProductSearch = async (value: string) => {
    if (value) {
      const { data } = await searchProduct(value);
      searchProductData.value = data;
    } else {
      searchProductData.value = [];
    }
  };

  const handleDelete = async (id: number) => {
    const { data } = await deleteSellPrice(id);
    if (data) {
      Message.success('删除成功');
      fetchData(pageNo.value, pageSize.value);
    } else {
      Message.error('删除失败，请稍后重试');
    }
  };
</script>

<style>
  .content {
    margin: 25px;
  }
</style>
