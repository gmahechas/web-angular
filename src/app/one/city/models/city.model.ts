import { Estate } from '@app/app/one/estate/models/estate.model';

export interface City {
  city_id?: number;
  city_name?: string;
  city_code?: string;
  city_created_at?: string;
  city_updated_at?: string;
  city_deleted_at?: string;
  estate_id?: number;
  estate?: Estate;
}
