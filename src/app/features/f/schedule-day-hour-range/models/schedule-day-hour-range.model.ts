import { ScheduleDay } from '@web/app/features/f/schedule-day/models/schedule-day.model';
import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';

export interface ScheduleDayHourRange {
  schedule_day_hour_range_id?: number;
  schedule_day_hour_range_status?: boolean;
  schedule_day_id?: number;
  schedule_day?: ScheduleDay | null;
  hour_range_id?: number;
  hour_range?: HourRange | null;
  schedule_day_hour_range_created_at?: string;
  schedule_day_hour_range_updated_at?: string;
  schedule_day_hour_range_deleted_at?: string;
}
