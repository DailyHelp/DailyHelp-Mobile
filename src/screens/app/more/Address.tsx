import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Feather';
import {IAddress} from '../../../@types/routes';
import Assets from '../../../assets/Assets';
import Container from '../../../components/container/Index';
import CustomFlatList from '../../../components/CustomFlatList';
import CustomInput from '../../../components/customInput/Index';
import Typography from '../../../components/Typography';
import AddressSkeleton from '../../../components/skeleton/AddressSkeleton';
import utils from '../../../shared/Utils';
import homeService from '../user/home/services/Home.service';
import {observer} from 'mobx-react-lite';
import {appStore} from '../../../shared/stores/appStore';
import {SaveLocationDto} from '../user/home/dto/savedLocationDto';

const Address: IAddress = ({navigation, route}) => {
  utils.useHideBottomTab(navigation);
  const {onSubmit} = homeService.useLocation();

  const {
    data,
    isLoading,
    defaultLoading,
    setAsDefault,
    deleteLoading,
    onDelete,
    refetch,
  } = homeService.useSavedLocation();

  React.useEffect(() => {
    appStore.setActionSheetLoaders({
      isDefaultLoading: defaultLoading,
      isDeletingAddress: deleteLoading,
    });
  }, [defaultLoading, deleteLoading]);

  const Results = React.useCallback(
    ({name, uuid}: {name: string; uuid: string}) => (
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
          <TouchableOpacity
            onPress={() => {
              console.log('AddressOptions button pressed');
              SheetManager.show('AddressOptions', {
                payload: {
                  uuid,
                  onSetDefault: () => setAsDefault(uuid),
                  onDelete: () => onDelete(uuid),
                },
              }).catch(error => {
                console.log('Error showing AddressOptions:', error);
              });
            }}>
            <Icon name="more-vertical" size={15} color={'#C0C5D6'} />
          </TouchableOpacity>
        </Container>
      </Container>
    ),
    [],
  );

  return (
    <Container flex={1} width={'full'} backgroundColor="white">
      <CustomInput
        type="address"
        placeholder="Add new address"
        leftIcon={<Assets.InputSearch />}
        width={'full'}
      />

      <Container
        onPress={() => {
          SheetManager.show('HomeAddress', {
            payload: {label: 'House Address', showCurrent: true},
            onClose(data) {
              try {
                if (data) {
                  onSubmit({...data, address: data.formatted_address});
                }
              } catch (error) {
                console.error('Error in onClose callback:', error);
              }
            },
          });
        }}
        flexDirection="row"
        alignItems="center"
        gap={4}
        padding={9}
        isTouchable>
        <Assets.GreenPlus />
        <Typography fontWeight="semibold" size="md" color="secondary">
          Add new address
        </Typography>
      </Container>

      {isLoading ? (
        <AddressSkeleton count={3} />
      ) : (
        <CustomFlatList<SaveLocationDto>
          data={data}
          refreshing={defaultLoading || deleteLoading}
          onRefresh={refetch}
          renderItem={({item}) => (
            <Results name={item.description!} uuid={item.uuid!} />
          )}
          keyExtractor={(item, ind) => ind.toString()}
        />
      )}
    </Container>
  );
};
export default observer(Address);
