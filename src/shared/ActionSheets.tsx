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

declare module 'react-native-actions-sheet' {
  interface Sheets {
    AllCategory: SheetDefinition<{
      payload: {
        type: 'create' | 'login';
        subTitle?: string;
      };
      returnValue: {
        value: string;
      };
    }>;
    Rating: SheetDefinition<{}>;
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
      };
    }>;
    PriceRange: SheetDefinition<{}>;
    Gallery: SheetDefinition<{}>;
    FaceMatch: SheetDefinition<{}>;
    CancelJob: SheetDefinition<{}>;
    WorkerSuggestion: SheetDefinition<{}>;
    RateService: SheetDefinition<{}>;
    AddressOptions: SheetDefinition<{}>;
    CustomSelect: SheetDefinition<{
      payload: {
        label?: string;
        data?: {label?: string; value: string}[];
      };
      returnValue: {label?: string; value: string};
    }>;
  }
}
