import { City } from '@web/app/features/a/city/models/city.model';

export interface Company {
  company_id?: number;
  company_name?: string;
  company_identification?: string;
  city_id?: number;
  city?: City;
  company_created_at?: string;
  company_updated_at?: string;
  company_deleted_at?: string;
}
