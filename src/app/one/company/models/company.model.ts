import { City } from './../../city/models/city.model';

export interface Company {
  company_id?: number;
  company_name?: string;
  company_identification?: string;
  company_created_at?: string;
  company_updated_at?: string;
  company_deleted_at?: string;
  city_id?: number;
  city?: City;
}
