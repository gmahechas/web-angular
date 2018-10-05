import { Estate } from '@app/app/one/estate/models/estate.model';

export interface SearchCity {
  city?: {
    city_id?: string;
    city_name?: string;
    city_code?: string;
  };
  estate?: Estate | null;
  limit?: number;
  page?: number;
}
