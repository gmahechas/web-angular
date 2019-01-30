import { Day } from '@web/app/features/f/day/models/day.model';

export interface SelectedDay {
  selectedEntity: Day | null;
}

export const initialStateSelectedDay: SelectedDay = {
  selectedEntity: null
};
