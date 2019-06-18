import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromTypePersonIdentificationActions from '@web/app/features/c/type-person-identification/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutTypePersonIdentificationEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromTypePersonIdentificationActions.EntityActionTypes.LoadEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.StoreEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.UpdateEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.DestroyEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.PaginateEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.LoadEntityShared
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
        fromTypePersonIdentificationActions.EntityActionTypes.LoadSuccessEntity
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
        fromTypePersonIdentificationActions.EntityActionTypes.StoreSuccessEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.UpdateSuccessEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.DestroySuccessEntity
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
        fromTypePersonIdentificationActions.EntityActionTypes.LoadFailEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.StoreFailEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.UpdateFailEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.DestroyFailEntity
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
        fromTypePersonIdentificationActions.EntityActionTypes.LoadEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.StoreSuccessEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.UpdateSuccessEntity,
        fromTypePersonIdentificationActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['type-person-identification'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonIdentificationActions.EntityActionTypes.Reset),
      map((action: fromTypePersonIdentificationActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['type-person-identification'] }));
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
