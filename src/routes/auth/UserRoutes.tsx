import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import CustomHeader from '../../components/customHeader/Index';
import CreateAccount from '../../screens/auth/user/CreateAccount';
import VerifyAccount from '../../screens/auth/user/VerifyAccount';
import VerifyIdentity from '../../screens/auth/user/VerifyIdentity';
import PersonalInformation from '../../screens/auth/user/compliance/PersonalInformation';
import IdentityVerification from '../../screens/auth/user/compliance/IdentityVerification';
import FacialVerification from '../../screens/auth/user/compliance/FacialVerification';
import SelfieVerification from '../../screens/auth/user/compliance/selfie/Index';
import {Observer} from 'mobx-react-lite';
import {appStore} from '../../shared/stores/appStore';
import Login from '../../screens/auth/user/Login';
import ConfirmDetails from '../../screens/auth/user/compliance/ConfirmDetails';
import Verifying from '../../screens/auth/user/compliance/Verifying';
import VerificationResponse from '../../screens/auth/user/compliance/VerificationResponse';
import ResetPassword from '../../screens/auth/user/ResetPassword';
import ForgotPassword from '../../screens/auth/user/ForgotPassword';

const UserRoutes = [
  {
    name: 'CreateAccount',
    component: CreateAccount,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'Login',
    component: Login,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'VerifyAccount',
    component: VerifyAccount,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'VerifyIdentity',
    component: VerifyIdentity,
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
    name: 'ForgotPassword',
    component: ForgotPassword,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'ResetPassword',
    component: ResetPassword,
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

export default UserRoutes;
