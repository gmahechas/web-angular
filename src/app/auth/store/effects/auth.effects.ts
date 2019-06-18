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
      ofType<fromAuthActions.Auth>(fromAuthActions.AuthActionTypes.Auth),
      map(action => action.payload.auth),
      switchMap((auth: fromModels.Auth) =>
        this.authService.login(auth).pipe(
          map(({ token, user, company }) => new fromAuthActions.AuthSuccess({ token, user, company })),
          catchError(error => of(new fromAuthActions.AuthFailure({ error })))
        )
      )
    )
  );

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.AuthSuccess>(fromAuthActions.AuthActionTypes.AuthSuccess),
      map(action => action.payload),
      tap(({ token, user, company }) => {
        this.localStorageService.setToken(token);
        this.store.dispatch(new fromCore.Go({
          path: ['dashboard']
        }));
      })
    ),
    { dispatch: false }
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.CheckAuth>(fromAuthActions.AuthActionTypes.CheckAuth),
      switchMap(() => {
        return this.authService.checkAuth().pipe(
          map(({ data }) => new fromAuthActions.CheckAuthSuccess(data)),
          catchError((error) => of(new fromAuthActions.CheckAuthFailure({ error })))
        );
      })
    )
  );

  checkAuthFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActionTypes.CheckAuthFailure),
      tap(() => {
        this.localStorageService.removeToken();
        this.store.dispatch(new fromCore.Go({
          path: ['auth']
        }));
      })
    ),
    { dispatch: false }
  );

  logoutAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromAuthActions.LogoutAuth>(fromAuthActions.AuthActionTypes.LogoutAuth),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(({ data }) => new fromAuthActions.LogoutAuthSuccess()),
          catchError((error) => of(new fromAuthActions.LogoutAuthFailure({ error })))
        );
      })
    )
  );

  logoutAuthSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActionTypes.LogoutAuthSuccess),
      tap(() => {
        this.localStorageService.removeToken();
        this.localStorageService.setUserOffice(null);
        this.localStorageService.setUserOfficeProject(null);
        this.store.dispatch(new fromCore.Go({
          path: ['auth']
        }));
      })
    ),
    { dispatch: false }
  );

  logoutAuthFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActionTypes.LogoutAuthFailure),
      tap(() => {
        this.localStorageService.removeToken();
        this.localStorageService.setUserOffice(null);
        this.localStorageService.setUserOfficeProject(null);
        this.store.dispatch(new fromCore.Go({
          path: ['auth']
        }));
      })
    ),
    { dispatch: false }
  );

  authRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActionTypes.AuthRedirect),
      tap(() => {
        this.store.dispatch(new fromCore.Go({
          path: ['auth']
        }));
      })
    ),
    { dispatch: false }
  );

  expiredAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActionTypes.ExpiredAuth),
      tap(() => {
        this.localStorageService.removeToken();
        this.store.dispatch(new fromCore.Go({
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
          this.store.dispatch(new fromAuthActions.CheckAuth());
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
