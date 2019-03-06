import { Country } from '@web/app/features/a/country/models/country.model';

export interface SelectedCountry {
  selectedEntity?: Country | null;
}

export const initialStateSelectedCountry: SelectedCountry = {
  selectedEntity: null
};
