import { TypePersonIdentification } from '@web/app/features/c/type-person-identification/models/type-person-identification.model';

export interface PaginationTypePersonIdentification {
  paginationTypePersonIdentification: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: TypePersonIdentification[];
};
}
