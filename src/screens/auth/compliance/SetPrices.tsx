import {Formik} from 'formik';
import {ISetPrices} from '../../../@types/routes';
import AttachmentContainer from '../../../components/AttachmentContainer';
import MainButton from '../../../components/button/MainButton';
import Container from '../../../components/container/Index';
import CustomInput from '../../../components/customInput/Index';
import ScreenHeader from '../../../components/ScreenHeader';
import Typography from '../../../components/Typography';
import React from 'react';

const SetPrices: ISetPrices = ({navigation}) => {
  return (
    <Container flex={1} gap={20}>
      <ScreenHeader
        title="Set Your Prices"
        description="Let clients know what you charge. Be fair and realistic, you can always negotiate later."
      />

      <Formik initialValues={{}} onSubmit={() => {}}>
        {({}) => (
          <Container width={'full'} height={600} justifyContent='space-between'>
            <Container width={'full'} gap={30}>
              <Container width={'full'} gap={3}>
                <CustomInput label="Starting price" placeholder="₦ 5,000" />

                <Typography color="gray" size="sm">
                  This is your starting rate for all offers.
                </Typography>
              </Container>

              <Container width={'full'} gap={3}>
                <CustomInput
                  label="Minimum Acceptable Offer"
                  placeholder="₦ 0.00"
                />
                <Typography color="gray" size="sm">
                  This is the lowest amount you can accept for a job.
                </Typography>
              </Container>
            </Container>

            <MainButton onPress={() => navigation.navigate('SetPrices')}>
              Save
            </MainButton>
          </Container>
        )}
      </Formik>
    </Container>
  );
};
export default SetPrices;
