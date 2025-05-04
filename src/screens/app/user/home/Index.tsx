import {ScrollView, View} from 'react-native';
import {IHome} from '../../../../@types/routes';
import CategorySection from './components/CategorySection';
import {verticalScale} from '../../../../shared/Scaling';
import React from 'react';
import VerifyPhoneNumberContainer from './components/VerifyNumberContainer';
import {Text} from 'react-native-paper';
import {customFontSize, fonts} from '../../../../shared/themes/Typography';

const Home: IHome = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{marginTop: verticalScale(9), flexDirection: 'column', gap: 20}}>
        <View style={{flexDirection: 'column', gap: 9}}>
          <CategorySection
            categories={[
              {label: 'All categories', showIcon: true},
              {label: 'Available'},
              {label: 'Price', showIcon: true},
              {label: 'Rating', showIcon: true},
            ]}
          />
          <VerifyPhoneNumberContainer />
        </View>

        <View style={{width: '95%', alignSelf: 'center'}}>
          <Text style={{fontFamily: fonts.GeistBold, fontSize: customFontSize.md}}>
            Top rated
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;
