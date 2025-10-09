import UserDTO from '../../../../auth/dto/UserDto';

export default class JobsDto {
  'uuid': string;
  'serviceProvider': UserDTO;
  'serviceRequestor': UserDTO;
  'requestId': string;
  'price': number;
  'status': string;
  'startDate': string;
  'endDate': string;
  'description': string;
  'pictures': string;
  'code': string;
  'dispute': {
    uuid: string;
    job: string;
    category: string;
    description: string;
    pictures: string;
    status: string;
    submittedBy: UserDTO;
    submittedFor: UserDTO;
    userType: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  'review': {
    uuid: string;
    job: string;
    rating: number;
    review: string;
    reviewedBy: UserDTO;
    reviewedFor: UserDTO;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  'payment': {
    uuid: string;
    transactionId: string;
    status: string;
    amount: number;
    channel: string;
    metadata: string;
    type: string;
    currency: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  };
  'acceptedAt': string;
  'cancelledAt': string;
  'cancellationReason': string;
  'cancellationCategory': string;
  providerPrimaryJobRole?: string;
  providerFirstname?: string;
  providerLastname?: string;
  providerPicture?: string;
  'createdAt': string;
  'updatedAt': string;
  'deletedAt': string;
}
