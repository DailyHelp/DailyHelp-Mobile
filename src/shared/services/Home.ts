import {GOOGLE_API_KEY} from '@env';
import {CustomerDashboardDto} from '../../screens/app/user/home/dto/customer-dashboard.dto';
import Review from '../../screens/app/user/home/dto/reviews.dto';
import {SaveLocationDto} from '../../screens/app/user/home/dto/savedLocationDto';
import SaveHelpersDetailsDTO from '../../screens/app/user/home/dto/SaveHelpersDetailsDto';
import SavePriceDTO from '../../screens/app/user/home/dto/SavePriceDto';
import DeclineOfferDto from '../../screens/app/user/jobs/dto/DeclineOffer.dto';
import SendOfferDto from '../../screens/app/user/jobs/dto/SendOffer.dto';
import UserDTO from '../../screens/auth/dto/UserDto';
import AppStorage from '../AppStorage';
import {ReasonType} from '../Constant';
import ThrowError from '../errors/throwError';
import Endpoints from './Endpoints';
import Http from './Http';

export default class HomeApi extends Http {
  userType = () => AppStorage.find('userType');

  protected async getAllCategories() {
    const res = await this.fetchHandler({
      path: Endpoints.listCategories,
      method: 'GET',
    });

    const data = await this.handleResponse<{categories: CategoryDto[]}>(res);

    return data;
  }
  protected async getSavedLocation() {
    const res = await this.fetchHandler({
      path: Endpoints.getSavedLocation(),
      method: 'GET',
    });

    const data = await this.handleResponse<GetSavedLocationResponse>(res);

    return data?.data;
  }

  protected async saveLocation(body: Partial<SaveLocationDto>) {
    const res = await this.fetchHandler({
      path: Endpoints.saveLocation(),
      body,
    });

    const data = await this.handleResponse(res);

    this.success(data?.message);

    return data;
  }

  async getAddressFromLatLng(
    latitude: number,
    longitude: number,
  ): Promise<GoogleLocationResponse> {
    const res = await this.fetchHandler({
      path: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
      method: 'GET',
      standAlonePath: true,
    });

    const data = (await this.handleResponse(res)) as any;

    if (data?.error_message) throw new ThrowError(data.error_message);

    return data?.results[0];
  }

  async getAddressFromSearch(
    addressQuery: string,
    region: string = 'ng',
    includeCoordinates: boolean = false,
  ): Promise<AddressPrediction[]> {
    if (!addressQuery?.trim()) {
      throw new Error('Address query cannot be empty');
    }

    // Encode and clean the query
    const encodedQuery = encodeURIComponent(
      addressQuery.trim().replace(/\s+/g, ' '),
    );

    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedQuery}&types=address&key=${GOOGLE_API_KEY}`;

    if (region) {
      url += `&components=country:${region}`;
    }

    try {
      const res = await this.fetchHandler({
        path: url,
        method: 'GET',
        standAlonePath: true,
      });

      const data: GooglAutoCompleteResponse = (await this.handleResponse(
        res,
      )) as any;

      if (data?.status !== 'OK') throw new Error('Autocomplete request failed');

      if (!includeCoordinates || !data.predictions?.length) {
        return data.predictions.map(prediction => ({
          description: prediction.description,
          place_id: prediction.place_id,
          state: prediction.terms[2].value,
        }));
      }

      const predictionsWithCoords = await Promise.all(
        data.predictions.map(async prediction => {
          try {
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=geometry&key=${GOOGLE_API_KEY}`;

            const detailsRes = await this.fetchHandler({
              path: detailsUrl,
              method: 'GET',
              standAlonePath: true,
            });

            const detailsData: PlaceDetailsResponse =
              (await this.handleResponse(detailsRes)) as any;

            if (detailsData?.status !== 'OK') {
              console.warn(
                'Failed to get details for place:',
                prediction.place_id,
              );
              return {
                ...prediction,
                coordinates: undefined,
              };
            }

            return {
              ...prediction,
              coordinates: detailsData.result.geometry.location,
              state: prediction.terms[2].value,
            };
          } catch (error) {
            console.error('Error fetching place details:', error);
            return {
              ...prediction,
              coordinates: undefined,
              state: undefined,
            };
          }
        }),
      );

      return predictionsWithCoords.map(d => ({
        description: d.description,
        place_id: d.place_id,
        coordinates: d.coordinates,
        state: d.terms[2].value,
      }));
    } catch (error: any) {
      console.error('Address search failed:', error);
      throw new Error(`Failed to search addresses: ${error.message}`);
    }
  }

  protected async savePrice(body: SavePriceDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.savePrice(),
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async saveHelpersDetails(body: SaveHelpersDetailsDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.saveHelpersDetails(),
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async getCustomerDashboard(query: PaginationQuery<ProvidersQuery>) {
    const res = await this.fetchHandler({
      path: Endpoints.getDashboard(query),
      method: 'GET',
    });
    const data = await this.handleResponse<CustomerDashboardDto>(res);

    return data;
  }

  protected async getProviderDashboard() {
    const res = await this.fetchHandler({
      path: Endpoints.getDashboard(),
      method: 'GET',
    });
    const data = await this.handleResponse<{
      acceptanceRate?: number;
      acceptedOffers?: number;
      jobGoal?: number;
      todaysEarnings?: number;
      totalDecisions?: number;
      ratingGoal?: number;
      user: UserDTO;
    }>(res);

    return data;
  }

  protected async getUser() {
    const res = await this.fetchHandler({
      path: Endpoints.user(),
      method: 'GET',
    });
    const data = await this.handleResponse<UserDTO>(res);

    return data;
  }

  protected async sendOffer(uuid: string, body: SendOfferDto) {
    delete body.uuid;

    const res = await this.fetchHandler({
      path: Endpoints.sendOffer(uuid),
      body,
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async updateOffer(uuid: string, body: SendOfferDto) {
    delete body.uuid;

    const res = await this.fetchHandler({
      path: Endpoints.updateOffer(uuid),
      body,
      method: 'PATCH',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async declineOffer(uuid: string, body: DeclineOfferDto) {
    const res = await this.fetchHandler({
      path: Endpoints.declineOffer(uuid),
      body,
      method: 'POST',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async cancelOffer(uuid: string, body: DeclineOfferDto) {
    const res = await this.fetchHandler({
      path: Endpoints.cancelOffer(uuid),
      body,
      method: 'PATCH',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async getSimilarProviders(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.getSimilarProducts(uuid),
      method: 'GET',
    });
    const data = await this.handleResponse<any>(res);

    return data;
  }

  protected async getReviews(query?: PaginationQuery) {
    const res = await this.fetchHandler({
      path: Endpoints.reviews(query),
      method: 'GET',
    });
    const data = await this.handleResponse<Review[], true>(res);

    return data;
  }

  protected async setDefaultLocation(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.setDefaultLocation(uuid),
      method: 'PATCH',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async deleteLocation(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.deleteLocation(uuid),
      method: 'DELETE',
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async getReason(type: ReasonType) {
    const res = await this.fetchHandler({
      path: Endpoints.reasons(type),
      method: 'GET',
    });
    const data = await this.handleResponse<Reason[]>(res);

    return data;
  }

  protected async customerProviderReview(uuid: string) {
    const res = await this.fetchHandler({
      path: Endpoints.customerProviderReview(uuid),
      method: 'GET',
    });
    const data = await this.handleResponse<{
      averageRating: number;
      totalReviews: number;
      breakdown: {
        fiveStar: number;
        fourStar: number;
        threeStar: number;
        twoStar: number;
        oneStar: number;
      };
    }>(res);

    return data;
  }

  protected async availability(availability: boolean) {
    const res = await this.fetchHandler({
      path: Endpoints.availability(),
      method: 'PATCH',
      body: {availability},
    });

    const data = await this.handleResponse<{availability: true}>(res);
    return data;
  }
}
