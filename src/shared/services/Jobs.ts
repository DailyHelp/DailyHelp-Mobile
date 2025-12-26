import ProvidersDto from '../../screens/app/user/home/dto/providersDto';
import Review from '../../screens/app/user/home/dto/reviews.dto';
import DeclineOfferDto from '../../screens/app/user/jobs/dto/DeclineOffer.dto';
import Jobs from '../../screens/app/user/jobs/dto/job.dto';
import JobTimelineDto from '../../screens/app/user/jobs/dto/JobTimeline.dto';
import Endpoints from './Endpoints';
import Http from './Http';

export default class JobsApi extends Http {
  protected async getJobs(query: PaginationQuery) {
    const res = await this.fetchHandler({
      path: Endpoints.getJob(query),
      method: 'GET',
    });
    const data = await this.handleResponse<Jobs[], true>(res);

    return data;
  }

  protected async getJobDetails(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.jobDetails(uuid),
      method: 'GET',
    });
    const data = await this.handleResponse<{
      job: Jobs;
      timelines: JobTimelineDto[];
      review: Review;
      conversation: Conversation;
    }>(res);

    return data;
  }

  protected async verifyJobPin(uuid: string, pin: string) {
    const res = await this.fetchHandler({
      path: Endpoints.verifyJobPin(uuid),
      method: 'POST',
      body: {pin},
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async customerJobTimeline(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.jobTimeline(uuid),
      method: 'GET',
    });
    const data = await this.handleResponse<JobTimelineDto[]>(res);

    return data;
  }

  protected async alternateProviders(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.alternateProviders(uuid),
      method: 'GET',
    });
    const data = await this.handleResponse<ProvidersDto[]>(res);

    return data;
  }

  protected async getSimilarProvider(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.getSimilarProducts(uuid),
      method: 'GET',
    });
    const data = await this.handleResponse<SimilarJobDto[]>(res);

    return data;
  }

  protected async cancelJob(dto: DeclineOfferDto) {
    const res = await this.fetchHandler({
      path: Endpoints.cancelJob(dto.uuid!),
      method: 'POST',
      body: dto,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async startJob(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.startJob(uuid!),
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async endJob(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.endJob(uuid!),
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async disputeJob(uuid: string, body: any) {
    const res = await this.fetchHandler({
      path: Endpoints.disputeJob(uuid),
      method: 'POST',
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async rateProvider(uuid: string, body: any) {
    const res = await this.fetchHandler({
      path: Endpoints.rateProvider(uuid),
      method: 'POST',
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async identifyVerification(uuid: string, verified: boolean) {
    const res = await this.fetchHandler({
      path: Endpoints.identityVerification(uuid),
      method: 'PATCH',
      body: {verified},
    });
    const data = await this.handleResponse<{
      providerIdentityVerified: boolean;
    }>(res);

    this.success(data?.message);

    return data;
  }
}
