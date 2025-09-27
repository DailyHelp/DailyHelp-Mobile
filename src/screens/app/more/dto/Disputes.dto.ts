import UserDTO from '../../../auth/dto/UserDto';

export default class DisputesDto {
  'uuid': string;
  'job': string;
  'category': string;
  'description': string;
  'pictures': string;
  'status': string;
  'submittedBy': UserDTO;
  'submittedFor': UserDTO;
  'userType': string;
  'createdAt': string;
  'updatedAt': string;
  'deletedAt': string;
}
