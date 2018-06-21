import { Country } from './../../country/models/country.model';

export interface Estate {
  estate_id?: number;
  estate_code?: string;
  estate_name?: string;
  estate_created_at?: string;
  estate_updated_at?: string;
  estate_deleted_at?: string;
  country_id?: number;
  country: Country;
}
