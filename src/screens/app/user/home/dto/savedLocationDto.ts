export class SaveLocationDto {
  lat?: number = 0;
  lng?: number = 0;
  address: string = 'Set Location';
  lga?: string = '';
  state?: string = '';
  description?: string = '';
  default?: boolean = false;
  uuid?: string = '';
  utilityBill?: string = '';
  stateCode?: string = '';

  constructor(data?: Partial<SaveLocationDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
