import { Office } from '@web/app/features/b/office/models';

export interface SelectedOffice {
  selectedEntity: Office | null;
  gotoUserOffice: boolean;
}

export const initialStateSelected: SelectedOffice = {
  selectedEntity: null,
  gotoUserOffice: false
};
