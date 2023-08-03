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
  list: {
    ranking: number;
    author: string;
    contentCount: number;
    clickCount: number;
  }[];
}

export function queryPopularAuthor() {
  return axios.get<PopularAuthorRes>('/api/popular-author/list');
}

export interface ContentPublishRecord {
  x: string[];
  y: number[];
  itemStyle: { color: string };
}

export function queryContentPublish() {
  return axios.get<ContentPublishRecord[]>('/api/content-publish');
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
