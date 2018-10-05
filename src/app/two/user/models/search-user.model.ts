import { Profile } from '@app/app/two/profile/models/profile.model';
import { Person } from '@app/app/two/person/models/person.model';

export interface SearchUser {
  user?: {
    user_id?: string;
    username?: string;
    email?: string;
  };
  person?: Person | null;
  profile?: Profile | null;
  limit?: number;
  page?: number;
}
