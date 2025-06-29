import { Toast } from 'toastify-react-native';

export default class CatchError extends Error {
  constructor(public err: any, private toast: boolean = false) {
    super(err.message);

    this.message = err.message;
    this.cause = err?.cause || '';
    this.name = err?.name || '';

    if (this.toast) this.handelError();

    Error.captureStackTrace(this, this.constructor);
  }

  message: string;
  cause?: unknown;
  name: string;
  stack?: string | undefined;

  handelError = () => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: this.message,
      visibilityTime: 5000,
      topOffset: 0,
    });
    return this;
  };

  handleLog(message?: string) {
    if (__DEV__) {
      console.error({
        error: this.err,
        message,
        cause: this.cause,
      });
    }
    return this;
  }

  callBack(func: () => void) {
    func();
  }
}
