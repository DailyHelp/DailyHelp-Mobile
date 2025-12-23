type GoogleAuthDto = {
  id?: string;
  email?: string;
  familyName?: string;
  givenName?: string;
  idToken?: string;
};

type GoogleAuthResponse = {
  accessToken?: string;
  expiresIn?: number;
  refreshToken?: string;
  pinId?: string;
  uuid?: string;
  user?: UserDTO;
};
