export default {
  signUp: '/auth/signup',
  login: '/auth/login',
  verifyOtp: '/auth/verify-otp',
  sendOtp: '/auth/send-otp',
  initiateResetPassword: '/auth/initiate-reset-password',
  changePassword: ' /auth/change-password',
  resetPassword: '/auth/reset-password',
  verifyIdentity: '/customers/verify-identity',
  listCategories: '/lists/categories',
  saveLocation: '/customers/save-location',
  getSavedLocation: '/customers/locations',
  customerSetDefaultLocation: (uuid: string) =>
    `/customers/location/${uuid}/set-default`,
  sendOffer: (uuid: string) => `/customers/${uuid}/send-offer`,
  updateOffer: (uuid: string) => `/customers/offer/${uuid}/update`,
  declineOffer: (uuid: string) => `/customers/offer/${uuid}/decline`,
  cancelOffer: (uuid: string) => `/customers/offer/${uuid}/cancel`,
  googleSocialAuth: '/auth/google',
  updateFmcToken: '/account/update/fcm-token',
  getReviews: (uuid: string) => `/customers/${uuid}/reviews`,
  savePrice: '/customers/save-prices',
  saveHelpersDetails: '/customers/save-provider-details',
  setDefaultLocation: (uuid: string) =>
    `/customers/${uuid}/set-default-location`,
  providerDashboard: '/providers/dashboard',
  providerReviews: (uuid: string) => `/customers/${uuid}/reviews`,
  customer: '/customers',
  provider: '/providers',
  sendCustomerMessage: (uuid: string) =>
    `/customers/conversation/${uuid}/send-message`,
  customerReportConversation: (uuid: string) =>
    `/customers/conversation/{uuid}/report`,
  getCustomerConversations: (query: PaginationQuery) =>
    `/customers/conversations?${new URLSearchParams(query as any)}`,
  customersDashboard: (query: ProvidersQuery) =>
    `/customers/dashboard?${new URLSearchParams(query as any)}`,
  getSimilarProducts: (uuid: string) => `/customers/${uuid}/similar-providers`,
  customerWallet: '/customers/wallet',
  customerDispute: '/customers/disputes',
  customerFeedback: '/customers/feedback',
};
