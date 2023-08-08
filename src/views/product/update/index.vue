<template>
  <div class="content">
    <a-space direction="vertical" fill :size="15">
      <a-page-header title="返回" subtitle="商品的一生" @back="back">
      </a-page-header>
      <a-row>
        <a-card title="商品信息" style="width: 100%" hoverable>
          <template #extra>
            <a-link
              v-permission="['organization:update']"
              @click="updateCurrentPrincipal"
              >修改当前商品进价</a-link
            >
          </template>
          <a-form :model="formData">
            <a-row justify="center">
              <a-col :span="8">
                <a-form-item field="productName" label="商品名字">
                  <a-input
                    v-model="formData.productName"
                    style="width: 271.84px; margin: 0 24px 24px 0"
                    disabled
                  /> </a-form-item
              ></a-col>
              <a-col :span="8">
                <a-form-item field="productAliasName" label="商品标签">
                  <a-input
                    v-model="formData.productAliasName"
                    style="width: 271.84px; margin: 0 24px 24px 0"
                    disabled
                  /> </a-form-item
              ></a-col>
              <a-col :span="8">
                <a-form-item field="costPrice" label="商品进价">
                  <a-input
                    v-model="formData.costPrice"
                    style="width: 271.84px; margin: 0 24px 24px 0"
                    disabled
                  >
                    <template #append> 元 </template></a-input
                  >
                </a-form-item></a-col
              >
            </a-row>
            <a-row justify="center">
              <a-col :span="8">
                <a-form-item field="modifier" label="最后修改人">
                  <a-input
                    v-model="formData.modifier"
                    style="width: 271.84px; margin: 0 24px 24px 0"
                    disabled
                  /> </a-form-item
              ></a-col>
              <a-col :span="8">
                <a-form-item field="createTime" label="创建时间">
                  <a-date-picker
                    v-model="formData.createTime"
                    style="width: 271.84px; margin: 0 24px 24px 0"
                    show-time
                    readonly
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="updateTime" label="修改时间">
                  <a-date-picker
                    v-model="formData.updateTime"
                    style="width: 271.84px; margin: 0 24px 24px 0"
                    show-time
                    readonly
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </a-form-item>
              </a-col>
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
            创建商品</a-timeline-item
          >
          <a-timeline-item
            v-for="(item, index) in timeline"
            :key="item.date"
            :label="item.date"
          >
            <a-space>
              <div v-if="index === 0">
                <a-space>
                  <a-tag bordered color="green">创建时</a-tag>进价为
                </a-space>
              </div>
              <div v-else>
                <a-space>
                  <a-tag bordered color="magenta">变更为</a-tag>进价为
                </a-space>
              </div>
              <a-tag bordered color="orangered">{{ item.costPrice }}</a-tag
              >元
            </a-space>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <icon-check-circle size="20px" />
            </template>
            当前<a-space>
              进价为<a-tag bordered color="orangered">{{
                formData.costPrice
              }}</a-tag
              >元
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
      title="修改商品进价"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form :model="sectionForm">
        <a-form-item field="costPrice" label="商品进价">
          <a-input
            v-model="sectionForm.cost"
            style="width: 220px; margin: 0 24px 24px 0"
            placeholder="请输入商品进价"
            allow-clear
          >
            <template #append> 元 </template>
          </a-input>
        </a-form-item>
        <a-form-item field="date" label="生效时间">
          <a-date-picker
            v-model="sectionForm.effectiveTime"
            style="width: 220px; margin: 0 24px 24px 0"
            show-time
            :time-picker-props="{ defaultValue: '09:09:06' }"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getOne, changeLog, updateProduct } from '@/api/product';
  import { dateFormat } from '@/utils/date';
  import { Message } from '@arco-design/web-vue';

  const route = useRoute();
  const router = useRouter();
  const { id } = route.query;
  const visible = ref(false);

  const back = () => {
    router.push({ path: '/product/cost' });
  };

  const formData = ref({
    costPrice: '0',
    modifier: '',
    productAliasName: '',
    productName: '',
    updateTime: '',
    createTime: '',
  });

  const timeline = ref([{ date: '', costPrice: 0 }]);

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

  const sectionForm = ref<any>({});

  const updateCurrentPrincipal = () => {
    sectionForm.value = {
      cost: formData.value.costPrice,
      effectiveTime: '',
    };
    visible.value = true;
  };

  const handleCancel = () => {
    sectionForm.value = {};
  };
  const handleBeforeOk = (done: any) => {
    try {
      updateProduct(id, sectionForm.value).then((resp) => {
        Message.success(resp.data);
        init();
      });
    } catch (error) {
      // ...
    } finally {
      done();
    }
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
