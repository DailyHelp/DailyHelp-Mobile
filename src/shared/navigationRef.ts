import { createNavigationContainerRef } from '@react-navigation/native';
import {
  IHomeRoute,
  IAuthRoute,
  IMoreRoute,
  ISearchRoute,
  IChatRoute,
  IJobsRoute,
  IAppRoute,
} from '../@types/routes';

type RootStackParamList = IAppRoute &
  IHomeRoute &
  IAuthRoute &
  IMoreRoute &
  ISearchRoute &
  IChatRoute &
  IJobsRoute;

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any);
  } else {
    // Retry navigation after a short delay if not ready
    setTimeout(() => {
      if (navigationRef.isReady()) {
        navigationRef.navigate(name as any, params as any);
      }
    }, 1000);
  }
}

export function push<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch({
      type: 'PUSH',
      payload: { name, params },
    });
  } else {
    // Retry push after a short delay if not ready
    setTimeout(() => {
      if (navigationRef.isReady()) {
        navigationRef.dispatch({
          type: 'PUSH',
          payload: { name, params },
        });
      }
    }, 1000);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else if (!navigationRef.isReady()) {
    // Retry goBack after a short delay if not ready
    setTimeout(() => {
      if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
      }
    }, 1000);
  }
}
