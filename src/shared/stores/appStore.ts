import {PhotoFile} from 'react-native-vision-camera';
import AppStorage from '../AppStorage';
import {UserTypes} from '../Constant';
import {makeAutoObservable} from 'mobx';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';

class AppStore {
  route?: Route = (AppStorage.find('routes') as Route) || 'authentication';

  isAuthenticated = AppStorage.find('isAuthenticated') || false;

  user_types?: UserTypes;

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

  setIsAuthenticated(dto: boolean) {
    this.isAuthenticated = dto;
    AppStorage.save('isAuthenticated', dto);
  }
}

export const appStore = new AppStore();
