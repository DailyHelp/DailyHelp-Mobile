import {BASE_URL} from '@env';
import {EventRegister} from 'react-native-event-listeners';
import {ERRORS} from '../Constant';

export type ThrowErrorConfig = {
  message: string;
  name?: string;
  cause: string;
};

export default class ThrowError extends Error {
  constructor(config: string | ThrowErrorConfig, cause?: string) {
    super((config as string) || (config as ThrowErrorConfig).message);

    this.message = (config as string) || (config as ThrowErrorConfig).message;
    this.name = (config as ThrowErrorConfig).message || '';
    this.cause = cause || (config as ThrowErrorConfig).cause;
  }

  message: string;
  name: string;
  cause?: string;

  static handleUnAuthentication() {
    EventRegister.emit(ERRORS.UNAUTHENTICATED, true);
    throw new ThrowError({
      cause: ERRORS.UNAUTHENTICATED as string,
      message: ERRORS.UNAUTHENTICATED as string,
    });
  }

  static handleServerResponse(res: void | Response | undefined) {
    if (!res?.ok) {
      console.warn(`${res?.url.replace(BASE_URL, '')} => ${res?.status}`);
    } else {
      console.info(`${res?.url.replace(BASE_URL, '')} => ${res?.status}`);
    }

    if (res?.status! > 500) {
      throw new ThrowError(ERRORS.API_FAILED);
    }
  }
}
