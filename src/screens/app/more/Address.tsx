import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Feather';
import { IAddress } from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import Container from '../../../components/container/Index';
import CustomFlatList from '../../../components/CustomFlatList';
import CustomInput from '../../../components/customInput/Index';
import Typography from '../../../components/Typography';
import utils from '../../../shared/Utils';
import homeService from '../user/home/services/Home.service';

const Address: IAddress = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);

  const {data} = homeService.useSavedLocation();

  const Results = React.useCallback(
    ({name}: {name: string}) => (
      <Container
        flexDirection="row"
        width={'97'}
        justifyContent="space-between"
        marginTop={16}>
        <Container width={'95'} flexDirection="row" gap={10}>
          <Assets.SearchResult width={20} height={20} />
          <Typography size="sm">{utils.ellipseText(name, 50)}</Typography>
        </Container>

        <Container flexDirection="row" alignItems="center">
          <TouchableOpacity onPress={() => SheetManager.show('AddressOptions')}>
            <Icon name="more-vertical" size={15} color={'#C0C5D6'} />
          </TouchableOpacity>
        </Container>
      </Container>
    ),
    [],
  );
console.log(data);

  return (
    <Container flex={1} width={'full'} backgroundColor="white">
      <CustomInput
        type="address"
        placeholder="Add new address"
        leftIcon={<Assets.InputSearch />}
        width={'97'}
      />

      <CustomFlatList<SaveLocationDto>
        data={data}
        renderItem={({item}) => <Results name={item.description} />}
        keyExtractor={(item, ind) => ind.toString()}
      />
    </Container>
  );
};
export default Address;
