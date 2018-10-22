import { Action } from '@ngrx/store';

import * as fromModels from '@web/app/auth/models';
import { User } from '@web/app/two/user/models/user.model';
import { Company } from '@web/app/one/company/models/company.model';

export enum AuthActionTypes {
  Auth = '[Auth] Auth',
  AuthSuccess = '[Auth] Auth Success',
  AuthFailure = '[Auth] Auth Failure',
  CheckAuth = '[Auth] Check Auth',
  CheckAuthSuccess = '[Auth] Check Auth Success',
  CheckAuthFailure = '[Auth] Check Auth Failure',
  AuthRedirect = '[Auth] Auth Redirect',
  Logout = '[Auth] Logout',
}

export class Auth implements Action {
  readonly type = AuthActionTypes.Auth;
  constructor(public payload: { auth: fromModels.Auth }) { }
}

export class AuthSuccess implements Action {
  readonly type = AuthActionTypes.AuthSuccess;
  constructor(public payload: { token: fromModels.Token, user: User, company: Company }) { }
}

export class AuthFailure implements Action {
  readonly type = AuthActionTypes.AuthFailure;
  constructor(public payload: { error: any }) { }
}

export class CheckAuth implements Action {
  readonly type = AuthActionTypes.CheckAuth;
}

export class CheckAuthSuccess implements Action {
  readonly type = AuthActionTypes.CheckAuthSuccess;
  constructor(public payload: fromModels.CheckAuth) { }
}

export class CheckAuthFailure implements Action {
  readonly type = AuthActionTypes.CheckAuthFailure;
  constructor(public payload: { error: any }) { }
}

export class AuthRedirect implements Action {
  readonly type = AuthActionTypes.AuthRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions =
  | Auth
  | AuthSuccess
  | AuthFailure
  | CheckAuth
  | CheckAuthSuccess
  | CheckAuthFailure
  | AuthRedirect
  | Logout;
