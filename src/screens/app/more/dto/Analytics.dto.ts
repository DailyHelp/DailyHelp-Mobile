export default class AnalyticsDto {
  'range': {
    start: string;
    end: string;
  };
  'revenue': {
    rings: {
      earnings: number;
      tips: number;
      commission: number;
    };
    breakdown: {
      jobPayment: number;
      tips: number;
      income: number;
      commissionRate: 5;
      deductions: number;
      yourEarnings: number;
    };
  };
  'jobs': {
    total: number;
    completed: number;
    canceled: number;
    disputed: number;
  };
  'offers': {
    total: number;
    accepted: number;
    acceptanceRate: number;
    breakdown: {
      youAccepted: {
        count: number;
        percent: number;
      };
      youDeclined: {
        count: number;
        percent: number;
      };
      youCancelled: {
        count: number;
        percent: number;
      };
      clientDeclined: {
        count: number;
        percent: number;
      };
      clientCancelled: {
        count: number;
        percent: number;
      };
    };
  };
}
