export interface BannerDTO {
  saleroom?: number;
  netProfit?: number;
  salesChange?: number;
  activeCustomers?: number;
}

export interface Dashboard {
  month?: string;
  bannerDTO?: BannerDTO;
}
