import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromAuthActions from '@web/app/auth/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutAuthEffects {

  @Effect({ dispatch: false })
  auth$ = this.actions$.pipe(
    ofType(
      fromAuthActions.AuthActionTypes.Auth,
      fromAuthActions.AuthActionTypes.CheckAuth
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  authSuccess$ = this.actions$.pipe(
    ofType(
      fromAuthActions.AuthActionTypes.AuthSuccess,
      fromAuthActions.AuthActionTypes.CheckAuthSuccess
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  authFailure$ = this.actions$.pipe(
    ofType(
      fromAuthActions.AuthActionTypes.AuthFailure,
      fromAuthActions.AuthActionTypes.CheckAuthFailure
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
