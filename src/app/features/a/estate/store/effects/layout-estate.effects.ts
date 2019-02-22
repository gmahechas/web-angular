import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromEstateActions from '@web/app/features/a/estate/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutEstateEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromEstateActions.EntityActionTypes.LoadEntity,
      fromEstateActions.EntityActionTypes.StoreEntity,
      fromEstateActions.EntityActionTypes.UpdateEntity,
      fromEstateActions.EntityActionTypes.DestroyEntity,
      fromEstateActions.EntityActionTypes.PaginateEntity,
      fromEstateActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromEstateActions.EntityActionTypes.LoadSuccessEntity,
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromEstateActions.EntityActionTypes.StoreSuccessEntity,
      fromEstateActions.EntityActionTypes.UpdateSuccessEntity,
      fromEstateActions.EntityActionTypes.DestroySuccessEntity
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
      fromEstateActions.EntityActionTypes.LoadFailEntity,
      fromEstateActions.EntityActionTypes.StoreFailEntity,
      fromEstateActions.EntityActionTypes.UpdateFailEntity,
      fromEstateActions.EntityActionTypes.DestroyFailEntity
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
      fromEstateActions.EntityActionTypes.LoadEntity,
      fromEstateActions.EntityActionTypes.StoreSuccessEntity,
      fromEstateActions.EntityActionTypes.UpdateSuccessEntity,
      fromEstateActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['estate'] }));
    })
  );

  @Effect({ dispatch: false })
  reset$ = this.actions$.pipe(
    ofType(fromEstateActions.EntityActionTypes.Reset),
    map((action: fromEstateActions.Reset) => action.payload),
    tap(({ redirect }) => {
      if (redirect) {
        this.store.dispatch(new fromCore.Go({ path: ['estate'] }));
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
