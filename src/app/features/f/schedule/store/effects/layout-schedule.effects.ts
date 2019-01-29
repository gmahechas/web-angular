import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromScheduleActions from '@web/app/features/f/schedule/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutScheduleEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromScheduleActions.EntityActionTypes.LoadEntity,
      fromScheduleActions.EntityActionTypes.StoreEntity,
      fromScheduleActions.EntityActionTypes.UpdateEntity,
      fromScheduleActions.EntityActionTypes.DestroyEntity,
      fromScheduleActions.EntityActionTypes.PaginateEntity,
      fromScheduleActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromScheduleActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromScheduleActions.EntityActionTypes.StoreSuccessEntity,
      fromScheduleActions.EntityActionTypes.UpdateSuccessEntity,
      fromScheduleActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
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
      fromScheduleActions.EntityActionTypes.LoadFailEntity,
      fromScheduleActions.EntityActionTypes.StoreFailEntity,
      fromScheduleActions.EntityActionTypes.UpdateFailEntity,
      fromScheduleActions.EntityActionTypes.DestroyFailEntity
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
      fromScheduleActions.EntityActionTypes.LoadEntity,
      fromScheduleActions.EntityActionTypes.StoreSuccessEntity,
      fromScheduleActions.EntityActionTypes.UpdateSuccessEntity,
      fromScheduleActions.EntityActionTypes.DestroySuccessEntity,
      fromScheduleActions.EntityActionTypes.Reset
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['schedule'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) {}
}
