import { Estate } from '@web/app/features/a/estate/models/estate.model';

export interface City {
  city_id?: number;
  city_name?: string;
  city_code?: string;
  estate_id?: number;
  estate?: Estate;
  city_created_at?: string;
  city_updated_at?: string;
  city_deleted_at?: string;
}
