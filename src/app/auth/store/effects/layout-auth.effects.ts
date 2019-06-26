import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromAuthActions from '@web/app/auth/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutAuthEffects {

  auth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAuthActions.AuthActions.Auth,
        fromAuthActions.AuthActions.CheckAuth
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: true }));
      })
    ),
    { dispatch: false }
  );

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAuthActions.AuthActions.AuthSuccess,
        fromAuthActions.AuthActions.CheckAuthSuccess
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: false }));
      })
    ),
    { dispatch: false }
  );

  authFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAuthActions.AuthActions.AuthFailure,
        fromAuthActions.AuthActions.CheckAuthFailure
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: false }));
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
