import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React from 'react';
import CatchError from '../../../../../shared/errors/catchError';
import HomeApi from '../../../../../shared/services/Home';
import {appStore} from '../../../../../shared/stores/appStore';
import utils from '../../../../../shared/Utils';
import DeclineOfferDto from '../../jobs/dto/DeclineOffer.dto';
import SendOfferDto from '../../jobs/dto/SendOffer.dto';
import SaveHelpersDetailsDTO from '../dto/SaveHelpersDetailsDto';
import SavePriceDTO from '../dto/SavePriceDto';
import {SheetManager} from 'react-native-actions-sheet';

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
      enabled: Boolean(appStore.isAuthenticated),
    });

    return {data, isLoading, error};
  }

  useSavedLocation() {
    const query = useQueryClient();

    const {data, isLoading, error} = useQuery({
      queryKey: ['get-saved-location'],
      queryFn: async () => await this.getSavedLocation(),
      enabled: Boolean(appStore.isAuthenticated),
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
      onSuccess: data => {
        console.log(data);
        
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

  useCustomerDashboard(query: ProvidersQuery) {
    const {data, isLoading, error} = useQuery({
      queryKey: ['customer-dashboard', query],
      queryFn: async () => await this.getCustomerDashboard(query),
      enabled: Boolean(appStore.isAuthenticated),
    });

    return {data: data?.data, isLoading, error};
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
    const [sendOfferLoading, setOfferLoading] = React.useState(false);

    const {
      mutateAsync: sendOffer,
      isPending: sendingPending,
      data: sendOfferData,
    } = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: SendOfferDto) => {
        return await this.sendOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const {
      mutateAsync: updateOffer,
      isPending: updatePending,
      data: updateOfferData,
    } = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: SendOfferDto) => {
        return await this.updateOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: declineOffer, isPending: declinePending} = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: DeclineOfferDto) => {
        return await this.declineOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: cancelOffer, isPending: cancelPending} = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: DeclineOfferDto) => {
        return await this.declineOffer(body.uuid!, body);
      },
      onSuccess: (data, body) => {},
      onError: error => new CatchError(error, true),
    });

    const onSendOffer = async (body: SendOfferDto) => {
      const attachments = [];

      for (const att of body.attachments!) {
        attachments.push(await upload(att, 'offer'));
      }

      body.attachments = attachments;

      sendOffer(body);
    };

    return {
      onSendOffer: onSendOffer,
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
    const {data, isLoading, error} = useQuery({
      queryKey: ['customer-dashboard', query, uuid],
      queryFn: async () => await this.getReviews(uuid, query),
      enabled: Boolean(appStore.isAuthenticated),
    });

    return {data: data?.data, isLoading, error};
  }

  useCustomer() {
    const {data, isLoading, error} = useQuery({
      queryKey: ['customer'],
      queryFn: async () => await this.getCustomer(),
      enabled: Boolean(appStore.isAuthenticated),
    });

    return {data: data?.data, isLoading, error};
  }
}

const homeService = HomeService.getInstance();
export default homeService;
