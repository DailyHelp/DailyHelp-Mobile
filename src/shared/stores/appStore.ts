import {PhotoFile} from 'react-native-vision-camera';
import AppStorage from '../AppStorage';
import {UserTypes} from '../Constant';
import {makeAutoObservable} from 'mobx';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import {ActionSheetLoader} from '../ActionSheets';
import {SaveLocationDto} from '../../screens/app/user/home/dto/savedLocationDto';

class AppStore {
  route?: Route = (AppStorage.find('routes') as Route) || 'authentication';

  currentLocation: SaveLocationDto = new SaveLocationDto();

  isIdentityVerified?: boolean = AppStorage.find(
    'isIdentityVerified',
  ) as boolean;

  isAuthenticated = AppStorage.find('isAuthenticated') || false;

  user_types = (AppStorage.find('userType') as UserTypes) || UserTypes.CUSTOMER;

  hideSelfieVerificationHeader: boolean = true;

  selfiePhoto?: Partial<PhotoFile> = {};

  selectedGalleryImages: string[] = [];

  offerDto?: {
    amount?: string;
    description?: string;
    attachments?: string;
  };

  tabBadges: {[key: string]: number} = {};

  actionSheetLoading!: ActionSheetLoader;

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

  setSelectedGalleryImages(item: PhotoIdentifier | string) {
    if (typeof item === 'string') {
      this.selectedGalleryImages.push(item);
    } else this.selectedGalleryImages.push(item.node.image.uri);
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

  setCurrentLocation(location?: SaveLocationDto) {
    if (!location) {
      this.currentLocation = new SaveLocationDto();
      return;
    }
    this.currentLocation = {...(this.currentLocation || new SaveLocationDto()), ...location};
  }

  setIsAuthenticated(dto: boolean, userType = this.user_types) {
    this.isAuthenticated = dto;
    AppStorage.save('isAuthenticated', dto);

    if (dto) {
      this.user_types = userType;
      AppStorage.save('userType', userType);
    } else {
      AppStorage.removeAll()
    }
  }

  setActionSheetLoaders(dto: ActionSheetLoader) {
    this.actionSheetLoading = {...this.actionSheetLoading, ...dto};
  }

  setIsIdentityVerified(dto: boolean) {
    AppStorage.save('isIdentityVerified', dto);
    this.isIdentityVerified = dto;
  }

  setOffer(dto: {amount?: string; description?: string; attachments?: string}) {
    this.offerDto = {...this.offerDto, ...dto};
  }

  clearOffer() {
    this.offerDto = {};
    this.selectedGalleryImages = [];
  }

  setTabBadge(tabName: string, count: number) {
    this.tabBadges[tabName] = count;
  }

  incrementTabBadge(tabName: string) {
    this.tabBadges[tabName] = (this.tabBadges[tabName] || 0) + 1;
  }

  decrementTabBadge(tabName: string) {
    if (this.tabBadges[tabName] && this.tabBadges[tabName] > 0) {
      this.tabBadges[tabName] = this.tabBadges[tabName] - 1;
    }
  }

  clearTabBadge(tabName: string) {
    this.tabBadges[tabName] = 0;
  }

  clearAllTabBadges() {
    this.tabBadges = {};
  }
}

export const appStore = new AppStore();
