import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromDayActions from '@web/app/features/f/day/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutDayEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromDayActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromDayActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  fail$ = this.actions$.pipe(
    ofType(
      fromDayActions.EntityActionTypes.LoadFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
      this.store.dispatch(new fromCore.ShowMessages({
        messages: [
          { severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error.', key: 'toast' }
        ]
      }));
    })
  );

  // Redirects
  @Effect({ dispatch: false })
  successRedirect$ = this.actions$.pipe(
    ofType(
      fromDayActions.EntityActionTypes.ResetSearch
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['day'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
