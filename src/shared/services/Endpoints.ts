import AppStorage from '../AppStorage';
import utils from '../Utils';

const base = AppStorage.find('userType') ? 'customers' : 'providers';

export default {
  signUp: '/auth/signup',
  login: '/auth/login',
  verifyOtp: '/auth/verify-otp',
  sendOtp: '/auth/send-otp',
  initiateResetPassword: '/auth/initiate-reset-password',
  changePassword: ' /auth/change-password',
  resetPassword: '/auth/reset-password',
  verifyIdentity: `/${base}/verify-identity`,
  listCategories: '/lists/categories',
  saveLocation: `/${base}/save-location`,
  getSavedLocation: `/${base}/locations`,
  setDefaultLocation: (uuid: string) => `/${base}/location/${uuid}/set-default`,
  sendOffer: (uuid: string) => `/${base}/${uuid}/send-offer`,
  updateOffer: (uuid: string) => `/${base}/offer/${uuid}/update`,
  declineOffer: (uuid: string) => `/${base}/offer/${uuid}/decline`,
  cancelOffer: (uuid: string) => `/${base}/offer/${uuid}/cancel`,
  googleSocialAuth: '/auth/google',
  updateFmcToken: '/account/update/fcm-token',
  savePrice: '/${base}/save-prices',
  saveHelpersDetails: `/${base}/save-provider-details`,
  providerDashboard: '/providers/dashboard',
  providerReviews: (uuid: string) => `/${base}/${uuid}/reviews`,
  customer: '/customers',
  provider: '/providers',
  sendMessage: (uuid: string) => `/${base}/conversation/${uuid}/send-message`,
  reportConversation: (uuid: string) => `/${base}/conversation/{uuid}/report`,
  getCustomerConversations: (query: PaginationQuery) =>
    `/${base}/conversations?${utils.flattenQuery(query)}`,
  getDashboard: (query: ProvidersQuery) =>
    `/customers/dashboard?${utils.flattenQuery(query)}`,
  getSimilarProducts: (uuid: string) => `/${base}/${uuid}/similar-providers`,
  customerWallet: `/${base}/wallet`,
  customerDispute: `/${base}/disputes`,
  customerFeedback: `/${base}/feedback`,
  getJob: (query: PaginationQuery) =>
    `/customer/jobs?${utils.flattenQuery(query)}`,
  verifyJobPin: (uuid: string) => `/customer/jobs/${uuid}/verify-pin`,
  jobTimeline: (uuid: string) => `/customer/jobs/${uuid}/timelines`,
  reviews: (uuid: string, query?: PaginationQuery) =>
    `/${base}/${uuid}/reviews?${utils.flattenQuery(query!)}`,
  deleteLocation: (uuid: string) => `/customers/location/${uuid}/delete`,
  wallet: `${base}/wallet`,
};
