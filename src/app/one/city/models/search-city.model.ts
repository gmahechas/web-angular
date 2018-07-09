import { Estate } from './../../estate/models/estate.model';

export interface SearchCity {
  city?: {
    city_id?: string;
    city_name?: string;
    city_code?: string;
  };
  estate?: Estate;
  limit?: number;
  page?: number;
}
