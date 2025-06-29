import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {IAddress} from '../../../../@types/routes';
import Assets from '../../../../assets/Assets';
import CustomFlatList from '../../../../components/CustomFlatList';
import CustomInput from '../../../../components/customInput/Index';
import Typography from '../../../../components/Typography';
import {scale, verticalScale} from '../../../../shared/Scaling';
import utils from '../../../../shared/Utils';
import Icon from 'react-native-vector-icons/Feather';
import {SheetManager} from 'react-native-actions-sheet';
import homeService from '../home/services/Home.service';

const Address: IAddress = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);

  const {data} = homeService.useSavedLocation();

  const Results = React.useCallback(
    ({name}: {name: string}) => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: verticalScale(16),
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Assets.SearchResult width={20} height={20} />
          <Typography size="sm">{utils.ellipseText(name, 50)}</Typography>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => SheetManager.show('AddressOptions')}>
            <Icon name="more-vertical" size={15} color={'#C0C5D6'} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [],
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: scale(16), flexDirection: 'column', gap: 10}}>
        <CustomInput
          type="address"
          placeholder="Add new address"
          leftIcon={<Assets.InputSearch />}
        />

        <CustomFlatList<SaveLocationDto>
          data={data}
          renderItem={({item}) => <Results name={item.description} />}
          keyExtractor={(item, ind) => ind.toString()}
        />
      </View>
    </View>
  );
};
export default Address;
