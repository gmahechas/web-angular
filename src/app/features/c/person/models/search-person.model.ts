export interface SearchPerson {
  person?: {
    person_id?: string;
    person_identification?: string;
    person_names?: string;
  };
  limit?: number;
  page?: number;
}
