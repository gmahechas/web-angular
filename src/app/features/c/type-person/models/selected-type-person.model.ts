import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';

export interface SelectedTypePerson {
  selectedEntity?: TypePerson | null;
}

export const initialStateSelectedTypePerson: SelectedTypePerson = {
  selectedEntity: null
};
