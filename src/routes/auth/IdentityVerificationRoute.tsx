import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import PersonalInformation from '../../screens/auth/compliance/PersonalInformation';
import VerifyAddress from '../../screens/auth/compliance/VerifyAddress';
import VerifyIdentity from '../../screens/auth/VerifyIdentity';
import CustomHeader from '../../components/customHeader/Index';
import IdentityVerification from '../../screens/auth/compliance/IdentityVerification';
import FacialVerification from '../../screens/auth/compliance/FacialVerification';
import {Observer} from 'mobx-react-lite';
import {appStore} from '../../shared/stores/appStore';
import ConfirmDetails from '../../screens/auth/compliance/ConfirmDetails';
import SelfieVerification from '../../screens/auth/compliance/selfie/Index';
import Verifying from '../../screens/auth/compliance/Verifying';
import VerificationResponse from '../../screens/auth/compliance/VerificationResponse';

export default [
  {
    name: 'VerifyIdentity',
    component: VerifyIdentity,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'VerifyAddress',
    component: VerifyAddress,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'PersonalInformation',
    component: PersonalInformation,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'IdentityVerification',
    component: IdentityVerification,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'FacialVerification',
    component: FacialVerification,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'SelfieVerification',
    component: SelfieVerification,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <Observer>
          {() =>
            !appStore.hideSelfieVerificationHeader ? (
              <CustomHeader type="back" title="Go back" {...props} />
            ) : null
          }
        </Observer>
      ),
    },
  },
  {
    name: 'ConfirmDetails',
    component: ConfirmDetails,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'Verifying',
    component: Verifying,
  },
  {
    name: 'VerificationResponse',
    component: VerificationResponse,
  },
];
