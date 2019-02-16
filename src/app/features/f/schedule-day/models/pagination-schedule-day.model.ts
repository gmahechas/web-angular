import { ScheduleDay } from '@web/app/features/f/schedule-day/models/schedule-day.model';

export interface PaginationScheduleDay {
  paginationScheduleDay: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: ScheduleDay[];
};
}
