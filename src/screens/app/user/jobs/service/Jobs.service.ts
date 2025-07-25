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

  useOffer() {
    const {
      mutateAsync: sendOffer,
      isPending: sendingPending,
      data: sendOfferData,
    } = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: SendOfferDto) => {
        return await this.sendOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const {
      mutateAsync: updateOffer,
      isPending: updatePending,
      data: updateOfferData,
    } = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: SendOfferDto) => {
        return await this.updateOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: declineOffer, isPending: declinePending} = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: DeclineOfferDto) => {
        return await this.declineOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: cancelOffer, isPending: cancelPending} = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: DeclineOfferDto) => {
        return await this.declineOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    return {
      sendOffer,
      sendOfferData,
      sendingPending,
      declineOffer,
      declinePending,
      updateOffer,
      updateOfferData,
      cancelOffer,
      cancelPending,
      updatePending,
    };
  }
}

const jobService = JobService.getInstance();
export default jobService;
