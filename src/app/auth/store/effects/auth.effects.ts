import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromStore from '@web/app/core/store';
import * as fromActions from '@web/app/auth/store/actions';

import * as fromModels from '@web/app/auth/models';

import { AuthService } from '@web/app/auth/services/auth.service';

import { of, defer } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  auth$ = this.actions$.pipe(
    ofType<fromActions.Auth>(fromActions.AuthActionTypes.Auth),
    map(action => action.payload.auth),
    switchMap((auth: fromModels.Auth) =>
      this.authService.login(auth).pipe(
        map(({ token, user, company }) => new fromActions.AuthSuccess({ token, user, company })),
        catchError(error => of(new fromActions.AuthFailure({ error })))
      )
    ));

  @Effect({ dispatch: false })
  authSuccess$ = this.actions$.pipe(
    ofType<fromActions.AuthSuccess>(fromActions.AuthActionTypes.AuthSuccess),
    map(action => action.payload),
    tap(({ token, user, company }) => {
      this.authService.setToken(token);
      this.store.dispatch(new fromStore.Go({
        path: ['dashboard']
      }));
    })
  );

  @Effect()
  checkAuth$ = this.actions$.pipe(
    ofType<fromActions.CheckAuth>(fromActions.AuthActionTypes.CheckAuth),
    switchMap(() => {
      return this.authService.checkAuth().pipe(
        map(({ data }) => new fromActions.CheckAuthSuccess(data)),
        catchError(error => of(new fromActions.CheckAuthFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  checkAuthSuccess$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.CheckAuthSuccess),
    tap(() => {
      this.store.dispatch(new fromStore.Go({
        path: ['dashboard']
      }));
    })
  );

  @Effect({ dispatch: false })
  checkAuthFailure$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.CheckAuthFailure),
    tap(() => {
      this.authService.removeToken();
      this.store.dispatch(new fromStore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  authRedirect$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.AuthRedirect),
    tap(() => {
      this.store.dispatch(new fromStore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  init$ = defer(() => {
    return of(this.authService.getToken());
  }).pipe(
    tap((token: fromModels.Token) => {
      if (token) {
        this.store.dispatch(new fromActions.CheckAuth);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<fromStore.State>
  ) { }
}
