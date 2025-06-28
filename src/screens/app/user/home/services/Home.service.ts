import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { appStore } from '../../../../../shared/stores/appStore';
import HomeApi from '../../../../../shared/services/Home';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { GOOGLE_API_KEY } from '@env';
import CatchError from '../../../../../shared/errors/catchError';
import utils from '../../../../../shared/Utils';

class HomeService extends HomeApi {
    private static instance: HomeService;
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new HomeService();
      }
  
      return this.instance;
    }


  

    useAllCategories() {
        const {data,isLoading, error} = useQuery({
          queryKey: ['allCategeries'],
          queryFn: async () => await this.getAllCategories(),
          enabled: Boolean(appStore.isAuthenticated),
        });

        return { data, isLoading, error };
      }

      useSavedLocation() {
        const {data,isLoading, error} = useQuery({
          queryKey: ['savedLocation'],
          queryFn: async () => await this.getSavedLocation(),
          enabled: Boolean(appStore.isAuthenticated),
        });

        return { data, isLoading, error };
      }

  async getCurrentLocation(latitude: number, longitude: number) {
    const res = await this.fetchHandler({
      path: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`,
      method: 'GET',
      standAlonePath: true,
    });

    const data = (await this.handleResponse(res)) as any;

    if (data?.error_message) {
      throw new Error(data.error_message);
    }

    return {
      formatted_address: data?.results[0]?.formatted_address,
    };
  }
  
  useSaveLocation(): {
    mutate: (data: SaveLocationDto) => void;
    onSubmit: (values: Partial<SaveLocationDto>) => void;
    loading: boolean;
    initialValues: Partial<SaveLocationDto>;
    handleUseCurrentLocation: (onSuccess?: (formattedAddress: string) => void) => void;
  } {
    const {mutate: mutateManifest, isPending} = useMutation({
      mutationKey: ['saveLocation'],
      mutationFn: async (body: SaveLocationDto) =>
        await this.saveLocation(body),
      onError: error => new CatchError(error, true),
      onSuccess: data => {
       
      },
    });
  
    const initialValues: Partial<SaveLocationDto> = {
      lat: 0,
      address: '',
      lga: '',
      description: '',
      lng: 0,
      state: '',
      default: true,
    };
  
    const onSubmit = (values: Partial<SaveLocationDto>) => {
      const payload = {
        ...values,
        lat: values.lat || 0,
        lng: values.lng || 0,
        address: values.address || '',
        lga: values.lga || '',
        description: values.description || '',
        default: true,
      };
      mutateManifest(payload as SaveLocationDto);
    };
  
    const handleUseCurrentLocation = async (onSuccess?: (formattedAddress: string) => void) => {
      const hasPermission = await utils.requestLocationPermission();
      if (!hasPermission) {
       
        return;
      }
  
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          try {
            const data = await homeService.getCurrentLocation(latitude, longitude);
            const components = (data as any)?.address_components || [];
            const {address, state, lga} = utils.extractAddressParts(components);
            onSubmit({
              address,
              state,
              lga,
              lat: latitude,
              lng: longitude,
              description: data.formatted_address,
            });
  
            if (onSuccess) {
              onSuccess(data.formatted_address);
            }
          } catch (error) {
            console.error('Failed to get address:', error);
          }
        },
        error => {
          console.error('Error getting location:', error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };
  
    return {
      mutate: mutateManifest,
      onSubmit,
      loading: isPending,
      initialValues,
      handleUseCurrentLocation,
    };
  }

  
}

const homeService = HomeService.getInstance();
export default homeService;
