import ProvidersDto from './providersDto';

interface CustomerDashboardDto {
  topRatedProviders: ProvidersDto[];
  recommendedProviders: ProvidersDto[];
  allProviders: {
    data: ProvidersDto[];
    pagination: {
      total: number;
      limit: number;
      page: number;
      size: number;
      pages: number;
      offset: number;
    };
  };
}
