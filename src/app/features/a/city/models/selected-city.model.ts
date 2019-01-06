import { City } from '@web/app/features/a/city/models/city.model';

export interface SelectedCity {
  selectedEntity: City | null;
}

export const initialStateSelectedCity: SelectedCity = {
  selectedEntity: null
};
