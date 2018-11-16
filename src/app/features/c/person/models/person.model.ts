import { City } from '@web/app/features/a/city/models/city.model';

export interface Person {
  person_id?: number;
  person_business_type?: string;
  person_identification_type?: string;
  person_identification?: string;
  person_first_name?: string;
  person_second_name?: string;
  person_first_surname?: string;
  person_second_surname?: string;
  person_legal_name?: string;
  person_created_at?: string;
  person_updated_at?: string;
  person_deleted_at?: string;
  city_id?: number;
  city?: City;
}
