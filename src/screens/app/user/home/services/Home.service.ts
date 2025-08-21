import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {SheetManager} from 'react-native-actions-sheet';
import {IHomeRoute} from '../../../../../@types/routes';
import AppStorage from '../../../../../shared/AppStorage';
import CatchError from '../../../../../shared/errors/catchError';
import HomeApi from '../../../../../shared/services/Home';
import utils from '../../../../../shared/Utils';
import DeclineOfferDto from '../../jobs/dto/DeclineOffer.dto';
import SendOfferDto from '../../jobs/dto/SendOffer.dto';
import ProvidersDto from '../dto/providersDto';
import SaveHelpersDetailsDTO from '../dto/SaveHelpersDetailsDto';
import SavePriceDTO from '../dto/SavePriceDto';
import {ReasonType} from '../../../../../shared/Constant';

class HomeService extends HomeApi {
  private static instance: HomeService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new HomeService();
    }

    return this.instance;
  }

  useAllCategories() {
    const {data, isLoading, error} = useQuery({
      queryKey: ['allCategories'],
      queryFn: async () => await this.getAllCategories(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {data, isLoading, error};
  }

  useSavedLocation() {
    const query = useQueryClient();

    const {data, isLoading, error} = useQuery({
      queryKey: ['get-saved-location'],
      queryFn: async () => await this.getSavedLocation(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    const {mutate: setDefault, isPending: defaultLoading} = useMutation({
      mutationKey: ['default-location'],
      mutationFn: async (uuid: string) => await this.setDefaultLocation(uuid),
      onSuccess: data => {
        query.invalidateQueries({queryKey: ['customer']});
        SheetManager.hide('AddressOptions');
      },
      onError: err => new CatchError(err, true),
    });

    const {mutate: onDelete, isPending: deleteLoading} = useMutation({
      mutationKey: ['delete-location'],
      mutationFn: async (uuid: string) => await this.setDefaultLocation(uuid),
      onSuccess: () => {
        query.invalidateQueries({queryKey: ['customer']});
        SheetManager.hide('AddressOptions');
      },
      onError: err => new CatchError(err, true),
    });

    return {
      data,
      isLoading,
      error,
      setAsDefault: setDefault,
      defaultLoading,
      onDelete,
      deleteLoading,
    };
  }

  useLocation(search?: string) {
    const query = useQueryClient();

    const [locations, setLocations] =
      React.useState<Partial<SaveLocationDto>[]>();

    const {mutateAsync: saveLocation, isPending} = useMutation({
      mutationKey: ['save-location'],
      mutationFn: async (body: Partial<SaveLocationDto>) => {
        return await this.saveLocation(body);
      },
      onError: error => new CatchError(error, true),
      onSuccess: data => {
        query.invalidateQueries({queryKey: ['customer']});
        SheetManager.hide('HomeAddress');
      },
    });

    React.useEffect(() => {
      if (search) {
        searchLocation(search).then(locations => {
          setLocations(locations);
        });
      } else {
        setLocations([]);
      }
    }, [search]);

    const onSubmit = async (
      values: Partial<SaveLocationDto>,
      callBack?: (data: Partial<SaveLocationDto>) => void,
    ) => {
      const payload = {
        ...values,
        lat: values.lat || 0,
        lng: values.lng || 0,
        address: values.address || '',
        lga: values.lga || '',
        description: values.description || '',
        default: true,
      };

      const res = await saveLocation(payload);
      if (res?.status) callBack?.(values);
    };

    const currentLocation = async (
      onSuccess?: (formattedAddress: string) => void,
    ) => {
      try {
        const hasPermission = await utils.requestLocationPermission();
        if (!hasPermission) return;

        const position = await new Promise<GeolocationResponse>(
          (resolve, reject) => {
            Geolocation.getCurrentPosition(
              resolve,
              error => {
                if (error.code === error.TIMEOUT) {
                  Geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: false,
                    timeout: 10000,
                  });
                } else {
                  reject(error);
                }
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          },
        );

        const {latitude, longitude} = position.coords;

        let formattedAddress = '';
        try {
          const data = await this.getAddressFromLatLng(latitude, longitude);

          if (!data) throw new Error('No geocoding data returned');

          const components = data?.address_components || [];
          const {address, state, lga} = utils.extractAddressParts(components);

          onSubmit({
            address,
            state,
            lga,
            lat: latitude,
            lng: longitude,
            description: data.formatted_address,
          });

          formattedAddress = data.formatted_address;
        } catch (geocodeError) {
          onSubmit({
            lat: latitude,
            lng: longitude,
            description: 'Current location (address lookup failed)',
          });
        }

        // 4. Success callback
        if (onSuccess) onSuccess(formattedAddress);
      } catch (error) {
        console.error('Location process failed:', error);
      }
    };

    const searchLocation = async (
      addressQuery: string,
    ): Promise<Partial<SaveLocationDto>[]> => {
      const res = await this.getAddressFromSearch(addressQuery, 'ng', true);

      return res.map((item: AddressPrediction) => {
        return {
          address: item.description,
          description: item.description,
          lat: item.coordinates?.lat || 0,
          lng: item.coordinates?.lng || 0,
          state: item.state,
        };
      });
    };

    return {
      onSubmit,
      loading: isPending,
      currentLocation,
      searchLocation,
      locations,
    };
  }

  useSavePrice() {
    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['save-price'],
      mutationFn: async (body: SavePriceDTO) => {
        return await this.savePrice(body);
      },
      onError: error => new CatchError(error, true),
    });

    return {
      savePrice: mutateAsync,
      isPending,
    };
  }

  useCustomerDashboard() {
    const {query, setQuery, appendPageData, data, fetchMore} =
      utils.usePagination<ProvidersQuery, ProvidersDto>({
        pagination: {
          limit: 10,
          orderBy: 'DESC',
        },
      });

    const {
      data: dashboard,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['customer-dashboard', query],
      queryFn: async () => await this.getCustomerDashboard(query!),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    React.useEffect(() => {
      if (dashboard?.data) {
        appendPageData(dashboard?.data?.allProviders?.data!);
      }
    }, [dashboard?.data]);

    return {
      data: dashboard?.data,
      isLoading,
      error,
      query,
      setQuery,
      fetchMore,
      allProviders: data,
    };
  }

  useSaveHelpersDetails() {
    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['helper-details'],
      mutationFn: async (body: SaveHelpersDetailsDTO) => {
        return await this.saveHelpersDetails(body);
      },
      onError: error => new CatchError(error, true),
    });

    return {
      saveHelpersDetails: mutateAsync,
      isPending,
    };
  }

  useOffer() {
    const {upload, isLoading} = utils.useUploadImage();
    const router = useRoute<RouteProp<IHomeRoute, 'ServiceProfile'>>();
    const client = useQueryClient();

    const {
      mutateAsync: sendOffer,
      isPending: sendingPending,
      data: sendOfferData,
    } = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: SendOfferDto) => {
        return await this.sendOffer(router.params?.uuid!, body);
      },
      onSuccess: (data, body) => {
        client.invalidateQueries({queryKey: ['conversations']});
      },
      onError: error => new CatchError(error, true),
    });

    const {
      mutateAsync: updateOffer,
      isPending: updatePending,
      data: updateOfferData,
    } = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: SendOfferDto) => {
        return await this.updateOffer(router.params?.uuid!!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: declineOffer, isPending: declinePending} = useMutation({
      mutationKey: ['decline-offer'],
      mutationFn: async (body: DeclineOfferDto) => {
        return await this.declineOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: cancelOffer, isPending: cancelPending} = useMutation({
      mutationKey: ['cancel-offer'],
      mutationFn: async (body: DeclineOfferDto) => {
        return await this.cancelOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const onSendOffer = async (body: SendOfferDto, callBack?: () => void) => {
      try {
        const attachments = [];

        if (typeof body.attachments === 'string') {
          for (const att of JSON.parse(body.attachments! as string)) {
            attachments.push(await upload(att, 'offer'));
          }
        }

        body.attachments = attachments;
        body.uuid = router.params?.uuid;
        body.amount = +body.amount!;

        sendOffer(body, {onSuccess: callBack});
      } catch (error) {
        new CatchError(error, true);
      }
    };

    return {
      onSendOffer,
      sendOfferData,
      sendingPending: isLoading || sendingPending,
      declineOffer,
      declinePending,
      updateOffer,
      updateOfferData,
      cancelOffer,
      cancelPending,
      updatePending,
    };
  }

  useCustomerReviews(uuid: string, query?: PaginationQuery) {
    const {appendPageData, data, fetchMore} = utils.usePagination(query);

    const {
      data: reviews,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['reviews', query, uuid],
      queryFn: async () => await this.getReviews(uuid, query),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    React.useEffect(() => {
      if (reviews?.data) appendPageData(reviews?.data!);
    }, [reviews?.data]);

    return {data: data, isLoading, error, fetchMore};
  }

  useUser() {
    const {data, isLoading, error} = useQuery({
      queryKey: ['user'],
      queryFn: async () => await this.getUser(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {data: data?.data, isLoading, error};
  }

  useListCategory(type: ReasonType) {
    const {data, isLoading, error} = useQuery({
      queryKey: ['customer', type],
      queryFn: async () => await this.getReason(type),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {data: data?.data, isLoading, error};
  }
}

const homeService = HomeService.getInstance();
export default homeService;
