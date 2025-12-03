import UserDTO from '../../../../auth/dto/UserDto';
import JobsDto from '../../jobs/dto/job.dto';

export default class Review {
  uuid?: string;
  job?: JobsDto;
  rating?: number;
  review?: string;
  reviewedBy?: UserDTO;
  reviewedFor?: UserDTO;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
