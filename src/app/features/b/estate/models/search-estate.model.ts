import { Country } from '@web/app/features/b/country/models/country.model';

export interface SearchEstate {
  estate?: {
    estate_id?: string;
    estate_name?: string;
    estate_code?: string;
  };
  country?: Country | null;
  limit?: number;
  page?: number;
}
