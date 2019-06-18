import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromEstateActions from '@web/app/features/a/estate/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutEstateEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromEstateActions.EntityActionTypes.LoadEntity,
        fromEstateActions.EntityActionTypes.StoreEntity,
        fromEstateActions.EntityActionTypes.UpdateEntity,
        fromEstateActions.EntityActionTypes.DestroyEntity,
        fromEstateActions.EntityActionTypes.PaginateEntity,
        fromEstateActions.EntityActionTypes.LoadEntityShared
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: true }));
      })
    ),
    { dispatch: false }
  );

  loadSuccessEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromEstateActions.EntityActionTypes.LoadSuccessEntity,
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
      })
    ),
    { dispatch: false }
  );

  success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromEstateActions.EntityActionTypes.StoreSuccessEntity,
        fromEstateActions.EntityActionTypes.UpdateSuccessEntity,
        fromEstateActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
        this.store.dispatch(new fromCore.ShowMessages({
          messages: [
            { severity: 'success', summary: 'Exito', detail: 'Se llevo a cabo', key: 'toast' }
          ]
        }));
      })
    ),
    { dispatch: false }
  );

  fail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromEstateActions.EntityActionTypes.LoadFailEntity,
        fromEstateActions.EntityActionTypes.StoreFailEntity,
        fromEstateActions.EntityActionTypes.UpdateFailEntity,
        fromEstateActions.EntityActionTypes.DestroyFailEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
        this.store.dispatch(new fromCore.ShowMessages({
          messages: [
            { severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error.', key: 'toast' }
          ]
        }));
      })
    ),
    { dispatch: false }
  );

  // Redirects
  successRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromEstateActions.EntityActionTypes.LoadEntity,
        fromEstateActions.EntityActionTypes.StoreSuccessEntity,
        fromEstateActions.EntityActionTypes.UpdateSuccessEntity,
        fromEstateActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['estate'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromEstateActions.EntityActionTypes.Reset),
      map((action: fromEstateActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['estate'] }));
        }
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
