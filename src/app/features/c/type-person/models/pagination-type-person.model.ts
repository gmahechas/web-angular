import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';

export interface PaginationTypePerson {
  paginationTypePerson: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: TypePerson[];
};
}
