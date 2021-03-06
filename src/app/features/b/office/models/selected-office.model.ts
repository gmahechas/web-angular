import { Office } from '@web/app/features/b/office/models/office.model';

export interface SelectedOffice {
  selectedEntity?: Office | null;
  gotoUserOffice?: boolean;
  gotoOfficeDeparment?: boolean;
}

export const initialStateSelectedOffice: SelectedOffice = {
  selectedEntity: null,
  gotoUserOffice: false,
  gotoOfficeDeparment: false
};
