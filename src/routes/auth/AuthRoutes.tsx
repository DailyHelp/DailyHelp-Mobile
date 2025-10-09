import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';
import CustomHeader from '../../components/customHeader/Index';
import CreateAccount from '../../screens/auth/CreateAccount';
import ForgotPassword from '../../screens/auth/ForgotPassword';
import Login from '../../screens/auth/Login';
import ResetPassword from '../../screens/auth/ResetPassword';
import VerifyAccount from '../../screens/auth/VerifyAccount';
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
