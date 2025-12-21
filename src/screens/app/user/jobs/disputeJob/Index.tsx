import createValidator from 'class-validator-formik';
import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { SwiperFlatListRefProps } from 'react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps';
import { IDispute } from '../../../../../@types/routes';
import CustomHeader from '../../../../../components/customHeader/Index';
import DisputeDto from '../dto/dispute.dto';
import jobService from '../service/Jobs.service';
import DisputeDetails from './DisputeDetails';
import DisputeType from './DisputeType';

const Dispute: IDispute = props => {
  const ref = React.useRef<SwiperFlatListRefProps | null>(null);
  const [index, setIndex] = React.useState(0);

  const {disputePending, disputeJob} = jobService.useDisputeJob();

  const goBack = () => {
    ref.current?.scrollToIndex({index: 0});
    setIndex(0);
  };

  const next = (title: string) => {
    ref.current?.scrollToIndex({index: 1});
    setIndex(1);
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        type="back"
        title="Dispute"
        {...props}
        textMiddle
        goBack={index === 1 ? goBack : props.navigation.goBack}
      />
      <Formik
        initialValues={new DisputeDto()}
        validate={createValidator(DisputeDto)}
        onSubmit={data => {
          disputeJob(
            {body: data, uuid: props.route.params?.uuid!},
            {
              onSuccess: () => {
                props.navigation.navigate('DisputeSubmitted');
              },
            },
          );
        }}>
        {({values, handleChange, handleSubmit}) => (
          <SwiperFlatList
            ref={ref}
            autoplay={false}
            showPagination={false}
            disableGesture>
            <DisputeType
              {...props}
              values={values}
              scroll={title => {
                handleChange('reasonCategory')(title);
                handleChange('uuid')(props.route.params?.uuid!);
                next(title);
              }}
            />
            <DisputeDetails
              {...props}
              values={values}
              onAttachment={handleChange('pictures')}
              onChangeDescription={handleChange('description')}
              handleSubmit={handleSubmit}
              isPending={disputePending}
            />
          </SwiperFlatList>
        )}
      </Formik>
    </View>
  );
};
export default Dispute;
