import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromStore from '@web/app/core/store';
import * as fromActions from '@web/app/auth/store/actions';

import * as fromModels from '@web/app/auth/models';

import { AuthService } from '@web/app/auth/services/auth.service';

import { of, defer } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(action => action.payload.auth),
    exhaustMap((auth: fromModels.Auth) =>
      this.authService.login(auth).pipe(
        map(({ token, user }) => new fromActions.LoginSuccess({ token, user })),
        catchError(errors => of(new fromActions.LoginFailure({ errors })))
      )
    ));

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType<fromActions.LoginSuccess>(fromActions.AuthActionTypes.LoginSuccess),
    map(action => action.payload),
    tap(({ token, user }) => {
      this.authService.setToken(token);
      this.store.dispatch(new fromStore.Go({
        path: ['dashboard']
      }));
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.LoginRedirect),
    tap(() => {
      this.authService.removeToken();
      this.store.dispatch(new fromStore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.Logout),
    tap(authed => {
      this.authService.removeToken();
      this.store.dispatch(new fromStore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect()
  refreshToken$ = this.actions$.pipe(
    ofType<fromActions.RefreshToken>(fromActions.AuthActionTypes.RefreshToken),
    map(action => action.payload),
    exhaustMap((token: fromModels.Token) =>
      this.authService.refreshToken(token).pipe(
        map((newToken: fromModels.Token) => new fromActions.RefreshTokenSuccess(newToken)),
        catchError((errors) => {
          return of(new fromActions.RefreshTokenFailure(errors));
        })
      )
    ));

  @Effect({ dispatch: false })
  refreshTokenSuccess$ = this.actions$.pipe(
    ofType<fromActions.RefreshTokenSuccess>(fromActions.AuthActionTypes.RefreshTokenSuccess),
    map(action => action.payload),
    tap((token: fromModels.Token) => {
      this.authService.setToken(token);
    })
  );

  @Effect({ dispatch: false })
  init$ = defer(() => {
    return of(this.authService.getToken());
  }).pipe(
    tap((token: fromModels.Token) => console.log(token))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<fromStore.State>
  ) { }
}
