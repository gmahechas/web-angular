import { User } from '@web/app/features/c/user/models/user.model';
import { Office } from '@web/app/features/b/office/models/office.model';

export interface SearchUserOffice {
  user_office?: {
    user_office_id?: string;
    user_office_status?: string;
  };
  user?: User | null;
  office?: Office | null;
  limit?: number;
  page?: number;
}
