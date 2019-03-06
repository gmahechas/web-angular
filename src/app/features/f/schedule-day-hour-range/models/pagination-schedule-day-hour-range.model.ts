import { ScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/schedule-day-hour-range.model';

export interface PaginationScheduleDayHourRange {
  paginationScheduleDayHourRange: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: ScheduleDayHourRange[];
};
}
