<template>
  <div>
    <a-modal
      :visible="props.visible"
      :title="`生成报表任务当前状态（编号：${props.id.slice(0, 10)}...）`"
      ok-text="关闭"
      :hide-cancel="true"
      @before-ok="closedModal"
      @before-open="openModal"
    >
      <a-space direction="vertical" fill :size="10">
        <div style="text-align: center; padding-bottom: 20px">
          <a-space :size="20">
            <a-tag>当前状态</a-tag>
            <a-tag
              v-if="currentStatus === 'process' || currentStatus === 'wait'"
              color="#168cff"
            >
              <a-space><icon-loading />文件正在处理中...</a-space></a-tag
            >
            <a-tag v-else-if="currentStatus === 'error'" color="#f53f3f">
              <a-space><icon-close-circle-fill />文件处理时发生错误！</a-space>
            </a-tag>
            <a-tag v-else-if="currentStatus === 'finish'" color="#00b42a"
              ><a-space><icon-check-circle-fill />文件处理完成</a-space></a-tag
            >
            <a-link v-show="resultFilePath != undefined" :href="resultFilePath"
              >下载文件</a-link
            >
          </a-space>
        </div>
        <a-steps
          v-model:current="currentStep"
          :status="currentStatus"
          direction="vertical"
          style="padding-left: 20px"
          small
        >
          <a-step>
            获取您上传的文件
            <template #icon>
              <icon-loading v-if="currentStep === 1" />
              <icon-download v-else />
            </template>
          </a-step>
          <a-step>
            读取文件中内容
            <template #icon>
              <icon-loading v-if="currentStep === 2" />
              <icon-find-replace v-else />
            </template>
          </a-step>
          <a-step>
            对数据进行预先处理
            <template #icon>
              <icon-loading v-if="currentStep === 3" />
              <icon-select-all v-else />
            </template>
          </a-step>
          <a-step>
            转化成数据报表（可能耗时较长，请耐心等待）
            <template #icon>
              <icon-loading v-if="currentStep === 4" />
              <icon-translate v-else />
            </template>
          </a-step>
          <a-step>
            生成所需要的结果文件
            <template #icon>
              <icon-loading v-if="currentStep === 5" />
              <icon-bar-chart v-else />
            </template>
          </a-step>
          <a-step>
            返回下载链接
            <template #icon>
              <icon-loading v-if="currentStep === 6" />
              <icon-share-internal v-else />
            </template>
          </a-step>
          <a-step>
            处理完成
            <template #icon>
              <icon-check-circle-fill />
            </template>
          </a-step>
        </a-steps>
      </a-space>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { getOne } from '@/api/excel-handle';
  import { ref } from 'vue';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: '',
    },
  });

  const currentStep = ref(1);
  const currentStatus = ref<'wait' | 'process' | 'finish' | 'error'>('wait');
  const resultFilePath = ref<string>();

  const emit = defineEmits(['update:visible']);

  const timer = ref<any>();

  const closedModal = (done: any) => {
    emit('update:visible', false);
    clearInterval(timer.value);
    currentStep.value = 0;
    currentStatus.value = 'wait';
    resultFilePath.value = undefined;
    done();
  };

  const fetchData = async (id: string) => {
    const { data } = await getOne(id);
    currentStep.value = data.handleStep;
    resultFilePath.value = data.resultFilePath;
    if (data.status === 'success') {
      currentStatus.value = 'finish';
      clearInterval(timer.value);
    } else if (data.status === 'inProcess') {
      currentStatus.value = 'process';
    } else {
      currentStatus.value = 'error';
      clearInterval(timer.value);
    }
  };

  const openModal = () => {
    timer.value = setInterval(() => {
      fetchData(props.id);
    }, 200);
  };
</script>
