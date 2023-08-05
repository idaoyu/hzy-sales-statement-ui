import axios from 'axios';
import { GeneralChart } from '@/types/global';

export interface ChartDataRecord {
  x: string;
  y: number;
  name: string;
}
export interface DataChainGrowth {
  type: string;
  name: string;
  date: string;
}

export interface DataChainGrowthRes {
  count: number;
  growth: number;
  chartData: {
    xAxis: string[];
    data: { name: string; value: number[] };
  };
}
export function queryDataChainGrowth(data: DataChainGrowth) {
  return axios.post<DataChainGrowthRes>('/api/data-chain-growth', data);
}

export interface PopularAuthorRes {
  name: string;
  price: number;
  rank: number;
  quantityOfShipment: number;
}

export interface HotProductRankListParams {
  name: string;
  type: string;
  date: string;
}

export interface GrossProfitComparison {
  name: string;
  date: string;
}

export function queryPopularAuthor(params: HotProductRankListParams) {
  return axios.get<PopularAuthorRes[]>('/api/report/hot_product_rank_list', {
    params,
  });
}

export interface ContentPublishRecord {
  average: number[];
  current: number[];
  x: string[];
}

export function queryContentPublish(params: GrossProfitComparison) {
  return axios.get<ContentPublishRecord>(
    '/api/report/gross_profit_comparison',
    { params }
  );
}

export function queryContentPeriodAnalysis() {
  return axios.post<GeneralChart>('/api/content-period-analysis');
}

export interface PublicOpinionAnalysis {
  type: string;
  name: string;
  date: string;
}
export interface PublicOpinionAnalysisRes {
  count: number;
  change: number;
  result: ChartDataRecord[];
  name: string;
  unit: string;
  scale: string;
}
export function queryPublicOpinionAnalysis(data: DataChainGrowth) {
  return axios.get<PublicOpinionAnalysisRes>('/api/report/data_analysis', {
    params: data,
  });
}
export interface DataOverviewRes {
  xAxis: string[];
  data: Array<{ name: string; value: number[]; count: number }>;
}

export function queryDataOverview() {
  return axios.post<DataOverviewRes>('/api/data-overview');
}
