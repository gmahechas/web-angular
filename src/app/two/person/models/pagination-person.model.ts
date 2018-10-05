import { Person } from '@app/app/two/person/models/person.model';

export interface PaginationPerson {
  paginationPerson: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Person[];
};
}
