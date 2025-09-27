import {SheetDefinition, registerSheet} from 'react-native-actions-sheet';
import AllCategory from '../screens/app/user/home/components/AllCategory';
import Rating from '../screens/app/user/home/components/Rating';
import HomeAddress from '../screens/app/user/home/components/HomeAddress';
import PriceRange from '../screens/app/user/home/components/PriceRange';
import Gallery from '../components/Gallery';
import FaceMatch from '../screens/app/user/jobs/components/FaceMatch';
import CancelJob from '../screens/app/user/jobs/components/CancelJob';
import WorkerSuggestions from '../screens/app/user/jobs/components/WorkerSuggestions';
import RateService from '../screens/app/user/jobs/components/RateService';
import FundedWallet from '../screens/app/more/components/FundWallet';
import AddressOptions from '../screens/app/more/components/AddressOptions';
import CustomSelect from '../components/customInput/customSelectInput/CustomSelect';
import ConfirmDeleteActionSheet from '../screens/app/more/deleteAccount/ConfirmDeleteAccount';
import DeleteAddress from '../screens/app/more/components/DeleteAddress';

registerSheet('AllCategory', AllCategory);
registerSheet('Rating', Rating);
registerSheet('HomeAddress', HomeAddress);
registerSheet('Gallery', Gallery);
registerSheet('PriceRange', PriceRange);
registerSheet('FaceMatch', FaceMatch);
registerSheet('CancelJob', CancelJob);
registerSheet('WorkerSuggestion', WorkerSuggestions);
registerSheet('RateService', RateService);
registerSheet('FundWallet', FundedWallet);
registerSheet('AddressOptions', AddressOptions);
registerSheet('CustomSelect', CustomSelect);
registerSheet('ConfirmDelete', ConfirmDeleteActionSheet);
registerSheet('DeleteAddress', DeleteAddress);

export type ActionSheetLoader = {
  isDefaultLoading?: boolean;
  isDeletingAddress?: boolean;
};

declare module 'react-native-actions-sheet' {
  interface Sheets {
    AllCategory: SheetDefinition<{
      payload: {
        type: 'create' | 'login';
        subTitle?: string;
        selectMultiple?: boolean;
      };
      returnValue: {
        subCategory: string[];
        mainCategory: string[];
      };
    }>;
    Rating: SheetDefinition<{
      returnValue: {
        minRating: string;
      };
    }>;
    FundWallet: SheetDefinition<{
      returnValue: {
        amount: number;
      };
    }>;
    HomeAddress: SheetDefinition<{
      payload: {
        showCurrent?: boolean;
        label?: string;
      };
      returnValue: {
        lat?: number;
        lng?: number;
        address?: string;
        state?: string;
        lga?: string;
        city?: string;
        formatted_address?: string;
      };
    }>;
    PriceRange: SheetDefinition<{
      returnValue: {
        minPrice: number;
        maxPrice: number;
      };
    }>;
    Gallery: SheetDefinition<{}>;
    FaceMatch: SheetDefinition<{}>;
    CancelJob: SheetDefinition<{}>;
    WorkerSuggestion: SheetDefinition<{}>;
    RateService: SheetDefinition<{}>;
    AddressOptions: SheetDefinition<{
      payload: {
        uuid: string;
        onDelete: () => void;
        onSetDefault: () => void;
      };
    }>;
    CustomSelect: SheetDefinition<{
      payload: {
        label?: string;
        data?: {label?: string; value: string}[];
      };
      returnValue: {label?: string; value: string; data?: any};
    }>;
    ConfirmDelete: SheetDefinition<{
      payload: {
        onDelete: (password: string) => void;
      };
    }>;
    DeleteAddress: SheetDefinition<{
      payload: {
        onDelete: () => void;
      };
    }>;
  }
}
