import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';
import { TypePersonIdentification } from '@web/app/features/c/type-person-identification/models/type-person-identification.model';
import { City } from '@web/app/features/a/city/models/city.model';

export interface Person {
  person_id?: number;
  person_identification?: string;
  person_identification_date_issue?: string;
  person_first_name?: string;
  person_second_name?: string;
  person_first_surname?: string;
  person_second_surname?: string;
  person_legal_name?: string;
  person_address?: string;
  person_email?: string;
  person_phone?: string;
  type_person_id?: number;
  type_person?: TypePerson;
  type_person_identification_id?: number;
  type_person_identification?: TypePersonIdentification;
  city_issue_id?: number;
  city_issue?: City;
  city_location_id?: number;
  city_location?: City;
  person_created_at?: string;
  person_updated_at?: string;
  person_deleted_at?: string;
}
