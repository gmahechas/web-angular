import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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

  auth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.Auth),
      map(action => action.auth),
      switchMap((auth: fromModels.Auth) =>
        this.authService.login(auth).pipe(
          map(({ token, user, company }) => fromAuthActions.AuthActions.AuthSuccess({ token, user, company })),
          catchError(error => of(fromAuthActions.AuthActions.AuthFailure({ error })))
        )
      )
    )
  );

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.AuthSuccess),
      tap(({ token, user, company }) => {
        this.localStorageService.setToken(token);
        this.store.dispatch(fromCore.RouterActions.Go({
          path: ['dashboard']
        }));
      })
    ),
    { dispatch: false }
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.CheckAuth),
      switchMap(() => {
        return this.authService.checkAuth().pipe(
          map(({ data }) => fromAuthActions.AuthActions.CheckAuthSuccess({ auth: data })),
          catchError((error) => of(fromAuthActions.AuthActions.CheckAuthFailure({ error })))
        );
      })
    )
  );

  checkAuthFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.CheckAuthFailure),
      tap(() => {
        this.localStorageService.removeToken();
        this.store.dispatch(fromCore.RouterActions.Go({
          path: ['auth']
        }));
      })
    ),
    { dispatch: false }
  );

  logoutAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.LogoutAuth),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(({ data }) => fromAuthActions.AuthActions.LogoutAuthSuccess()),
          catchError((error) => of(fromAuthActions.AuthActions.LogoutAuthFailure({ error })))
        );
      })
    )
  );

  logoutAuthSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.LogoutAuthSuccess),
      tap(() => {
        this.localStorageService.removeToken();
        this.localStorageService.setUserOffice(null);
        this.localStorageService.setUserOfficeProject(null);
        this.store.dispatch(fromCore.RouterActions.Go({
          path: ['auth']
        }));
      })
    ),
    { dispatch: false }
  );

  logoutAuthFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.LogoutAuthFailure),
      tap(() => {
        this.localStorageService.removeToken();
        this.localStorageService.setUserOffice(null);
        this.localStorageService.setUserOfficeProject(null);
        this.store.dispatch(fromCore.RouterActions.Go({
          path: ['auth']
        }));
      })
    ),
    { dispatch: false }
  );

  authRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.AuthRedirect),
      tap(() => {
        this.store.dispatch(fromCore.RouterActions.Go({
          path: ['auth']
        }));
      })
    ),
    { dispatch: false }
  );

  expiredAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.ExpiredAuth),
      tap(() => {
        this.localStorageService.removeToken();
        this.store.dispatch(fromCore.RouterActions.Go({
          path: ['auth']
        }));
      })
    ),
    { dispatch: false }
  );


  init$ = createEffect(
    () => defer(() => {
      return of(this.localStorageService.getToken());
    }).pipe(
      tap((token: fromModels.Token) => {
        if (token) {
          this.store.dispatch(fromAuthActions.AuthActions.CheckAuth());
        }
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store<fromCore.State>
  ) { }
}
