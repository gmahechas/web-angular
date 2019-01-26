import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';

export interface PaginationHourRange {
  paginationHourRange: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: HourRange[];
};
}
