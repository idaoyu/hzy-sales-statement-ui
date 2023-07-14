<template>
  <div class="content">
    <a-space direction="vertical" fill :size="15">
      <a-row>
        <a-col :span="24">
          <a-card title="机构负责人管理" hoverable>
            <template #extra>
              <a-link @click="visible = true">新增机构</a-link>
            </template>
            <a-form :model="formData">
              <a-row>
                <a-col :span="7">
                  <a-form-item
                    field="name"
                    label="机构名字"
                    tooltip="支持模糊查询，例如：想要宝贝奇遇34中，输入[宝贝]即可查询到"
                    allow-clear
                  >
                    <a-input
                      v-model="formData.organizationName"
                      placeholder="如不输入则查询所有机构"
                      style="width: 240px"
                    /> </a-form-item
                ></a-col>
                <a-col :span="7">
                  <a-form-item
                    field="tag"
                    label="机构标签"
                    tooltip="请输入完整标签，否则会查询不到"
                  >
                    <a-input
                      v-model="formData.organizationNameTag"
                      placeholder="如不输入则查询所有标签"
                      style="width: 240px"
                    /> </a-form-item
                ></a-col>
                <a-col :span="7">
                  <a-form-item
                    field="tag"
                    label="机构类型"
                    tooltip="除分销商外的机构统一叫做药店"
                  >
                    <a-select
                      v-model:model-value="formData.type"
                      placeholder="请选择机构类型"
                    >
                      <a-option label="全部" value=""></a-option>
                      <a-option label="药店" value="药店"></a-option>
                      <a-option label="分销商" value="分销商"></a-option>
                    </a-select> </a-form-item
                ></a-col>
              </a-row>
              <a-row>
                <a-col :span="7">
                  <a-form-item field="tag" label="负责方式">
                    <a-radio-group v-model="formData.responsibleType">
                      <a-radio value="">全部</a-radio>
                      <a-radio value="单人负责">单人负责</a-radio>
                      <a-radio value="多人负责">多人负责</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </a-col>
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
                title="机构名字"
                data-index="organizationName"
              ></a-table-column>
              <a-table-column title="机构标签" data-index="organizationAlias">
                <template #cell="{ record }">
                  <a-tag v-if="record.organizationAlias">{{
                    record.organizationAlias
                  }}</a-tag></template
                ></a-table-column
              >
              <a-table-column
                title="机构类型"
                data-index="type"
              ></a-table-column>
              <a-table-column
                title="负责类型"
                data-index="responsibleType"
              ></a-table-column>
              <a-table-column title="负责人" data-index="principalNameList">
                <template #cell="{ record }">
                  <a-space>
                    <a-tag
                      v-for="item in record.principalNameList"
                      :key="item"
                      >{{ item }}</a-tag
                    >
                  </a-space>
                </template></a-table-column
              >
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
                    <a-button @click="updateOrganization">修改</a-button>
                    <a-popconfirm
                      content="确定要删除这条记录吗？"
                      @ok="delectOrganization(record)"
                    >
                      <a-button>删除</a-button>
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
      </a-row>
    </a-space>
    <a-modal
      v-model:visible="visible"
      title="新增机构"
      :width="600"
      :on-before-ok="handleBeforeOk"
      :ok-loading="okLoading"
      @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="modalForm">
        <a-form-item field="type" label="机构类型">
          <a-radio-group v-model:model-value="modalForm.type">
            <a-radio value="药店">药店</a-radio>
            <a-radio value="分销商">分销商</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="modalForm.type === '药店'"
          field="organizationName"
          label="负责人"
        >
          <a-checkbox-group v-model="modalForm.principalId">
            <a-checkbox :value="1">李梦</a-checkbox>
            <a-checkbox :value="2">张怡静</a-checkbox>
            <a-checkbox :value="3">张艳霞</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item field="organizationName" label="机构名字">
          <a-input v-model="modalForm.organizationName"></a-input>
        </a-form-item>
        <a-form-item field="organizationAlias" label="机构标签">
          <a-input v-model="modalForm.organizationAlias"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    listOrganization,
    deleteOrganization,
    addOrganization,
  } from '@/api/organization';
  import Message from '@arco-design/web-vue/es/message';

  const pageNo = ref(1);
  const pageSize = ref(10);
  const loading = ref(false);
  const total = ref(0);
  const tableData = ref([]);
  const visible = ref(false);

  const formData = ref({
    organizationName: '',
    organizationNameTag: '',
    type: '',
    responsibleType: '',
  });

  const doListProduct = () => {
    loading.value = true;
    const params: any = {};
    Object.assign(params, formData.value);
    params.pageNo = pageNo.value;
    params.pageSize = pageSize.value;
    listOrganization(params)
      .then((res) => {
        total.value = res.data.total;
        tableData.value = res.data.records;
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };
  doListProduct();

  const pageChange = () => {
    doListProduct();
  };

  const reset = () => {
    pageNo.value = 1;
    pageSize.value = 10;
    formData.value = {
      organizationName: '',
      organizationNameTag: '',
      type: '',
      responsibleType: '',
    };
    doListProduct();
  };

  const search = () => {
    pageNo.value = 1;
    pageSize.value = 10;
    doListProduct();
  };

  const updateOrganization = () => {
    // const updateOrganization = (record: any) => {
    Message.warning({
      content: '暂不支持修改操作',
      duration: 5 * 1000,
    });
  };
  const delectOrganization = (record: any) => {
    deleteOrganization(record.id).then((res) => {
      Message.success(res.data);
      doListProduct();
    });
  };

  const modalForm = ref({
    type: '',
    organizationName: '',
    principalId: [],
    organizationAlias: '',
  });

  const handleCancel = () => {
    visible.value = false;
    modalForm.value = {
      type: '',
      organizationName: '',
      principalId: [],
      organizationAlias: '',
    };
  };

  const okLoading = ref(false);

  const handleBeforeOk = (done: any) => {
    okLoading.value = true;
    addOrganization(modalForm.value)
      .then((res) => {
        modalForm.value = {
          type: '',
          organizationName: '',
          principalId: [],
          organizationAlias: '',
        };
        Message.success(res.data);
        doListProduct();
        done();
      })
      .catch(() => {
        done(false);
        okLoading.value = false;
      });
  };
</script>

<style scoped lang="less">
  .content {
    margin: 25px;
  }
</style>
