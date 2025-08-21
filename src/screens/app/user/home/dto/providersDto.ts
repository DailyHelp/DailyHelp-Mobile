export default class ProvidersDto {
  'uuid': string;
  'firstname': string;
  'lastname': string;
  'avgRating': number;
  'serviceDescription': string;
  'primaryJobRole': string;
  'offerStartingPrice': number;
  'availability': boolean;
  'engaged': boolean;
  'completedJobs': number;
  'tier': string;
  'picture': string;
  'serviceImages': string[] | string;
  'distance': string;
  'status': string;
  'totalRatings': string;
}
