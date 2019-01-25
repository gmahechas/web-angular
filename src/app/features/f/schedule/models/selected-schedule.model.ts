import { Schedule } from '@web/app/features/f/schedule/models/schedule.model';

export interface SelectedSchedule {
  selectedEntity: Schedule | null;
}

export const initialStateSelectedSchedule: SelectedSchedule = {
  selectedEntity: null
};
