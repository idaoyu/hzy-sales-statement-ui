import axios from 'axios';

export interface NetProfitAnalysisParams {
  name?: string;
  date?: string;
  type?: string;
  sortingField?: string;
  sortingRule?: string;
  pageNo?: number;
  pageSize?: number;
}

export interface TableData {
  name?: string;
  type?: string;
  personInCharge?: Array<string>;
  totalSales?: number;
  grossProfit?: number;
  rateChangeGrossProfit?: number;
  grossProfitGrowth?: boolean;
  grossProfitLastMonth?: number;
  salesGrowth?: boolean;
  rateSalesChange?: number;
  totalSalesLastMonth?: number;
}

export function netProfitAnalysis(params: NetProfitAnalysisParams) {
  return axios.get<any>('/api/report/net_profit_analysis', { params });
}
