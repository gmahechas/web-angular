import { Schedule } from '@web/app/features/f/schedule/models/schedule.model';
import { Day } from '@web/app/features/f/day/models/day.model';

export interface ScheduleDay {
  schedule_day_id?: number;
  schedule_day_status?: boolean;
  schedule_id?: number;
  schedule?: Schedule;
  day_id?: number;
  day?: Day;
  schedule_day_created_at?: string;
  schedule_day_updated_at?: string;
  schedule_day_deleted_at?: string;
}
