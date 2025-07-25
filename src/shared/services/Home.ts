import {GOOGLE_API_KEY} from '@env';
import ThrowError from '../errors/throwError';
import Endpoints from './Endpoints';
import Http from './Http';
import SavePriceDTO from '../../screens/app/user/home/dto/SavePriceDto';
import SaveHelpersDetailsDTO from '../../screens/app/user/home/dto/SaveHelpersDetailsDto';

export default class HomeApi extends Http {
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
      path: Endpoints.getSavedLocation,
      method: 'GET',
    });

    const data = await this.handleResponse<GetSavedLocationResponse>(res);

    return data?.data;
  }

  protected async saveLocation(body: Partial<SaveLocationDto>) {
    const res = await this.fetchHandler({
      path: Endpoints.saveLocation,
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
            };
          } catch (error) {
            console.error('Error fetching place details:', error);
            return {
              ...prediction,
              coordinates: undefined,
            };
          }
        }),
      );

      return predictionsWithCoords;
    } catch (error: any) {
      console.error('Address search failed:', error);
      throw new Error(`Failed to search addresses: ${error.message}`);
    }
  }

  protected async savePrice(body: SavePriceDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.savePrice,
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }

  protected async saveHelpersDetails(body: SaveHelpersDetailsDTO) {
    const res = await this.fetchHandler({
      path: Endpoints.saveHelpersDetails,
      body,
    });
    const data = await this.handleResponse<any>(res);

    this.success(data?.message);

    return data;
  }
}
