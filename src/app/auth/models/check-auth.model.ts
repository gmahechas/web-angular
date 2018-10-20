import { User } from '@web/app/two/user/models';
import { Company } from '@web/app/one/company/models/company.model';

export interface CheckAuth {
  checkAuth: {
    user: User;
    company: Company;
  };
}
