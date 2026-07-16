import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {IAuthRoute, Navigate} from '../../../@types/routes';
import {UserTypes} from '../../../shared/Constant';
import {appStore} from '../../../shared/stores/appStore';
import {navigate} from '../../../shared/navigationRef';
import utils from '../../../shared/Utils';
import moreService from '../../app/more/services/More.service';
import UserDTO from '../dto/UserDto';

type PromptState = {
  visible: boolean;
  intendedType?: UserTypes;
  currentType?: UserTypes;
  user?: UserDTO;
};

/**
 * After a switch to PROVIDER, take a not-yet-onboarded account through the
 * provider onboarding flow (KYC → profile setup → pricing) rather than dropping
 * them onto an empty provider dashboard. Shared by the login-time switch prompt
 * and the profile-settings "Provide service" switch.
 *
 * When the provider profile is already onboarded, `switchUser` has already
 * flipped the app into provider mode, so there is nothing to do here.
 */
export function routeAfterProviderSwitch(user?: UserDTO) {
  if (user?.onboardingCompleted) return;

  const verificationUrl = utils.getVerificationRoutes(
    {
      step1: user?.providerOnboarding?.step1,
      step2: user?.providerOnboarding?.step2,
      step3: user?.providerOnboarding?.step3,
      onboardingCompleted: false,
    },
    UserTypes.PROVIDER,
  );

  // Drop into the auth stack (which owns the full onboarding chain) while
  // keeping the provider token, then jump to the first outstanding step.
  appStore.startProviderOnboarding();
  setTimeout(() => {
    navigate(verificationUrl, {
      first_name: user?.firstname,
      last_name: user?.lastname,
      userType: UserTypes.PROVIDER,
    } as any);
  }, 100);
}

/**
 * Detects, at login time, when the account a user just authenticated with does
 * not match the side they selected on onboarding (e.g. a service-seeker account
 * logging into the "I Offer a Service" side). When that happens it surfaces a
 * confirm prompt; accepting runs the exact same switch flow used from profile
 * settings (`moreService.switchUser`), declining routes them into their existing
 * account view.
 */
export function useAccountSwitch() {
  const navigation = useNavigation<Navigate<IAuthRoute>>();
  const {onSwitch, isLoading} = moreService.useSwitchUser();
  const [prompt, setPrompt] = React.useState<PromptState>({visible: false});

  // Normal post-authentication routing (shared with the non-conflict path).
  const routeAfterAuth = (user?: UserDTO) => {
    const userType = utils.getUserType(user?.userTypes)?.[0];

    let step1 = user?.providerOnboarding?.step1;
    let step2 = user?.providerOnboarding?.step2;
    let step3 = user?.providerOnboarding?.step3;

    if (userType === UserTypes.PROVIDER && step1) {
      step1 = true;
      step2 = true;
      step3 = true;
    }

    const verificationUrl = utils.getVerificationRoutes(
      {
        step1,
        step2,
        step3,
        onboardingCompleted: user?.onboardingCompleted,
      },
      userType,
    );

    if (!user?.identityVerified && userType === UserTypes.CUSTOMER) {
      navigation.navigate('VerifyIdentity', {
        first_name: user?.firstname,
        last_name: user?.lastname,
        userType,
      });
      return;
    }

    if (!user?.onboardingCompleted && userType === UserTypes.PROVIDER) {
      navigation.navigate(verificationUrl, {
        first_name: user?.firstname,
        last_name: user?.lastname,
        userType,
      });
      return;
    }

    appStore.setIsAuthenticated(true, userType);
  };

  // Run the switch; when moving to a not-yet-onboarded provider, continue into
  // the provider onboarding flow instead of landing on the dashboard.
  const switchTo = (target: UserTypes) => {
    if (target === UserTypes.PROVIDER) {
      onSwitch(target, {
        onSuccess: (data: any) => routeAfterProviderSwitch(data?.data?.user),
      });
    } else {
      onSwitch(target);
    }
  };

  /**
   * Call this on a successful login/social-auth. `intendedType` is the side the
   * user selected on onboarding (undefined for side-agnostic logins).
   *
   * Returns `true` when a switch prompt / silent switch was triggered and the
   * caller should stop (the flow is now owned by this hook).
   */
  const evaluate = (user?: UserDTO, intendedType?: UserTypes) => {
    const userTypes = utils.getUserType(user?.userTypes) ?? [];
    const currentType = userTypes[0];

    if (intendedType) {
      // Account doesn't have the selected side at all → ask to switch.
      if (!userTypes.includes(intendedType)) {
        setPrompt({visible: true, intendedType, currentType, user});
        return true;
      }

      // Account has both sides but the token is for the other one → silently
      // switch so the session token matches the selected side.
      if (currentType !== intendedType) {
        switchTo(intendedType);
        return true;
      }
    }

    routeAfterAuth(user);
    return false;
  };

  const onConfirm = () => {
    if (prompt.intendedType) {
      switchTo(prompt.intendedType);
    }
    setPrompt(prev => ({...prev, visible: false}));
  };

  const onDecline = () => {
    const user = prompt.user;
    setPrompt(prev => ({...prev, visible: false}));
    routeAfterAuth(user);
  };

  return {
    evaluate,
    switchModal: {
      visible: prompt.visible,
      intendedType: prompt.intendedType,
      currentType: prompt.currentType,
      loading: isLoading,
      onConfirm,
      onDecline,
    },
  };
}

export type SwitchModalProps = ReturnType<
  typeof useAccountSwitch
>['switchModal'];
