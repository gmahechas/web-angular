import { Country } from '@web/app/features/a/country/models/country.model';

export interface Estate {
  estate_id?: number;
  estate_code?: string;
  estate_name?: string;
  country_id?: number;
  country?: Country;
  estate_created_at?: string;
  estate_updated_at?: string;
  estate_deleted_at?: string;
}
