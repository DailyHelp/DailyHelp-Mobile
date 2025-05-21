import {SheetDefinition, registerSheet} from 'react-native-actions-sheet';
import AllCategory from '../screens/app/user/home/components/AllCategory';
import Rating from '../screens/app/user/home/components/Rating';
import HomeAddress from '../screens/app/user/home/components/HomeAddress';
import PriceRange from '../screens/app/user/home/components/PriceRange';

registerSheet('AllCategory', AllCategory);
registerSheet('Rating', Rating);
registerSheet('HomeAddress', HomeAddress);
registerSheet('PriceRange', PriceRange);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    AllCategory: SheetDefinition<{
      payload: {
        type: 'create' | 'login';
        subTitle?: string;
      };
      returnValue: {};
    }>;
    Rating: SheetDefinition<{}>;
    HomeAddress: SheetDefinition<{}>;
    PriceRange: SheetDefinition<{}>;
  }
}
