<template>
  <div class="content">
    <a-space direction="vertical" fill :size="15">
      <a-page-header
        :show-back="false"
        :style="{ background: 'var(--color-bg-2)' }"
        title="生成报表"
        subtitle="上传并生成销售报表"
      >
        <template #extra>
          <a-button
            v-permission="['excel.handle']"
            type="primary"
            @click="uploadVisible = true"
            >上传文件</a-button
          >
        </template>
      </a-page-header>
      <a-steps type="arrow" :current="1">
        <a-step description="点击右上角上传文件按钮，上传文件并填写备注信息"
          >上传文件</a-step
        >
        <a-step description="点击查看状态按钮查看文件处理步骤，直到文件处理完成"
          >等待文件处理完成</a-step
        >
        <a-step description="点击下载文件按钮，即可将处理好的文件下载到本地"
          >下载文件</a-step
        >
      </a-steps>
      <a-table
        :data="tableData"
        :bordered="true"
        :pagination="false"
        :loading="loading"
      >
        <template #columns>
          <a-table-column title="生成报表编号" data-index="id" align="center">
            <template #cell="{ record }">
              <a-tag>{{ record.id }}</a-tag>
            </template>
          </a-table-column>
          <a-table-column
            align="center"
            title="描述信息"
            data-index="description"
          >
            <template #cell="{ record }">
              <a-popover
                title="描述信息"
                :trigger="record.description.length > 20 ? 'hover' : 'click'"
              >
                <div>
                  {{
                    record.description.length > 20
                      ? record.description.slice(0, 20) + '...'
                      : record.description
                  }}
                </div>
                <template #content>
                  <p>{{ record.description }}</p>
                </template>
              </a-popover>
            </template>
          </a-table-column>
          <a-table-column title="当前状态" align="center" data-index="status">
            <template #cell="{ record }">
              <a-tag
                v-if="record.errorType === 'DataNeedsCompleted'"
                color="#165dff"
              >
                <a-space
                  ><icon-question-circle-fill /> 缺少机构或商品配置</a-space
                >
              </a-tag>
              <a-tag v-else-if="record.status === 'error'" color="#f53f3f"
                ><a-space
                  ><icon-info-circle-fill /> 由于产生错误，已终止</a-space
                ></a-tag
              >
              <a-tag v-else-if="record.status === 'success'" color="#7bc616"
                ><a-space><icon-check-circle-fill />已完成</a-space></a-tag
              >
              <a-tag v-else color="#165dff"
                ><a-space><icon-loading />正在处理中</a-space></a-tag
              >
            </template>
          </a-table-column>
          <a-table-column
            title="创建人"
            align="center"
            data-index="operator"
          ></a-table-column>
          <a-table-column
            title="创建时间"
            align="center"
            data-index="createTime"
          ></a-table-column>
          <a-table-column
            title="原始文件"
            data-index="sourceFilePath"
            align="center"
          >
            <template #cell="{ record }">
              <a-link :href="record.sourceFilePath">下载文件</a-link>
            </template></a-table-column
          >
          <a-table-column
            title="处理后文件"
            align="center"
            data-index="resultFilePath"
            ><template #cell="{ record }">
              <a-link
                v-if="record.resultFilePath != null"
                :href="record.resultFilePath"
                >下载文件</a-link
              >
            </template></a-table-column
          >
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button
                  :disabled="
                    record.status === 'success' || record.status === 'inProcess'
                  "
                  size="small"
                  @click="openErrorMessage(record)"
                  ><icon-question-circle-fill />查看错误信息</a-button
                >
                <a-button
                  type="primary"
                  size="small"
                  @click="openStatusModal(record)"
                  ><icon-menu-unfold />查看状态</a-button
                >
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

    <!-- 上传文件 -->
    <a-modal
      v-model:visible="uploadVisible"
      title="上传文件"
      :hide-cancel="true"
      @ok="handleCancel"
    >
      <a-space direction="vertical" fill :size="15">
        <a-card>
          请输入本次上传文件的一些描述信息，用来提醒自己本次上传的原因，
          并在下方文件上传区域 点击或将文件拖拽到区域内进行上传，
          上传完成后点击确认，即可。
        </a-card>
        <a-textarea
          v-model:model-value="description"
          placeholder="请输入描述信息"
          allow-clear
        />
        <a-upload
          draggable
          action="/"
          :auto-upload="false"
          :custom-request="handleUploadFile"
        />
      </a-space>
    </a-modal>

    <!-- 错误信息弹窗 -->
    <ErrorMessage
      v-model:visible="errorMessageVisible"
      :type="errorType"
      :message="errorMessage"
      :data="errorData"
    />

    <!-- 当前状态 -->
    <Status :id="taskId" v-model:visible="statusVisible" />
  </div>
</template>

<script lang="ts" setup>
  import {
    TaskFileHandleLog,
    pageExcelHandle,
    uploadFile,
  } from '@/api/excel-handle';
  import Message from '@arco-design/web-vue/es/message';
  import { RequestOption } from '@arco-design/web-vue/es/upload/interfaces';
  import { ref, watch } from 'vue';
  import ErrorMessage from './components/error-message.vue';
  import Status from './components/status.vue';

  const loading = ref(false);

  const tableData = ref<TaskFileHandleLog[]>([]);

  const pageNo = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const uploadVisible = ref(false);
  const errorMessageVisible = ref(false);
  const statusVisible = ref(false);

  const description = ref('');

  const handleCancel = () => {
    uploadVisible.value = false;
  };
  const taskId = ref('');

  const fetchData = async (no: number, size: number) => {
    try {
      loading.value = true;
      const { data } = await pageExcelHandle({ pageNo: no, pageSize: size });
      tableData.value = data.records;
      total.value = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      loading.value = false;
    }
  };

  const pageChange = () => {
    fetchData(pageNo.value, pageSize.value);
  };

  const handleUploadFile = (option: RequestOption) => {
    const { onSuccess, onError, fileItem } = option;
    if (description.value === '') {
      Message.error('描述不能为空');
      onError();
      return { onSuccess, onError };
    }

    const fileUpLoadFromData = new FormData();
    fileUpLoadFromData.append('file', fileItem.file as File);
    fileUpLoadFromData.append('description', description.value);
    Message.info('文件上传中,请稍后,上传完成后将会自动关闭对话框');
    uploadFile(fileUpLoadFromData)
      .then((resp) => {
        taskId.value = resp.data.taskId;
        // 只有成功时才关闭弹窗
        uploadVisible.value = false;
        statusVisible.value = true;
        fetchData(pageNo.value, pageSize.value);
        onSuccess();
      })
      .catch(() => {
        // do ...
      })
      .finally(() => {
        description.value = '';
      });
    return { onSuccess, onError };
  };

  const errorType = ref('');
  const errorMessage = ref('');
  const errorData = ref('');
  const openErrorMessage = (record: any) => {
    errorMessageVisible.value = true;
    errorType.value = record.errorType;
    errorMessage.value = record.errorMessage;
    errorData.value = record.errorData;
  };

  const openStatusModal = (record: any) => {
    taskId.value = record.id;
    statusVisible.value = true;
  };

  fetchData(pageNo.value, pageSize.value);

  watch(statusVisible, (newValue) => {
    if (!newValue) {
      fetchData(pageNo.value, pageSize.value);
    }
  });
</script>

<style scoped lang="less">
  .content {
    margin: 25px;
  }
</style>
