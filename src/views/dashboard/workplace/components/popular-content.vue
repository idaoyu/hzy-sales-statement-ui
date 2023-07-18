<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 21px 20px' }"
    >
      <template #title>
        {{ $t('workplace.popularContent') }}
      </template>
      <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template>
      <a-space direction="vertical" :size="10" fill>
        <a-radio-group
          v-model:model-value="type"
          type="button"
          @change="typeChange as any"
        >
          <a-radio value="text">
            {{ $t('workplace.popularContent.text') }}
          </a-radio>
          <a-radio value="image">
            {{ $t('workplace.popularContent.image') }}
          </a-radio>
          <a-radio value="video">
            {{ $t('workplace.popularContent.video') }}
          </a-radio>
        </a-radio-group>
        <a-table
          :data="renderList"
          :pagination="false"
          :bordered="false"
          :scroll="{ x: '100%', y: '264px' }"
        >
          <template #columns>
            <a-table-column title="排名" data-index="key"></a-table-column>
            <a-table-column title="内容标题" data-index="title">
              <template #cell="{ record }">
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 1,
                  }"
                >
                  {{ record.title }}
                </a-typography-paragraph>
              </template>
            </a-table-column>
            <a-table-column title="点击量" data-index="clickNumber">
            </a-table-column>
            <a-table-column
              title="日涨幅"
              data-index="increases"
              :sortable="{
                sortDirections: ['ascend', 'descend'],
              }"
            >
              <template #cell="{ record }">
                <div class="increases-cell">
                  <span>{{ record.increases }}%</span>
                  <icon-caret-up
                    v-if="record.increases !== 0"
                    style="color: #f53f3f; font-size: 8px"
                  />
                </div>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';

  const textList = [
    {
      key: 1,
      clickNumber: '346.3w+',
      title: '经济日报：财政政策要精准提升…',
      increases: 35,
    },
    {
      key: 2,
      clickNumber: '324.2w+',
      title: '双12遇冷，消费者厌倦了电商平…',
      increases: 22,
    },
    {
      key: 3,
      clickNumber: '318.9w+',
      title: '致敬坚守战“疫”一线的社区工作…',
      increases: 9,
    },
    {
      key: 4,
      clickNumber: '257.9w+',
      title: '普高还是职高？家长们陷入选择…',
      increases: 17,
    },
    {
      key: 5,
      clickNumber: '124.2w+',
      title: '人民快评：没想到“浓眉大眼”的…',
      increases: 37,
    },
  ];
  const imageList = [
    {
      key: 1,
      clickNumber: '15.3w+',
      title: '杨涛接替陆慷出任外交部美大司…',
      increases: 15,
    },
    {
      key: 2,
      clickNumber: '12.2w+',
      title: '图集：龙卷风袭击美国多州房屋…',
      increases: 26,
    },
    {
      key: 3,
      clickNumber: '18.9w+',
      title: '52岁大姐贴钱照顾自闭症儿童八…',
      increases: 9,
    },
    {
      key: 4,
      clickNumber: '7.9w+',
      title: '杭州一家三口公园宿营取暖中毒',
      increases: 0,
    },
    {
      key: 5,
      clickNumber: '5.2w+',
      title: '派出所副所长威胁市民？警方调…',
      increases: 4,
    },
  ];
  const videoList = [
    {
      key: 1,
      clickNumber: '367.6w+',
      title: '这是今日10点的南京',
      increases: 5,
    },
    {
      key: 2,
      clickNumber: '352.2w+',
      title: '立陶宛不断挑衅致经济受损民众…',
      increases: 17,
    },
    {
      key: 3,
      clickNumber: '348.9w+',
      title: '韩国艺人刘在石确诊新冠',
      increases: 30,
    },
    {
      key: 4,
      clickNumber: '346.3w+',
      title: '关于北京冬奥会，文在寅表态',
      increases: 12,
    },
    {
      key: 5,
      clickNumber: '271.2w+',
      title: '95后现役军人荣立一等功',
      increases: 2,
    },
  ];

  const type = ref('text');
  const { loading, setLoading } = useLoading();
  const renderList = ref<any[]>();
  const queryPopularList = (params: string) => {
    if (params === 'image') {
      return [...videoList];
    }
    if (params === 'video') {
      return [...imageList];
    }
    return [...textList];
  };
  const fetchData = async (contentType: string) => {
    try {
      setLoading(true);
      const data = queryPopularList(contentType);
      renderList.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const typeChange = (contentType: string) => {
    fetchData(contentType);
  };
  fetchData('text');
</script>

<style scoped lang="less">
  .general-card {
    min-height: 395px;
  }
  :deep(.arco-table-tr) {
    height: 44px;
    .arco-typography {
      margin-bottom: 0;
    }
  }
  .increases-cell {
    display: flex;
    align-items: center;
    span {
      margin-right: 4px;
    }
  }
</style>
