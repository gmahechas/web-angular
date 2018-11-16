import { User } from '@web/app/features/c/user/models';
import { Company } from '@web/app/features/b/company/models/company.model';

export interface CheckAuth {
  checkAuth: {
    user: User;
    company: Company;
  };
}
