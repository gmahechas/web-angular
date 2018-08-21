import { City } from './../../city/models/city.model';

export interface SearchOffice {
  office?: {
    office_id?: string;
    office_name?: string;
  };
  city?: City;
  limit?: number;
  page?: number;
}
