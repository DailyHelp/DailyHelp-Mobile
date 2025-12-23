import UserDTO from '../../../auth/dto/UserDto';
import JobsDto from '../../user/jobs/dto/job.dto';

export default class DisputesDto {
  'uuid': string;
  'job': JobsDto;
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
  code?: string;
  'resolutionAction'?: string | null;
  'resolutionNote'?: string | null;
  'resolutionRefundAmount'?: number | null;
  'resolutionProviderAmount'?: number | null;
  'resolutionCommissionAmount'?: number | null;
  'resolvedAt'?: string | null;
  'resolvedBy'?: string | null;
}
