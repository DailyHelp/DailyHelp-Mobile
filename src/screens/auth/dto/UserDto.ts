export default class UserDTO {
  uuid?: string;
  firstname?: string;
  middlename?: string;
  dob?: string;
  gender?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  password?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  picture?: string;
  identityVerified?: boolean;
  lastLoggedIn?: string;
  nin?: string;
  bvn?: string;
  deviceToken?: string;
  ninData?: string;
  bvnData?: string;
  defaultLocation?: {
    uuid: string;
    address: string;
    state: string;
    lga: string;
    description: string;
    lat: number;
    lng: number;
    verified: boolean;
    user: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  providerAddress?: {
    uuid: string;
    address: string;
    state: string;
    lga: string;
    description: string;
    lat: number;
    lng: number;
    verified: boolean;
    user: string;
    userType: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  primaryJobRole?: {
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  serviceDescription?: string;
  serviceImages?: string;
  offerStartingPrice?: number;
  minimumOfferPrice?: number;
  availability?: boolean;
  engaged?: boolean;
  tier?: string;
  nextTier?: string;
  avgRating?: number;
  completedJobs?: number;
  ratedCompletedJobs?: number;
  progressToNextTier?: string;
  providerOnboarding: any;
  utilityBill?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  userTypes?: string | string[];

  userType() {
    if (Array.isArray(this.userTypes)) return this.userTypes;

    return this.userTypes?.split(',');
  }
}
