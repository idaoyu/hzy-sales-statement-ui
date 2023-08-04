<template>
  <a-card
    class="general-card"
    title="公告栏"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '15px 20px 13px 20px' }"
  >
    <div>
      <div v-for="(item, idx) in list" :key="idx" class="item">
        <a-tag :color="item.type" size="small">{{ item.label }}</a-tag>
        <span class="item-content">
          {{ item.content }}
        </span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  const list = [
    {
      type: '#f53f3f',
      label: 'BUG',
      content: '导出销售表格失败',
    },
    {
      type: '#ff7d00',
      label: '开发中',
      content: '机构分析',
    },
    {
      type: '#7bc616',
      label: '已完成',
      content: '销售数据表格整理功能',
    },
    {
      type: '#7bc616',
      label: '已完成',
      content: '净利润分析功能',
    },
  ];
</script>

<style scoped lang="less">
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 24px;
    margin-bottom: 4px;
    .item-content {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 4px;
      color: var(--color-text-2);
      text-decoration: none;
      font-size: 13px;
      cursor: pointer;
    }
  }
</style>
