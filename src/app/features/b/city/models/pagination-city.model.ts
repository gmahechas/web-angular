import { City } from '@web/app/features/b/city/models/city.model';

export interface PaginationCity {
  paginationCity: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: City[];
};
}
