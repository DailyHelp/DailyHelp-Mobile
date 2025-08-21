import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import CustomHeader from '../../components/customHeader/Index';
import CreateAccount from '../../screens/auth/CreateAccount';
import VerifyAccount from '../../screens/auth/VerifyAccount';
import VerifyIdentity from '../../screens/auth/VerifyIdentity';
import PersonalInformation from '../../screens/auth/compliance/PersonalInformation';
import IdentityVerification from '../../screens/auth/compliance/IdentityVerification';
import FacialVerification from '../../screens/auth/compliance/FacialVerification';
import SelfieVerification from '../../screens/auth/compliance/selfie/Index';
import {Observer} from 'mobx-react-lite';
import {appStore} from '../../shared/stores/appStore';
import Login from '../../screens/auth/Login';
import ConfirmDetails from '../../screens/auth/compliance/ConfirmDetails';
import Verifying from '../../screens/auth/compliance/Verifying';
import VerificationResponse from '../../screens/auth/compliance/VerificationResponse';
import ResetPassword from '../../screens/auth/ResetPassword';
import ForgotPassword from '../../screens/auth/ForgotPassword';
import VerifyAddress from '../../screens/auth/compliance/VerifyAddress';
import ProfileSetup from '../../screens/auth/compliance/ProfileSetup';
import SetPrices from '../../screens/auth/compliance/SetPrices';
import IdentityVerificationRoute from './IdentityVerificationRoute';

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
    name: 'ProfileSetup',
    component: ProfileSetup,
    options: {
      headerShown: true,
      header: (props: NativeStackHeaderProps) => (
        <CustomHeader type="back" title="Go back" {...props} />
      ),
    },
  },
  {
    name: 'SetPrices',
    component: SetPrices,
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
  ...IdentityVerificationRoute,
];

export default UserRoutes;
