import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';

export interface SelectedHourRange {
  selectedEntity?: HourRange | null;
}

export const initialStateSelectedHourRange: SelectedHourRange = {
  selectedEntity: null
};
