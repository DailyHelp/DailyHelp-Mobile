import {BASE_URL} from '@env';
import Toast from 'react-native-toast-message';
import ThrowError from '../errors/throwError';
import utils from '../Utils';
import AppStorage from '../AppStorage';
import {customFontSize, fonts} from '../themes/Typography';

type Headers = {
  Authorization: string;
  Accept: 'application/json';
  'Content-Type': 'application/json';
};

type FetchOptions<T> = {
  path: string;
  body?: {[P in keyof T]: any};
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Partial<Headers>;
  type?: string;
  standAlonePath?: boolean;
};

export default class Http {
  constructor() {}

  /**
   * Handles api calls to serve
   * @param param - `path`, `headers`, `method`, `body`, `type`
   * @returns Response
   */
  protected async fetchHandler<T>({
    path,
    headers,
    method = 'POST',
    body,
    type = 'json',
    standAlonePath = false,
  }: FetchOptions<T>) {
    const url = standAlonePath ? path : `${BASE_URL}${path}`;

    headers = {
      Authorization: `Bearer ${AppStorage.find('access_token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    };

    const resp = await fetch(url, {
      body: type === 'json' ? JSON.stringify(body) : (body as any),
      method,
      headers,
    }).catch(Promise.reject);

    return resp;
  }

  protected async imageUpload(image: any, path: string) {
    const url = `${BASE_URL}${path}`;

    const body = new FormData();
    body.append('file', image);

    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${AppStorage.find('access_token')}`,
    };

    const resp = await fetch(url, {
      body,
      method: 'POST',
      headers,
    }).catch(Promise.reject);

    return resp;
  }

  /**
   * Handles response gotten from sever
   * @param res
   * @returns data
   */
  protected async handleResponse<T>(res?: Response | void) {
    // const expires = utils.isDateExpired(AppStorage.getExpiresIn()!)

    const unauthorized = [403, 401];

    ThrowError.handleServerResponse(res);

    if (res) {
      const data: ApiResponse<T> = await res.json();
      console.log(data);
      

      if (unauthorized.includes(res.status)) {
        ThrowError.handleUnAuthentication();
      }

      if (!data.status) throw new ThrowError(data.message);

      return data as ApiResponse<T>;
    }
  }

  protected success = (message?: string) => {
    Toast.show({
      type: 'success',
      autoHide: true,
      text1: 'Success',
      text2: message,
      visibilityTime: 10000,
      text2Style: {
        fontFamily: fonts.GeistRegular,
        fontSize: customFontSize.sm,
      },
    });
  };

  protected error = (message?: string) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
      visibilityTime: 10000,
      text2Style: {
        fontFamily: fonts.GeistRegular,
        fontSize: customFontSize.sm,
      },
    });
  };

  protected info = (message?: string) => {
    Toast.show({
      type: 'info',
      autoHide: true,
      text1: 'Note',
      text2: message,
      visibilityTime: 10000,
      text2Style: {
        fontFamily: fonts.GeistRegular,
        fontSize: customFontSize.sm,
      },
    });
  };
}

export const http = new Http();
