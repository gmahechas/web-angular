import { Profile } from './../../profile/models/profile.model';
import { Person } from './../../person/models/person.model';

export interface SearchUser {
  user?: {
    user_id?: string;
    username?: string;
    email?: string;
  };
  person?: Person;
  profile?: Profile;
  limit?: number;
  page?: number;
}
