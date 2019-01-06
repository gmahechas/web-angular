import { Estate } from '@web/app/features/a/estate/models/estate.model';

export interface SelectedEstate {
  selectedEntity: Estate | null;
}

export const initialStateSelectedEstate: SelectedEstate = {
  selectedEntity: null
};
