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
    const message = typeof config === 'string' ? config : config.message;
    super(message);

    this.message = message;
    if (typeof config === 'object') {
      this.name = config.name || 'ThrowError';
      this.cause = config.cause;
    } else {
      this.name = 'ThrowError';
      this.cause = cause;
    }
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
