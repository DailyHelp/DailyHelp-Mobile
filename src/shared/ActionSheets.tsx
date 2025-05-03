import {SheetDefinition, registerSheet} from 'react-native-actions-sheet';


// registerSheet('AuthenticationModalSheet', AuthenticationModal);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    AuthenticationModalSheet: SheetDefinition<{
      payload: {
        type: 'create' | 'login';
        subTitle?: string;
      };
    }>;
    BiometricModalSheet: SheetDefinition<{}>;
    WelcomeModalSheet: SheetDefinition<{}>;
  }
}
