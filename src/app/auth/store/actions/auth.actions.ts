import { createAction, props } from '@ngrx/store';

import * as fromModels from '@web/app/auth/models';
import { User } from '@web/app/features/c/user/models/user.model';
import { Company } from '@web/app/features/b/company/models/company.model';

export const Auth = createAction(
  '[Auth] Auth',
  props<{ auth: fromModels.Auth }>()
);

export const AuthSuccess = createAction(
  '[Auth] Auth Success',
  props<{ token: fromModels.Token, user: User, company: Company }>()
);

export const AuthFailure = createAction(
  '[Auth] Auth Failure',
  props<{ error: any }>()
);

export const CheckAuth = createAction(
  '[Auth] Check Auth'
);

export const CheckAuthSuccess = createAction(
  '[Auth] Check Auth Success',
  props<{ auth: fromModels.CheckAuth }>()
);

export const CheckAuthFailure = createAction(
  '[Auth] Check Auth Failure',
  props<{ error: any }>()
);

export const LogoutAuth = createAction(
  '[Auth] Logout Auth'
);

export const LogoutAuthSuccess = createAction(
  '[Auth] Logout Auth Success'
);

export const LogoutAuthFailure = createAction(
  '[Auth] Logout Auth Failure',
  props<{ error: any }>()
);

export const AuthRedirect = createAction(
  '[Auth] Auth Redirect'
);

export const ExpiredAuth = createAction(
  '[Auth] Expired Auth'
);
