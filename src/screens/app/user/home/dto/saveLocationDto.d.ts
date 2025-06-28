type SaveLocationDto = {
    lat: number;
    lng: number;
    address: string;
    lga: string;
    state: string;
    description:string;
    default: boolean;
}

type DataType = {
    locations: SaveLocationDto[];
  };
  
  type GetSavedLocationResponse = SaveLocationDto[];