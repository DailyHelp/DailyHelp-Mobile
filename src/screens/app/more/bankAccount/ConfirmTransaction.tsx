import React from 'react';
import { IConfirmTransaction } from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import MainButton from '../../../../components/button/MainButton';
import Container from '../../../../components/container/Index';
import Typography from '../../../../components/Typography';
import utils from '../../../../shared/Utils';
import moreService from '../services/More.service';

const ConfirmTransaction: IConfirmTransaction = ({navigation, route}) => {
  utils.useHideBottomTab({navigation});
  const {mutate, isPending} = moreService.useWithdraw();

  return (
    <Container flex={1} backgroundColor="white" justifyContent="space-between">
      <Container
        justifyContent="center"
        alignItems="center"
        height={400}
        gap={20}>
        <Container gap={7}>
          <Typography color="gray" textAlign="center">
            Amount
          </Typography>
          <Typography
            color="black"
            currency
            fontWeight="bold"
            size="lg"
            textAlign="center">
            {route.params?.amount}
          </Typography>
        </Container>

        <Typography color="gray">To</Typography>

        <Container
          backgroundColor="lightGrey"
          borderColor="gray"
          borderWidth={0.5}
          borderStyle="dashed"
          borderRadius={10}
          width={'95'}
          alignSelf="center"
          gap={17}
          padding={20}>
          <Typography color="black" fontWeight="bold" textAlign="center">
            {route.params?.accountName}
          </Typography>
          <Typography color="gray" textAlign="center">
            {route.params?.accountNumber}
          </Typography>
          <Container flexDirection="row" alignSelf="center" gap={6}>
            <Assets.Bank />
            <Typography color="gray" textAlign="center">
              {route.params?.bankName}
            </Typography>
          </Container>
        </Container>
      </Container>

      <Container marginBottom={20} width={'95'} alignSelf="center">
        <MainButton
          loading={isPending}
          onPress={() => {
            mutate({
              amount: route.params?.amount,
              bankAccountUuid: route.params?.bankAccountUuid,
            });
          }}
          enableButtonColor="secondary"
          color="white">
          Confirm
        </MainButton>
      </Container>
    </Container>
  );
};

export default ConfirmTransaction;
