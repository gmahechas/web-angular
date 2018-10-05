import { Action } from '@ngrx/store';
import { Auth } from '@web/app/auth/models/auth.model';
import { Token } from '@web/app/auth/models/token.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  Logout = '[Auth] Logout',
  RefreshToken = '[Auth] Refresh Token',
  RefreshTokenSuccess = '[Auth] Refresh Token Success',
  RefreshTokenFailure = '[Auth] Refresh Token Failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: Auth) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: Token) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(public payload: string) { }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class RefreshToken implements Action {
  readonly type = AuthActionTypes.RefreshToken;
  constructor(public payload: Token) { }
}

export class RefreshTokenSuccess implements Action {
  readonly type = AuthActionTypes.RefreshTokenSuccess;
  constructor(public payload: Token) { }
}

export class RefreshTokenFailure implements Action {
  readonly type = AuthActionTypes.RefreshTokenFailure;
  constructor(public payload: string) { }
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | RefreshToken
  | RefreshTokenSuccess
  | RefreshTokenFailure;
