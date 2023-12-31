import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  'menu.statement': '报表处理',
  'menu.product': '商品管理',
  'menu.product.cost': '进价管理',
  'menu.organization': '机构管理',
  'menu.organization.manage': '机构负责人管理',
  'menu.dashboard.grossProfitAnalysis': '数据可视化分析',
  'menu.statement.excle': '上传并生成销售报表',
  'menu.order': '出货单管理',
  'menu.order.list': '出货单明细',
  'menu.product.sellPrice': '分销商出货价管理',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
};
