import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromActions from '@web/app/auth/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutAuthEffects {

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType(
      fromActions.AuthActionTypes.Login
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(
      fromActions.AuthActionTypes.LoginSuccess
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$.pipe(
    ofType(
      fromActions.AuthActionTypes.LoginFailure
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
