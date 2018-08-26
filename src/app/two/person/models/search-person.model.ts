export interface SearchPerson {
  person?: {
    person_id?: string;
    person_identification?: string;
  };
  limit?: number;
  page?: number;
}
