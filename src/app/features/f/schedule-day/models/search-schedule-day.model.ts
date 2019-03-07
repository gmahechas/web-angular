import { Schedule } from '@web/app/features/f/schedule/models/schedule.model';
import { Day } from '@web/app/features/f/day/models/day.model';

export interface SearchScheduleDay {
  schedule_day?: {
    schedule_day_id?: string;
    schedule_day_status?: boolean | null;
  };
  schedule?: Schedule | null;
  day?: Day | null;
  limit?: number;
  page?: number;
}
