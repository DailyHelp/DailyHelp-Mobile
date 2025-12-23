export default class JobTimelineDto {
  uuid?: string;
  event?: string;
  createdAt?: string;
  updatedAt?: string;
  actor?: {
    uuid?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    picture?: null;
    email?: string;
    phone?: string;
    userType?: string;
    userTypes?: string;
  };
}
