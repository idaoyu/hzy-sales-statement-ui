<template>
  <div class="content">
    <a-spin :loading="loading" tip="文件处理中请稍后" dot>
      <a-space direction="vertical" fill :size="15">
        <a-row>
          <a-col :span="24">
            <div class="frame-bg">
              <div class="frame-body">
                <div class="frame-aside">
                  <a-steps :current="current" direction="vertical">
                    <a-step>核对基础信息</a-step>
                    <a-step>预处理Excel文件</a-step>
                    <a-step>上传文件</a-step>
                  </a-steps>
                </div>
                <div class="frame-main">
                  <div class="main-content">{{ hint }}</div>
                  <div class="main-bottom">
                    <a-button :disabled="current === 1" @click="onPrev">
                      <icon-left />
                      上一步
                    </a-button>
                    <a-button :disabled="current === 3" @click="onNext">
                      下一步
                      <icon-right />
                    </a-button>
                  </div>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-card class="card" title="销售数据处理" hoverable
              ><a-form :model="formData" :style="{ width: '600px' }">
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      field="月份"
                      tooltip="选择想要处理的销售数据的月份"
                      label="月份"
                    >
                      <a-month-picker
                        v-model="formData.month"
                        style="width: 200px"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form> </a-card
          ></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-upload
              :auto-upload="false"
              :custom-request="uploadFile"
              accept=".xls,.xlsx"
              draggable
              action="/"
            />
          </a-col>
        </a-row>
      </a-space>
    </a-spin>
    <a-modal
      v-model:visible="visible"
      title="请完成后重试"
      :closable="false"
      :mask-closable="false"
      ok-text="确认"
      :hide-cancel="true"
      @before-ok="handleBeforeOk"
    >
      <a-card hoverable :style="{ width: '100%', marginBottom: '20px' }">
        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }"
        >
          <span
            :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
          >
            <a-avatar
              :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
              :size="28"
            >
              !
            </a-avatar>
            <a-typography-text
              >未查询到以下商品或机构信息,请到相应配置页面配置后重试</a-typography-text
            >
          </span>
        </div>
      </a-card>
      <a-table
        :data="warnMessage"
        :bordered="true"
        :pagination="false"
        :scroll="{ x: '100%', y: '300px' }"
      >
        <template #columns>
          <a-table-column title="类型" data-index="type">
            <template #cell="{ record }">
              <a-tag>{{
                record.type === 'organization' ? '机构' : '商品'
              }}</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="名字" data-index="message"> </a-table-column>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import Message from '@arco-design/web-vue/es/message';
  import { RequestOption } from '@arco-design/web-vue/es/upload';
  import { ref } from 'vue';
  import { excelHandle, getWarnMessage } from '@/api/statistics';
  import { getUserInfo } from '@/api/user';

  const loading = ref(false);

  const visible = ref(false);

  const current = ref(1);
  const hintList = [
    `在左侧菜单栏中选择 商品管理 -> 进价管理 对商品信息、以及进价等进行核对
    如有错误或缺少，执行对应修改、新增操作`,
    '在左侧菜单栏中选择 机构管理 -> 所属机构管理 对药店、分销商以及其负责人进行配置',
    '对要上传的 Excel 文件进行预处理，请删除头部没有任何文字的空行',
    '将文件拖拽或点击下方文件上传按钮对文件进行上传，稍等片刻即可得到处理好的文件',
  ];
  const hint = ref(hintList[0]);

  const onPrev = () => {
    current.value = Math.max(1, current.value - 1);
    hint.value = hintList[current.value - 1];
  };

  const onNext = () => {
    current.value = Math.min(3, current.value + 1);
    hint.value = hintList[current.value - 1];
  };

  const warnMessage = ref([]);
  const formData = ref({
    month: '',
  });
  const uploadFile = (option: RequestOption) => {
    loading.value = true;
    const { onSuccess, onError, fileItem } = option;
    const requestId = crypto.randomUUID().replace('-', '');
    getUserInfo().then(() => {
      const submitFromData = new FormData();
      submitFromData.append('file', fileItem.file as File);
      if (formData.value.month !== '') {
        submitFromData.append('yeah', formData.value.month.split('-')[0]);
        submitFromData.append('month', formData.value.month.split('-')[1]);
      }
      submitFromData.append('requestId', requestId);
      excelHandle(submitFromData)
        .then((res) => {
          getWarnMessage({ requestId }).then((resp: any) => {
            if (resp.data.notWarn) {
              const fileNameArray =
                res.headers['content-disposition'].match(/fileName=(.*)/);
              if (!fileNameArray) {
                throw new Error('系统出现错误');
              }
              const fileName = fileNameArray[1];
              debugger;
              const blob = new Blob([res.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              });
              const a = document.createElement('a');
              const URL = window.URL || window.webkitURL;
              const herf = URL.createObjectURL(blob);
              a.href = herf;
              a.download = decodeURI(fileName);
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(herf);
              Message.success('文件处理成功!处理好的文件已经为您自动下载');
              loading.value = false;
              onSuccess();
            } else {
              loading.value = false;
              warnMessage.value = resp.data.warnMessage;
              onError();
              visible.value = true;
            }
          });
        })
        .catch((error) => {
          Message.error(error);
          onError();
        });
    });
    return { onSuccess, onError };
  };

  const handleBeforeOk = (done: any) => {
    done();
  };
</script>

<style scoped lang="less">
  .content {
    margin: 25px;
  }

  .frame-bg {
    background: var(--color-fill-2);
  }

  .frame-body {
    display: flex;
    background: var(--color-bg-2);
  }

  .frame-aside {
    padding: 20px;
    min-width: 240px;
    border-right: 1px solid var(--color-border);
  }

  .frame-main {
    width: 100%;
  }

  .main-content {
    text-align: center;
    line-height: 200px;
  }

  .main-bottom {
    display: flex;
    justify-content: center;

    button {
      margin: 0 20px 10px 20px;
    }
  }

  .arco-spin {
    height: 100%;
    width: 100%;
  }
</style>
