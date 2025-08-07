import { useMutation } from '@tanstack/react-query';
import CatchError from '../../../../../shared/errors/catchError';
import JobsApi from '../../../../../shared/services/Jobs';
import DeclineOfferDto from '../dto/DeclineOffer.dto';
import SendOfferDto from '../dto/SendOffer.dto';

class JobService extends JobsApi {
  private static instance: JobService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new JobService();
    }

    return this.instance;
  }

}

const jobService = JobService.getInstance();
export default jobService;
