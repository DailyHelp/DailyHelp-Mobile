type GoogleAuthDto = {
  id: string;
  email: string;
  familyName: string;
  givenName: string;
};

type GoogleAuthResponse = {
  user: {
    id: number;
    firstname: string;
    lastname: string;
    phone_number: string;
    email: string;
    status: string;
    created_at: string;
  };
  token: string;
  expires_in: string;
};