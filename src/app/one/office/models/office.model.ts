import { Company } from './../../company/models/company.model';
import { City } from '../../city/models';

export interface Office {
  office_id?: number;
  office_name?: string;
  office_created_at?: string;
  office_updated_at?: string;
  office_deleted_at?: string;
  company_id?: number;
  company?: Company;
  city_id?: number;
  city: City;
}
