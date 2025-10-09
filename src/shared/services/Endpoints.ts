import AppStorage from '../AppStorage';
import {ReasonType, UserTypes} from '../Constant';
import utils from '../Utils';

const base = () =>( AppStorage.find('userType') as UserTypes).toLowerCase();
const bases = () => base().toLowerCase() + 's';

export default {
  signUp: '/auth/signup',
  login: '/auth/login',
  verifyOtp: '/auth/verify-otp',
  sendOtp: '/auth/send-otp',
  initiateResetPassword: '/auth/initiate-reset-password',
  changePassword: '/auth/change-password',
  resetPassword: '/auth/reset-password',
  verifyIdentity: () => `/${bases()}/verify-identity`,
  listCategories: '/lists/categories',
  saveLocation: () => `/${bases()}/save-location`,
  getSavedLocation: () => `/${bases()}/locations`,
  setDefaultLocation: (uuid: string) =>
    `/${bases()}/location/${uuid}/set-default`,
  sendOffer: (uuid: string) => `/${bases()}/${uuid}/send-offer`,
  updateOffer: (uuid: string) => `/${bases()}/offer/${uuid}/update`,
  declineOffer: (uuid: string) => `/${bases()}/offer/${uuid}/decline`,
  cancelOffer: (uuid: string) => `/${bases()}/offer/${uuid}/cancel`,
  acceptOffer: (uuid: string) => `/${bases()}/offer/${uuid}/accept`,
  counterOffer: (uuid: string) => `/${bases()}/offer/${uuid}/counter`,
  googleSocialAuth: '/auth/google',
  updateFmcToken: '/account/update/fcm-token',
  savePrice: () => `/${bases()}/save-prices`,
  saveHelpersDetails: () => `/${bases()}/save-provider-details`,
  providerDashboard: '/providers/dashboard',
  providerReviews: (uuid: string) => `/${bases()}/${uuid}/reviews`,
  user: () => `/${bases()}`,
  sendMessage: (uuid: string) =>
    `/${bases()}/conversation/${uuid}/send-message`,
  reportConversation: (uuid: string) =>
    `/${bases()}/conversation/${uuid}/report`,
  getConversations: (query: PaginationQuery) =>
    `/${bases()}/conversations?${utils.flattenQuery(query)}`,
  getSingleConversation: (uuid: string, query: PaginationQuery) =>
    `/${bases()}/conversations/${uuid}/messages?${utils.flattenQuery(query)}`,
  getDashboard: (query?: PaginationQuery<ProvidersQuery>) =>
    `/${bases()}/dashboard?${utils.flattenQuery(query)}`,
  getSimilarProducts: (uuid: string) => `/${bases()}/${uuid}/similar-providers`,
  disputes: (query: PaginationQuery) =>
    `/${bases()}/disputes?${utils.flattenQuery(query!)}`,
  feedback: () => `/${bases()}/feedback`,
  getJob: (query: PaginationQuery) =>
    `/${base()}/jobs?${utils.flattenQuery(query)}`,
  verifyJobPin: (uuid: string) => `/${base()}/jobs/${uuid}/verify-pin`,
  jobTimeline: (uuid: string) => `/${base()}/jobs/${uuid}/timelines`,
  cancelJob: (uuid: string) => `/${base()}/jobs/${uuid}/cancel`,
  startJob: (uuid: string) => `/${base()}/jobs/${uuid}/start`,
  endJob: (uuid: string) => `/${base()}/jobs/${uuid}/end`,
  disputeJob: (uuid: string) => `/${base()}/jobs/${uuid}/dispute`,
  rateProvider: (uuid: string) =>
    `/${base()}/jobs/${uuid}/rate-service-provider`,
  reviews: (uuid: string, query?: PaginationQuery) =>
    `/${bases()}/${uuid}/reviews?${utils.flattenQuery(query!)}`,
  deleteLocation: (uuid: string) => `/${bases()}/location/${uuid}/delete`,
  wallet: () => `${bases()}/wallet`,
  reasons: (type: ReasonType) => `/lists/reason-category?type=${type}`,
  deletionRequest: (uuid: string) =>
    `/${bases()}/deletion-request/${uuid}/confirm-deletion`,
  switchUser: () => `/${bases()}/switch-user-type`,
  initializePayment: () => `/${bases()}/initialize-paystack-payment`,
  walletTransactions: (query: PaginationQuery) =>
    `/wallets/transactions?${utils.flattenQuery(query)}`,
};
