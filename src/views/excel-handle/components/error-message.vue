<template>
  <div>
    <a-modal
      :visible="props.visible"
      title="处理文件时发生错误"
      :closable="false"
      :mask-closable="false"
      ok-text="确认"
      :hide-cancel="true"
      @before-ok="closedModal"
      @before-open="openModal"
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
            <a-typography-text>{{ errorMessage }}</a-typography-text>
          </span>
        </div>
      </a-card>
      <div v-if="props.type === 'DataNeedsCompleted'">
        <a-table
          :data="tableData"
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
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    data: {
      type: String,
      default: '',
    },
  });

  const tableData = ref([]);

  const errorMessage = ref('');

  const emit = defineEmits(['update:visible']);

  const closedModal = (done: any) => {
    emit('update:visible', false);
    done();
  };

  const openModal = () => {
    if (props.type === 'DataNeedsCompleted') {
      tableData.value = JSON.parse(props.data);
      errorMessage.value =
        '未查询到以下商品或机构信息,请到相应配置页面配置后重试';
    } else if (props.type === 'BusinessException') {
      errorMessage.value = props.message;
    } else if (props.type === 'Unknown') {
      errorMessage.value = '系统出现未知错误，已将错误信息归档，请联系管理员';
    }
  };
</script>
