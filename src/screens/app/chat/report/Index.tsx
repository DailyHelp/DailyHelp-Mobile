import {View} from 'react-native';
import {IReport} from '../../../../@types/routes';
import ReportType from './ReportType';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import ReportDetails from './ReportDetails';
import React from 'react';
import {SwiperFlatListRefProps} from 'react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps';
import CustomHeader from '../../../../components/customHeader/Index';
import {Formik} from 'formik';
import ReportConversationDto from '../dto/report-conversation.dto';
import createValidator from 'class-validator-formik';
import chatService from '../services/Chat.service';

const Report: IReport = props => {
  const ref = React.useRef<SwiperFlatListRefProps | null>(null);
  const [index, setIndex] = React.useState(0);

  const {isPending, mutate} = chatService.useReportConversation();

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
        title="Report"
        {...props}
        textMiddle
        goBack={index === 1 ? goBack : props.navigation.goBack}
      />
      <Formik
        initialValues={new ReportConversationDto()}
        validate={createValidator(ReportConversationDto)}
        onSubmit={data => {
          mutate({...data, uuid: props.route.params?.uuid}, () => {
            props.navigation.navigate('ReportSubmitted');
          });
        }}>
        {({values, handleChange, handleSubmit}) => (
          <SwiperFlatList
            ref={ref}
            autoplay={false}
            showPagination={false}
            disableGesture>
            <ReportType
              {...props}
              values={values}
              scroll={title => {
                handleChange('reportCategory')(title);
                handleChange('uuid')(props.route.params?.uuid!);
                next(title);
              }}
            />
            <ReportDetails
              {...props}
              values={values}
              onAttachment={handleChange('pictures')}
              onChangeDescription={handleChange('description')}
              handleSubmit={handleSubmit}
              isPending={isPending}
            />
          </SwiperFlatList>
        )}
      </Formik>
    </View>
  );
};
export default Report;
