import { Profile } from '@web/app/features/c/profile/models/profile.model';

export interface SelectedProfile {
  selectedEntity: Profile | null;
}

export const initialStateSelectedProfile: SelectedProfile = {
  selectedEntity: null
};
