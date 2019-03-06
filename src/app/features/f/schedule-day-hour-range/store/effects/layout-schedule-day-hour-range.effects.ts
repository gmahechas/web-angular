import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromScheduleDayHourRangeActions from '@web/app/features/f/schedule-day-hour-range/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutScheduleDayHourRangeEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromScheduleDayHourRangeActions.EntityActionTypes.LoadEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.StoreEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.UpdateEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.DestroyEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.PaginateEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromScheduleDayHourRangeActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromScheduleDayHourRangeActions.EntityActionTypes.StoreSuccessEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.UpdateSuccessEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.DestroySuccessEntity
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
      fromScheduleDayHourRangeActions.EntityActionTypes.LoadFailEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.StoreFailEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.UpdateFailEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.DestroyFailEntity
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
      fromScheduleDayHourRangeActions.EntityActionTypes.LoadEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.StoreSuccessEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.UpdateSuccessEntity,
      fromScheduleDayHourRangeActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['schedule_day_hour_range'] }));
    })
  );

  @Effect({ dispatch: false })
  reset$ = this.actions$.pipe(
    ofType(fromScheduleDayHourRangeActions.EntityActionTypes.Reset),
    map((action: fromScheduleDayHourRangeActions.Reset) => action.payload),
    tap(({ redirect }) => {
      if (redirect) {
        this.store.dispatch(new fromCore.Go({ path: ['schedule_day_hour_range'] }));
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
