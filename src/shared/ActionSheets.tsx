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
import FullChatActivated from '../screens/app/chat/components/FullChatActivated';
import ChatDisclaimer from '../screens/app/chat/components/ChatDisclaimer';
import WithdrawalModal from '../screens/app/more/bankAccount/components/WithdrawalModal';
import CustomDateFilter from '../screens/app/more/components/CustomDateFilter';
import FundWalletDto from '../screens/app/more/dto/FundWallet.dto';
import {IHomeRoute, Navigate} from '../@types/routes';

registerSheet('AllCategory', AllCategory);
registerSheet('CustomSelect', CustomSelect);
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
registerSheet('ConfirmDelete', ConfirmDeleteActionSheet);
registerSheet('DeleteAddress', DeleteAddress);
registerSheet('FullChatActivated', FullChatActivated);
registerSheet('ChatDisclaimer', ChatDisclaimer);
registerSheet('Withdrawal', WithdrawalModal);
registerSheet('CustomDateFilter', CustomDateFilter);

export type ActionSheetLoader = {
  isDefaultLoading?: boolean;
  isDeletingAddress?: boolean;
  isUploading?: boolean;
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
        mainCategoryUuids: string[];
        subCategoriesUuid: string[];
      };
    }>;
    Rating: SheetDefinition<{
      returnValue: {
        minRating: string;
      };
    }>;
    FundWallet: SheetDefinition<{
      payload: {
        type: 'FUND' | 'WITHDRAW';
        navigation?: any;
      };
      returnValue: {
        amount?: number;
        type?: 'FUND' | 'WITHDRAW';
        success?: boolean;
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
    FaceMatch: SheetDefinition<{
      payload: {
        image: any;
        navigation?: any;
        verificationPinParams?: {
          uuid: string;
        };
        onCancelJob?: () => void;
      };
    }>;
    CancelJob: SheetDefinition<{
      payload: {
        navigation?: any;
        verificationPinParams?: {
          uuid: string;
        };
        onCancelJob?: () => void;
      };
    }>;
    WorkerSuggestion: SheetDefinition<{
      payload: {
        uuid: string;
        navigation: Navigate<IHomeRoute>;
      };
    }>;
    RateService: SheetDefinition<{
      payload: {
        uuid: string;
        providerImage: string;
        tier: string;
        name: string;
      };
    }>;
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
        enableSearch?: boolean;
        searchPlaceholder?: string;
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
    FullChatActivated: SheetDefinition<{
      payload?: {
        onContinue?: () => void;
        onClose?: () => void;
      };
    }>;
    ChatDisclaimer: SheetDefinition<{
      payload?: {
        onAgree?: () => void;
      };
    }>;
    Withdrawal: SheetDefinition<{
      payload?: Partial<FundWalletDto>;
    }>;
    CustomDateFilter: SheetDefinition<{
      payload?: {
        startDate?: Date;
        endDate?: Date;
      };
      returnValue?: {
        startDate?: Date;
        endDate?: Date;
      };
    }>;
  }
}
