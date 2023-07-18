<template>
  <div class="content">
    <a-space direction="vertical" fill :size="15">
      <a-page-header title="返回" subtitle="机构的一生" @back="back">
      </a-page-header>
      <a-row>
        <a-card title="机构信息" style="width: 100%" hoverable>
          <template #extra>
            <a-link @click="updateCurrentPrincipal">修改机构当前负责人</a-link>
          </template>
          <a-form :model="formData">
            <a-row>
              <a-col :span="6">
                <a-form-item field="name" label="机构名字">
                  <a-input
                    v-model="formData.organizationName"
                    disabled
                  /> </a-form-item
              ></a-col>
              <a-col :span="6">
                <a-form-item field="name" label="机构标签">
                  <a-input
                    v-model="formData.organizationAlias"
                    disabled
                  /> </a-form-item
              ></a-col>
              <a-col :span="6">
                <a-form-item field="name" label="机构类型">
                  <a-input v-model="formData.type" disabled /> </a-form-item
              ></a-col>
              <a-col :span="6">
                <a-form-item field="name" label="负责方式">
                  <a-input
                    v-model="formData.responsibleType"
                    disabled
                  /> </a-form-item
              ></a-col>
            </a-row>
            <a-row>
              <a-col :span="6">
                <a-form-item field="name" label="负责人">
                  <a-tag
                    v-for="item in formData.principalNameList"
                    :key="item"
                    >{{ item }}</a-tag
                  >
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="name" label="创建时间">
                  <a-date-picker
                    v-model="formData.createTime"
                    style="width: 271.84px; margin: 0 24px 24px 0"
                    show-time
                    readonly
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="name" label="修改时间">
                  <a-date-picker
                    v-model="formData.updateTime"
                    style="width: 271.84px; margin: 0 24px 24px 0"
                    show-time
                    readonly
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="name" label="修改人">
                  <a-input v-model="formData.modifier" disabled /> </a-form-item
              ></a-col>
            </a-row>
          </a-form>
        </a-card>
      </a-row>
      <a-card>
        <a-timeline mode="alternate">
          <a-timeline-item :label="formData.createTime">
            <template #dot>
              <icon-moon-fill size="20px" />
            </template>
            创建机构</a-timeline-item
          >
          <a-timeline-item
            v-for="(item, index) in timeline"
            :key="item.date"
            :label="item.date"
          >
            <a-space>
              <div v-if="index === 0">
                <a-space>
                  <a-tag bordered color="green">创建时</a-tag>由
                </a-space>
              </div>
              <div v-else>
                <a-space>
                  <a-tag bordered color="magenta">变更为</a-tag>由
                </a-space>
              </div>
              <a-tag
                v-for="v in item.manageName"
                :key="v"
                bordered
                color="orangered"
                >{{ v }}</a-tag
              >{{ item.manageType }}
            </a-space>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <icon-check-circle size="20px" />
            </template>
            当前<a-space>
              由<a-tag
                v-for="v in formData.principalNameList"
                :key="v"
                bordered
                color="orangered"
                >{{ v }}</a-tag
              >{{
                formData.responsibleType === '单人负责'
                  ? '独立负责'
                  : '多人负责'
              }}
            </a-space></a-timeline-item
          >
          <a-timeline-item :label="dateFormat(new Date())">
            <template #dot>
              <icon-sun-fill size="20px" />
            </template>
            至今</a-timeline-item
          >
        </a-timeline>
      </a-card>
    </a-space>
    <a-modal
      v-model:visible="visible"
      title="Modal Form"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form :model="sectionForm">
        <a-form-item field="name" label="Name">
          <a-input />
        </a-form-item>
        <a-form-item field="post" label="Post">
          <a-select>
            <a-option value="post1">Post1</a-option>
            <a-option value="post2">Post2</a-option>
            <a-option value="post3">Post3</a-option>
            <a-option value="post4">Post4</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getOne, changeLog } from '@/api/organization';
  import { Message } from '@arco-design/web-vue';
  import { dateFormat } from '@/utils/date';

  const route = useRoute();
  const router = useRouter();
  const { id } = route.query;
  const visible = ref(false);

  const back = () => {
    router.push({ path: '/organization/manage' });
  };

  const formData = ref({
    organizationName: '',
    organizationAlias: '',
    responsibleType: '',
    type: '',
    principalNameList: [],
    createTime: '',
    updateTime: '',
    modifier: '',
  });

  const timeline = ref([{ date: '', manageName: [], manageType: '' }]);

  const init = () => {
    getOne(id).then((res) => {
      if (!id) {
        router.back();
      }
      formData.value = res.data;
    });
    changeLog(id).then((res) => {
      timeline.value = res.data;
    });
  };
  init();

  const updateCurrentPrincipal = () => {
    Message.warning('暂时不支持修改机构当前负责人');
    // visible.value = true;
  };

  const sectionForm = ref({});

  const handleCancel = () => {
    sectionForm.value = {};
  };
  const handleBeforeOk = (done: any) => {
    done();
  };
</script>

<style scoped lang="less">
  .content {
    margin: 25px;
  }

  .arco-input-wrapper {
    width: 85%;
  }

  .arco-page-header {
    padding: 0;
  }
</style>
