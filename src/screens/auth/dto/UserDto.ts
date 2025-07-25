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
  identityVerified?: boolean;
  lastLoggedIn?: string;
  nin?: string;
  bvn?: string;
  deviceToken?: string;
  ninData?: string;
  bvnData?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  userTypes?: string | string[];

  userType() {
    if (Array.isArray(this.userTypes)) return this.userTypes;

    return this.userTypes?.split(',');
  }
}
