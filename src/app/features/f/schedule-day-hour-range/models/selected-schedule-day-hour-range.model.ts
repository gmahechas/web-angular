import { ScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/schedule-day-hour-range.model';

export interface SelectedScheduleDayHourRange {
  selectedEntity: ScheduleDayHourRange | null;
}

export const initialStateSelectedScheduleDayHourRange: SelectedScheduleDayHourRange = {
  selectedEntity: null
};
