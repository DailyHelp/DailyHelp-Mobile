type GoogleAuthDto = {
  id?: string;
  email?: string;
  familyName?: string;
  givenName?: string;
  idToken?: string;
  type?: import('../../../shared/Constant').UserTypes;
};

type GoogleAuthResponse = {
  accessToken?: string;
  expiresIn?: number;
  refreshToken?: string;
  pinId?: string;
  uuid?: string;
  user?: UserDTO;
};
