import {PhotoFile} from 'react-native-vision-camera';
import AppStorage from '../AppStorage';
import {UserTypes} from '../Constant';
import {makeAutoObservable} from 'mobx';

class AppStore {
  route?: Route = (AppStorage.find('routes') as Route) || 'authentication';

  user_types?: UserTypes;

  hideSelfieVerificationHeader?: boolean = true;

  selfiePhoto?: Partial<PhotoFile> = {};

  constructor() {
    makeAutoObservable(this);
  }

  setRoute(route: Route) {
    this.route = route;
  }

  setHideSelfieVerificationHeader(value: boolean) {
    this.hideSelfieVerificationHeader = value;
  }

  setSelfiePhoto(selfie: PhotoFile) {
    this.selfiePhoto = selfie;
  }
}

export const appStore = new AppStore();
