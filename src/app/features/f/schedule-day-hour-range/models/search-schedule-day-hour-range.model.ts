import { ScheduleDay } from '@web/app/features/f/schedule-day/models/schedule-day.model';
import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';

export interface SearchScheduleDayHourRange {
  schedule_day_hour_range?: {
    schedule_day_hour_range_id?: string;
    schedule_day_hour_range_status?: boolean | null;
  };
  schedule_day?: ScheduleDay;
  hour_range?: HourRange;
  limit?: number;
  page?: number;
}
