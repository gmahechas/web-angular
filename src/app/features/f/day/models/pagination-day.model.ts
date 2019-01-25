import { Day } from '@web/app/features/f/day/models/day.model';

export interface PaginationDay {
  paginationDay: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Day[];
};
}
