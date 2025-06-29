type SaveLocationDto = {
  lat: number;
  lng: number;
  address: string;
  lga: string;
  state: string;
  description: string;
  default?: boolean;
};

type DataType = {
  locations: SaveLocationDto[];
};

type GetSavedLocationResponse = SaveLocationDto[];

type GoogleLocationResponse = {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry?: {
    bounds?: any;
    location: {lat: number; lng: number};
    location_type?: string;
    viewport?: any;
  };
  place_id: string;
  types: string[];
  navigation_points: {location: {latitude: number; longitude: number}}[];
};

type AddressPredictionsResponse = {
  description: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
  };
  terms: {
    value: number;
    offset: number;
  }[];
  types: string[];
};

type GooglAutoCompleteResponse = {
  predictions: AddressPredictionsResponse[];
  status: string;
};

interface AddressPrediction {
  description: string;
  place_id: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface PlaceDetailsResponse {
  result: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    formatted_address: string;
  };
  status: string;
  error_message?: string;
}
