import { Profile } from '@web/app/features/c/profile/models/profile.model';
import { Person } from '@web/app/features/c/person/models/person.model';

export interface  User {
  user_id?: number;
  username?: string;
  password?: string;
  person_id?: number;
  person?: Person;
  profile_id?: number;
  profile?: Profile;
  user_created_at?: string;
  user_updated_at?: string;
  user_deleted_at?: string;
}
