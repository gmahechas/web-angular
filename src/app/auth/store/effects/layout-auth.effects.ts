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
        fromAuthActions.AuthActionTypes.Auth,
        fromAuthActions.AuthActionTypes.CheckAuth
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: true }));
      })
    ),
    { dispatch: false }
  );

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAuthActions.AuthActionTypes.AuthSuccess,
        fromAuthActions.AuthActionTypes.CheckAuthSuccess
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
      })
    ),
    { dispatch: false }
  );

  authFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromAuthActions.AuthActionTypes.AuthFailure,
        fromAuthActions.AuthActionTypes.CheckAuthFailure
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
