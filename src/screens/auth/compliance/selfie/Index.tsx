import {observer} from 'mobx-react-lite';
import React from 'react';

import Preview from './Preview';
import Selfie from './Selfie';
import {ISelfieVerification} from '../../../../@types/routes';
import {appStore} from '../../../../shared/stores/appStore';

const SelfieVerification: ISelfieVerification = ({navigation, route}) => {
  return (
    <React.Fragment>
      {appStore.hideSelfieVerificationHeader ? (
        <Selfie />
      ) : (
        <Preview navigation={navigation} route={route} />
      )}
    </React.Fragment>
  );
};

export default React.memo(observer(SelfieVerification));
