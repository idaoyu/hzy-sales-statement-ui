<template>
  <div class="content">
    <a-space direction="vertical" fill :size="15">
      <a-row>
        <a-col :span="24">
          <a-card title="进价管理" hoverable>
            <template #extra>
              <a-link
                v-permission="['product:add']"
                @click="openAddProductModal"
                >新增商品</a-link
              >
            </template>
            <a-form :model="formData">
              <a-row>
                <a-col :span="7">
                  <a-form-item
                    field="name"
                    label="商品名字"
                    tooltip="输入想要查询的商品名字，支持模糊查询，例如：想要查询青萌铁饮品，输入[铁饮品]即可查询到"
                    allow-clear
                  >
                    <a-input
                      v-model="formData.name"
                      placeholder="如不输入则查询所有商品"
                      style="width: 240px"
                      @press-enter="search"
                    /> </a-form-item
                ></a-col>
                <a-col :span="7">
                  <a-form-item
                    field="tag"
                    label="商品标签"
                    tooltip="输入商品标签，例如儿歌/青萌等"
                  >
                    <a-input
                      v-model="formData.tag"
                      placeholder="如不输入则查询所有标签"
                      style="width: 240px"
                      @press-enter="search"
                    /> </a-form-item
                ></a-col>
              </a-row>
              <a-row justify="center">
                <a-col :span="2">
                  <a-button type="primary" @click="search">
                    <template #icon>
                      <icon-search />
                    </template>
                    <!-- Use the default slot to avoid extra spaces -->
                    <template #default>查询</template></a-button
                  >
                </a-col>
                <a-col :span="2">
                  <a-button type="primary" @click="reset">
                    <template #icon>
                      <icon-refresh />
                    </template>
                    <!-- Use the default slot to avoid extra spaces -->
                    <template #default>重置</template></a-button
                  >
                </a-col>
              </a-row>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-table
            :loading="loading"
            :bordered="true"
            :data="tableData"
            :pagination="false"
            :scroll="{ x: '100%', y: '475px' }"
          >
            <template #columns>
              <a-table-column
                title="商品名字"
                data-index="productName"
              ></a-table-column>
              <a-table-column
                title="商品标签(别名)"
                data-index="productAliasName"
              >
                <template #cell="{ record }">
                  <a-tag v-if="record.productAliasName">{{
                    record.productAliasName
                  }}</a-tag></template
                ></a-table-column
              >
              <a-table-column
                title="商品进价"
                data-index="costPrice"
              ></a-table-column>
              <a-table-column
                title="最后一次修改人"
                data-index="modifier"
              ></a-table-column>
              <a-table-column
                title="修改时间"
                data-index="updateTime"
              ></a-table-column>
              <a-table-column title="操作"
                ><template #cell="{ record }">
                  <a-space>
                    <a-button
                      v-permission="['product:update']"
                      @click="updateProduct(record.id)"
                      >修改</a-button
                    >
                    <a-popconfirm
                      content="确定要删除这条记录吗？"
                      @ok="delectProductInfo(record)"
                    >
                      <a-button v-permission="['product:delete']"
                        >删除</a-button
                      >
                    </a-popconfirm>
                  </a-space>
                </template></a-table-column
              >
            </template>
          </a-table></a-col
        >
      </a-row>
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
  import { ref } from 'vue';
  import { listProduct, deleteProduct } from '@/api/product';
  import Message from '@arco-design/web-vue/es/message';
  import router from '@/router';

  const operation = ref('修改商品');
  const visible = ref(false);
  const modalFormInitData = {
    id: 0,
    productName: '',
    productAliasName: '',
    costPrice: 0.0,
  };
  const modalForm = ref(modalFormInitData);

  const loading = ref(true);

  const total = ref(1);
  const formData = ref({ name: '', tag: '', pageNo: 1, pageSize: 10 });
  const tableData = ref([]);
  const listGet = async () => {
    loading.value = true;
    listProduct(formData.value).then((res) => {
      total.value = res.data.total;
      tableData.value = res.data.records;
      loading.value = false;
    });
  };
  listGet();
  const pageChange = () => {
    listGet();
  };

  const updateProduct = (id: number) => {
    router.push({ path: '/product/updateProduct', query: { id } });
  };
  const delectProductInfo = (record: any) => {
    deleteProduct(record.id).then((res) => {
      Message.success(res.data);
      listGet();
    });
  };

  const reset = () => {
    formData.value = { name: '', tag: '', pageNo: 1, pageSize: 10 };
    listGet();
  };

  const search = () => {
    formData.value.pageNo = 1;
    formData.value.pageSize = 10;
    listGet();
  };

  const openAddProductModal = () => {
    operation.value = '新增商品';
    modalForm.value = {
      id: 0,
      productName: '',
      productAliasName: '',
      costPrice: 0,
    };
    visible.value = true;
  };
</script>

<style scoped lang="less">
  .content {
    margin: 25px;
  }
</style>
