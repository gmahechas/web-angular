import { ScheduleDay } from '@web/app/features/f/schedule-day/models/schedule-day.model';

export interface SelectedScheduleDay {
  selectedEntity?: ScheduleDay | null;
}

export const initialStateSelectedScheduleDay: SelectedScheduleDay = {
  selectedEntity: null
};
