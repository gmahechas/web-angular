import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';
import { TypePersonIdentification } from '@web/app/features/c/type-person-identification/models/type-person-identification.model';
import { City } from '@web/app/features/a/city/models/city.model';

export interface Person {
  person_id?: number;
  person_identification?: string;
  person_first_name?: string;
  person_second_name?: string;
  person_first_surname?: string;
  person_second_surname?: string;
  person_legal_name?: string;
  person_created_at?: string;
  person_updated_at?: string;
  person_deleted_at?: string;
  type_person_id?: number;
  type_person?: TypePerson;
  type_person_identification_id?: number;
  type_person_identification?: TypePersonIdentification;
  city_id?: number;
  city?: City;
}
