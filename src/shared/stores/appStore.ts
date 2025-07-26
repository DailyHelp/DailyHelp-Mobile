import {PhotoFile} from 'react-native-vision-camera';
import AppStorage from '../AppStorage';
import {UserTypes} from '../Constant';
import {makeAutoObservable} from 'mobx';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';

class AppStore {
  route?: Route = (AppStorage.find('routes') as Route) || 'authentication';

  currentLocation: {
    address?: string;
    lng?: number;
    lat?: number;
  } = {};

  isAuthenticated = AppStorage.find('isAuthenticated') || false;

  user_types = (AppStorage.find('userType') as UserTypes) || UserTypes.CUSTOMER;

  hideSelfieVerificationHeader: boolean = true;

  selfiePhoto?: Partial<PhotoFile> = {};

  selectedGalleryImages: string[] = [];

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

  setSelectedGalleryImages(item: PhotoIdentifier) {
    this.selectedGalleryImages.push(item.node.image.uri);
  }

  setUnselectGalleryImages(uri: string) {
    this.selectedGalleryImages = this.selectedGalleryImages.filter(
      i => i !== uri,
    );
  }

  toggleGalleryImageSelection(uri: string) {
    if (this.selectedGalleryImages.includes(uri)) {
      this.selectedGalleryImages = this.selectedGalleryImages.filter(
        item => item !== uri,
      );
    } else {
      this.selectedGalleryImages = [...this.selectedGalleryImages, uri];
    }
  }

  clearSelectedGalleryImages() {
    this.selectedGalleryImages = [];
  }

  setCurrentLocation(location?: {
    address?: string;
    lng?: number;
    lat?: number;
  }) {
    if (!location) {
      this.currentLocation = {};
      return;
    }
    this.currentLocation = {...this.currentLocation, ...location};
  }

  setIsAuthenticated(dto: boolean, userType = this.user_types) {
    this.isAuthenticated = dto;
    AppStorage.save('isAuthenticated', dto);

    if (dto) {
      this.user_types = userType;
      AppStorage.save('userType', userType);
    }
  }
}

export const appStore = new AppStore();
