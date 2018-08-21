import { Office } from './office.model';

export interface PaginationOffice {
  paginationOffice: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Office[];
};
}
