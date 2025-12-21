import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import React from 'react';
import {SheetManager} from 'react-native-actions-sheet';
import {IHomeRoute} from '../../../../../@types/routes';
import AppStorage from '../../../../../shared/AppStorage';
import {ReasonType} from '../../../../../shared/Constant';
import CatchError from '../../../../../shared/errors/catchError';
import HomeApi from '../../../../../shared/services/Home';
import utils from '../../../../../shared/Utils';
import DeclineOfferDto from '../../jobs/dto/DeclineOffer.dto';
import SendOfferDto from '../../jobs/dto/SendOffer.dto';
import ProvidersDto from '../dto/providersDto';
import Review from '../dto/reviews.dto';
import SaveHelpersDetailsDTO from '../dto/SaveHelpersDetailsDto';
import SavePriceDTO from '../dto/SavePriceDto';

class HomeService extends HomeApi {
  private static instance: HomeService;
  queryClient = new QueryClient();

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
    });

    return {data, isLoading, error};
  }

  useSavedLocation() {
    const query = useQueryClient();

    const {data, isLoading, error, refetch} = useQuery({
      queryKey: ['get-saved-location'],
      queryFn: async () => await this.getSavedLocation(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    const {mutate: setDefault, isPending: defaultLoading} = useMutation({
      mutationKey: ['default-location'],
      mutationFn: async (uuid: string) => await this.setDefaultLocation(uuid),
      onSuccess: data => {
        query.invalidateQueries({queryKey: ['user']});
        SheetManager.hide('AddressOptions');
      },
      onError: err => new CatchError(err, true),
    });

    const {mutate: onDelete, isPending: deleteLoading} = useMutation({
      mutationKey: ['delete-location'],
      mutationFn: async (uuid: string) => await this.deleteLocation(uuid),
      onSuccess: () => {
        query.invalidateQueries({queryKey: ['user', 'get-saved-location']});
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
      refetch,
    };
  }

  useLocation(search?: string) {
    const query = useQueryClient();

    const [locations, setLocations] = React.useState<Partial<SaveLocation>[]>();

    const {mutateAsync: saveLocation, isPending} = useMutation({
      mutationKey: ['save-location'],
      mutationFn: async (body: Partial<SaveLocation>) => {
        return await this.saveLocation(body);
      },
      onError: error => new CatchError(error, true),
      onSuccess: data => {
        query.invalidateQueries({queryKey: ['user']});
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
      values: Partial<SaveLocation>,
      callBack?: (data: Partial<SaveLocation>) => void,
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
      onSuccess?: (
        formattedAddress: string,
        metadata?: {
          address: string;
          state?: string;
          lga?: string;
          lat: number;
          lng: number;
          description?: string;
        },
      ) => void,
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
        let metadata;

        try {
          const data = await this.getAddressFromLatLng(latitude, longitude);

          if (!data) throw new Error('No geocoding data returned');

          const components = data?.address_components || [];
          const {address, state, lga} = utils.extractAddressParts(components);

          metadata = {
            address,
            state,
            lga,
            lat: latitude,
            lng: longitude,
            description: data.formatted_address,
          };

          onSubmit(metadata);

          formattedAddress = data.formatted_address;
        } catch (geocodeError) {
          onSubmit({
            lat: latitude,
            lng: longitude,
            description: 'Current location (address lookup failed)',
          });
        }

        // 4. Success callback
        if (onSuccess) onSuccess(formattedAddress, metadata);
      } catch (error) {
        console.error('Location process failed:', error);
      }
    };

    const searchLocation = async (
      addressQuery: string,
    ): Promise<Partial<SaveLocation>[]> => {
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
      onSuccess: () => this.queryClient.invalidateQueries({queryKey: ['user']}),
    });

    return {
      savePrice: mutateAsync,
      isPending,
    };
  }

  useCustomerDashboard(isSearchPage = false) {
    const {query, setQuery, appendPageData, data, fetchMore} =
      utils.usePagination<ProvidersQuery, ProvidersDto>({
        pagination: {
          limit: 10,
          orderBy: 'DESC',
        },
        filter: {
          isSearchPage,
        },
      });

    React.useEffect(() => {
      setQuery({
        pagination: {
          limit: 10,
          orderBy: 'DESC',
        },
        filter: {
          isSearchPage,
        },
      });
    }, []);

    const {
      data: dashboard,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['customer-dashboard', query],
      queryFn: async () => await this.getCustomerDashboard(query!),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
      refetchOnMount: true,
      retryOnMount: true,
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

  useProviderDashboard() {
    const {
      data: dashboard,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['provider-dashboard'],
      queryFn: async () => await this.getProviderDashboard(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {
      data: dashboard?.data,
      isLoading,
      error,
    };
  }

  useSaveHelpersDetails() {
    const {mutateAsync, isPending} = useMutation({
      mutationKey: ['helper-details'],
      mutationFn: async (body: SaveHelpersDetailsDTO) => {
        return await this.saveHelpersDetails(body);
      },
      onError: error => new CatchError(error, true),
      onSuccess: () => this.queryClient.invalidateQueries({queryKey: ['user']}),
    });

    return {
      saveHelpersDetails: mutateAsync,
      isPending,
    };
  }

  useOffer() {
    const {isLoading, uploadBatch} = utils.useUploadImage();
    const router = useRoute<RouteProp<IHomeRoute, 'ServiceProfile'>>();
    const client = useQueryClient();

    const {
      mutateAsync: sendOffer,
      isPending: sendingPending,
      data: sendOfferData,
    } = useMutation({
      mutationKey: ['send-offer'],
      mutationFn: async (body: SendOfferDto) => {
        return await this.sendOffer(body.uuid!, body);
      },
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['conversation', 'conversations']});
      },
      onError: error => new CatchError(error, true),
    });

    const {
      mutateAsync: updateOffer,
      isPending: updatePending,
      data: updateOfferData,
    } = useMutation({
      mutationKey: ['update-offer'],
      mutationFn: async (body: SendOfferDto) => {
        return await this.updateOffer(body.uuid!, body);
      },
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['conversation']});
      },
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: declineOffer, isPending: declinePending} = useMutation({
      mutationKey: ['decline-offer'],
      mutationFn: async (body: DeclineOfferDto) => {
        return await this.declineOffer(body.uuid!, body);
      },
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['conversation']});
      },
      onError: error => new CatchError(error, true),
    });

    const {mutateAsync: cancelOffer, isPending: cancelPending} = useMutation({
      mutationKey: ['cancel-offer'],
      mutationFn: async (body: DeclineOfferDto) => {
        return await this.cancelOffer(body.uuid!, body);
      },
      onSuccess: () => {
        client.invalidateQueries({queryKey: ['conversation']});
      },
      onError: error => new CatchError(error, true),
    });

    const onSendOffer = async (body: SendOfferDto, callBack?: () => void) => {
      try {
        const {attachments, errors} = await uploadBatch(body.attachments!);

        if (errors.length > 0) {
          console.log(errors);
        }

        body.attachments = attachments;
        body.uuid = body.uuid || router.params?.uuid;
        body.amount = +body.amount!;

        sendOffer(body, {onSuccess: callBack});
      } catch (error) {
        new CatchError(error, true);
      }
    };

    const handleUpdateOffer = React.useCallback(
      async (payload: SendOfferDto, close: () => void) => {
        const {attachments} = await uploadBatch(payload.attachments!);

        const normalizedAmount = payload.amount || 0;

        const body: SendOfferDto = {
          ...payload,
          amount: normalizedAmount,
          attachments: attachments || undefined,
        };

        updateOffer(body, {
          onSuccess: () => {
            close();
          },
        });
      },
      [],
    );

    return {
      onSendOffer,
      sendOfferData,
      sendingPending: isLoading || sendingPending,
      declineOffer,
      declinePending,
      updateOfferData,
      cancelOffer,
      cancelPending,
      updatePending,
      handleUpdateOffer,
    };
  }

  useReviews(size = 10) {
    const {query, appendPageData, data, fetchMore, resetHistory} =
      utils.usePagination<Review[]>({
        pagination: {
          limit: size,
          orderBy: 'DESC',
          page: 1,
        },
      });

    const {
      data: reviews,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: ['reviews', query],
      queryFn: async () => await this.getReviews(query),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    React.useEffect(() => {
      if (reviews?.data) {
        if (query.pagination?.page === 1) {
          resetHistory();
          appendPageData(reviews.data);
        } else if (
          reviews.data &&
          data.length <= (reviews.pagination?.total || 0)
        ) {
          appendPageData(reviews.data);
        }
      }
    }, [reviews?.data, query.pagination?.page]);

    const controlledFetchMore = () => {
      if (reviews?.pagination && !isLoading) {
        const currentPage = reviews.pagination.page;
        const totalPages = reviews.pagination.pages;

        if (currentPage < totalPages) {
          fetchMore();
        }
      }
    };

    return {
      data: data as Review[],
      isLoading,
      error,
      fetchMore: controlledFetchMore,
      refetch,
      total: reviews?.pagination?.total,
    };
  }

  useUser() {
    const {data, isLoading, error, refetch} = useQuery({
      queryKey: ['user'],
      queryFn: async () => await this.getUser(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {data: data?.data, isLoading, error, refetch};
  }

  useListCategory(type: ReasonType) {
    const {data, isLoading, error} = useQuery({
      queryKey: ['category', type],
      queryFn: async () => await this.getReason(type),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {data: data?.data, isLoading, error};
  }

  useUpload() {
    const {isLoading, upload} = utils.useUploadImage();

    const onSubmit = async (uri: string) => {
      try {
        return upload(uri, 'compliance');
      } catch (error) {
        console.log(error);
      }
    };

    return {onSubmit, uploading: isLoading};
  }

  useGetReviewRatingMetrics(uuid: string) {
    const {data, isLoading, error} = useQuery({
      queryKey: ['rating-metrics', uuid],
      queryFn: async () => await this.customerProviderReview(uuid),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });

    return {data: data?.data, isLoading, error};
  }

  useAvailability() {
    const {data, isPending, error, mutate} = useMutation({
      mutationKey: ['availability'],
      mutationFn: async (a: boolean) => await this.availability(a),
    });

    return {data: data?.data.availability, isPending, error, mutate};
  }
}

const homeService = HomeService.getInstance();
export default homeService;
