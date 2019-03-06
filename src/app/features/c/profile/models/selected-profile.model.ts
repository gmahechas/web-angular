import { Profile } from '@web/app/features/c/profile/models/profile.model';

export interface SelectedProfile {
  selectedEntity?: Profile | null;
  gotoProfileMenu?: boolean;
}

export const initialStateSelectedProfile: SelectedProfile = {
  selectedEntity: null,
  gotoProfileMenu: false
};
