import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AuthActions, AuthActionTypes, Login, LoginSuccess, LoginFailure } from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import { Auth } from './../../models/auth.model';
import { Token } from '../../models/token.model';

import { of } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: Auth) =>
      this.authService
        .login(auth)
        .pipe(
          map(((token: Token) => new LoginSuccess(token)),
            catchError(error => of(new LoginFailure(error)))
          )
        )
    ));

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    map(action => action.payload),
    tap((token: Token) => {
      this.authService.setToken(token);
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect),
    tap(authed => {
      this.authService.removeToken();
      this.router.navigate(['/auth']);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(authed => {
      this.authService.removeToken();
      this.router.navigate(['/auth']);
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) { }
}
