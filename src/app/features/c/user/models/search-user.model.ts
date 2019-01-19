import { Profile } from '@web/app/features/c/profile/models/profile.model';
import { Person } from '@web/app/features/c/person/models/person.model';

export interface SearchUser {
  user?: {
    user_id?: string;
    username?: string;
  };
  person?: Person | null;
  profile?: Profile | null;
  limit?: number;
  page?: number;
}
