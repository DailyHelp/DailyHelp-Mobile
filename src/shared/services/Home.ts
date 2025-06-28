
  import {GOOGLE_API_KEY} from '@env'
  import ThrowError from '../errors/throwError';
  import Endpoints from './Endpoints';
  import Http from './Http';


  export default class HomeApi extends Http {
    protected async getAllCategories() {
        const res = await this.fetchHandler({
          path: Endpoints.listCategories,
          method: 'GET',
        });
    
        const data = await this.handleResponse<{ categories: CategoryDto[] }>(res);
        if (!data?.status) throw new ThrowError(data?.message!);
    
        return data;
      }
      protected async getSavedLocation() {
        const res = await this.fetchHandler({
          path: Endpoints.getSavedLocation,
          method: 'GET',
        });
    
        const data = await this.handleResponse<GetSavedLocationResponse>(res);
        if (!data?.status) throw new ThrowError(data?.message!);
    
        return data?.data;
      }

      protected async saveLocation(
        body: SaveLocationDto,
      ) {
        const res = await this.fetchHandler({
          path: Endpoints.saveLocation,
          body,
        });
    
        const data = await this.handleResponse(res);
    
        if (!data?.status) throw new ThrowError(data?.message!);
    
        this.success(data.message);
    
        return data;
      }
    
  }