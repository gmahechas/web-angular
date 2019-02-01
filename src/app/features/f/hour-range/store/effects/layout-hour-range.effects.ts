import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromHourRangeActions from '@web/app/features/f/hour-range/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutHourRangeEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromHourRangeActions.EntityActionTypes.LoadEntity,
      fromHourRangeActions.EntityActionTypes.StoreEntity,
      fromHourRangeActions.EntityActionTypes.UpdateEntity,
      fromHourRangeActions.EntityActionTypes.DestroyEntity,
      fromHourRangeActions.EntityActionTypes.PaginateEntity,
      fromHourRangeActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromHourRangeActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromHourRangeActions.EntityActionTypes.StoreSuccessEntity,
      fromHourRangeActions.EntityActionTypes.UpdateSuccessEntity,
      fromHourRangeActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
      this.store.dispatch(new fromCore.ShowMessages({
        messages: [
          { severity: 'success', summary: 'Exito', detail: 'Se llevo a cabo', key: 'toast' }
        ]
      }));
    })
  );

  @Effect({ dispatch: false })
  fail$ = this.actions$.pipe(
    ofType(
      fromHourRangeActions.EntityActionTypes.LoadFailEntity,
      fromHourRangeActions.EntityActionTypes.StoreFailEntity,
      fromHourRangeActions.EntityActionTypes.UpdateFailEntity,
      fromHourRangeActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
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
      fromHourRangeActions.EntityActionTypes.LoadEntity,
      fromHourRangeActions.EntityActionTypes.StoreSuccessEntity,
      fromHourRangeActions.EntityActionTypes.UpdateSuccessEntity,
      fromHourRangeActions.EntityActionTypes.DestroySuccessEntity,
      fromHourRangeActions.EntityActionTypes.Reset
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['hour_range'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) {}
}
