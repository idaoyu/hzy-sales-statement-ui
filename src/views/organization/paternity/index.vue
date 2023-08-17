<template>
  <div class="content">
    <a-space direction="vertical" fill :size="15">
      <a-page-header
        :style="{ background: 'var(--color-bg-2)' }"
        title="分销商附属关系配置"
        :show-back="false"
      >
        <template #extra>
          <a-button type="primary" @click="openAddModal">新增附属关系</a-button>
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
            title="目标分销商"
            data-index="targetName"
          ></a-table-column>
          <a-table-column
            align="center"
            title="该分销商的父级"
            data-index="parentName"
          ></a-table-column>
          <a-table-column
            align="center"
            title="该附属关系开始时间"
            data-index="startTime"
          >
          </a-table-column>
          <a-table-column
            align="center"
            title="该附属关系结束时间"
            data-index="endTime"
          >
            <template #cell="{ record }">
              {{ record.endTime == null ? '未定义结束时间' : record.endTime }}
            </template></a-table-column
          >
          <a-table-column
            title="操作人"
            align="center"
            data-index="operatorName"
          ></a-table-column>
          <a-table-column align="center" title="操作">
            <template #cell="{ record }">
              <a-space>
                <a-button
                  type="primary"
                  size="small"
                  @click="openUpdataModal(record)"
                  >编辑</a-button
                >
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
      v-model:visible="updataVisible"
      title="修改附属关系"
      :width="530"
      :on-before-ok="handleUpdataBeforeOk"
      :ok-loading="okLoading"
      @cancel="handleUpdataCancel"
    >
      <a-form
        ref="formRef"
        :model="updateModalForm"
        :label-col-props="{ span: 7, offest: 0 }"
        :wrapper-col-props="{ span: 17, offest: 0 }"
      >
        <a-form-item field="targetName" label="目标分销商名字">
          <a-input
            v-model="updateModalForm.targetName"
            disabled
            style="width: 197px"
          ></a-input>
        </a-form-item>
        <a-form-item field="parentName" label="该分销商父级的名字">
          <a-input
            v-model="updateModalForm.parentName"
            disabled
            style="width: 197px"
          ></a-input>
        </a-form-item>
        <a-form-item field="startTime" label="附属关系开始时间">
          <a-date-picker
            v-model="updateModalForm.startTime"
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item field="endTime" label="附属关系结束时间">
          <a-date-picker
            v-model="updateModalForm.endTime"
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="addVisible"
      title="新增附属关系"
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
        <a-form-item field="targetName" label="目标分销商名字">
          <a-auto-complete
            v-model:model-value="addModalForm.targetName"
            :data="searchData"
            :style="{ width: '197px' }"
            placeholder="请输入名字"
            @search="handleSearch"
          />
        </a-form-item>
        <a-form-item field="parentName" label="该分销商父级的名字">
          <a-auto-complete
            v-model:model-value="addModalForm.parentName"
            :data="searchData"
            :style="{ width: '197px' }"
            placeholder="请输入名字"
            @search="handleSearch"
          />
        </a-form-item>
        <a-form-item field="startTime" label="附属关系开始时间">
          <a-date-picker
            v-model="addModalForm.startTime"
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
        <a-form-item field="endTime" label="附属关系结束时间">
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
  import {
    addPatenity,
    page,
    updateTime,
    searchOrganizationName,
    deletePatenity,
  } from '@/api/paternity';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';
  import { ref } from 'vue';

  const { loading, setLoading } = useLoading(true);

  const pageNo = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  const tableDate = ref([]);
  const fetchData = async (no: number, size: number) => {
    setLoading(true);
    try {
      const { data } = await page({ pageNo: no, pageSize: size });
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

  const updataVisible = ref(false);
  const updateModalForm = ref<any>({});
  const okLoading = ref(false);

  const openUpdataModal = (record: any) => {
    updateModalForm.value = JSON.parse(JSON.stringify(record));
    updataVisible.value = true;
  };

  const handleUpdataBeforeOk = async (done: any) => {
    const { data } = await updateTime({
      id: updateModalForm.value.id,
      startTime: updateModalForm.value.startTime,
      endTime: updateModalForm.value.endTime,
    });
    if (data) {
      fetchData(pageNo.value, pageSize.value);
      Message.success('修改成功');
      updateModalForm.value = {};
      done();
    }
  };

  const handleUpdataCancel = () => {
    updateModalForm.value = {};
  };

  const addVisible = ref(false);
  const addModalForm = ref<any>({});

  const handleAddBeforeOk = async (done: any) => {
    const { data } = await addPatenity(addModalForm.value);
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

  const handleDelete = async (id: number) => {
    const { data } = await deletePatenity(id);
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
