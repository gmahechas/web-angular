import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromAuthActions from '@web/app/auth/store/actions';

import * as fromModels from '@web/app/auth/models';

import { AuthService } from '@web/app/auth/services/auth.service';
import { LocalStorageService } from '@web/app/core/services/local-storage.service';

import { of, defer } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  auth$ = this.actions$.pipe(
    ofType<fromAuthActions.Auth>(fromAuthActions.AuthActionTypes.Auth),
    map(action => action.payload.auth),
    switchMap((auth: fromModels.Auth) =>
      this.authService.login(auth).pipe(
        map(({ token, user, company }) => new fromAuthActions.AuthSuccess({ token, user, company })),
        catchError(error => of(new fromAuthActions.AuthFailure({ error })))
      )
    ));

  @Effect({ dispatch: false })
  authSuccess$ = this.actions$.pipe(
    ofType<fromAuthActions.AuthSuccess>(fromAuthActions.AuthActionTypes.AuthSuccess),
    map(action => action.payload),
    tap(({ token, user, company }) => {
      this.localStorageService.setToken(token);
      this.store.dispatch(new fromCore.Go({
        path: ['dashboard']
      }));
    })
  );

  @Effect()
  checkAuth$ = this.actions$.pipe(
    ofType<fromAuthActions.CheckAuth>(fromAuthActions.AuthActionTypes.CheckAuth),
    switchMap(() => {
      return this.authService.checkAuth().pipe(
        map(({ data }) => new fromAuthActions.CheckAuthSuccess(data)),
        catchError((error) => of(new fromAuthActions.CheckAuthFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  checkAuthSuccess$ = this.actions$.pipe(
    ofType(fromAuthActions.AuthActionTypes.CheckAuthSuccess),
    tap(() => {
      this.store.dispatch(new fromCore.Go({
        path: ['user-office', 'select']
      }));
    })
  );

  @Effect({ dispatch: false })
  checkAuthFailure$ = this.actions$.pipe(
    ofType(fromAuthActions.AuthActionTypes.CheckAuthFailure),
    tap(() => {
      this.localStorageService.removeToken();
      this.store.dispatch(new fromCore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect()
  logoutAuth$ = this.actions$.pipe(
    ofType<fromAuthActions.LogoutAuth>(fromAuthActions.AuthActionTypes.LogoutAuth),
    switchMap(() => {
      return this.authService.logout().pipe(
        map(({ data }) => new fromAuthActions.LogoutAuthSuccess()),
        catchError((error) => of(new fromAuthActions.LogoutAuthFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  logoutAuthSuccess$ = this.actions$.pipe(
    ofType(fromAuthActions.AuthActionTypes.LogoutAuthSuccess),
    tap(() => {
      this.localStorageService.removeToken();
      this.store.dispatch(new fromCore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  logoutAuthFailure$ = this.actions$.pipe(
    ofType(fromAuthActions.AuthActionTypes.LogoutAuthFailure),
    tap(() => {
      this.localStorageService.removeToken();
      this.store.dispatch(new fromCore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  authRedirect$ = this.actions$.pipe(
    ofType(fromAuthActions.AuthActionTypes.AuthRedirect),
    tap(() => {
      this.store.dispatch(new fromCore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  expiredAuth$ = this.actions$.pipe(
    ofType(fromAuthActions.AuthActionTypes.ExpiredAuth),
    tap(() => {
      this.localStorageService.removeToken();
      this.store.dispatch(new fromCore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  init$ = defer(() => {
    return of(this.localStorageService.getToken());
  }).pipe(
    tap((token: fromModels.Token) => {
      if (token) {
        this.store.dispatch(new fromAuthActions.CheckAuth);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store<fromCore.State>
  ) { }
}
