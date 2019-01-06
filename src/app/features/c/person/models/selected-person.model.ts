import { Person } from '@web/app/features/c/person/models/person.model';

export interface SelectedPerson {
  selectedEntity: Person | null;
}

export const initialStateSelectedPerson: SelectedPerson = {
  selectedEntity: null
};
