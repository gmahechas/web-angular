import { Country } from '../../country/models';

export interface SearchEstate {
  estate?: {
    estate_id?: string;
    estate_name?: string;
    estate_code?: string;
  };
  country?: Country;
  limit?: number;
  page?: number;
}
