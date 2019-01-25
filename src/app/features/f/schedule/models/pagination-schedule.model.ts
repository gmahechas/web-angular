import { Schedule } from '@web/app/features/f/schedule/models/schedule.model';

export interface PaginationSchedule {
  paginationSchedule: {
    total?: number;
    per_page?: number;
    current_page?: number;
    from?: number;
    to?: number;
    data?: Schedule[];
};
}
