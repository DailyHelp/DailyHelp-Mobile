import {observer} from 'mobx-react-lite';
import React from 'react';
import {ISelfieVerification} from '../../../../../@types/routes';
import {appStore} from '../../../../../shared/stores/appStore';
import Preview from './Preview';
import Selfie from './Selfie';

const SelfieVerification: ISelfieVerification = ({navigation}) => {
  return (
    <React.Fragment>
      {appStore.hideSelfieVerificationHeader ? (
        <Selfie />
      ) : (
        <Preview navigation={navigation} />
      )}
    </React.Fragment>
  );
};

export default observer(SelfieVerification);
