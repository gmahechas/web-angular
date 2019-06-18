import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromPersonActions from '@web/app/features/c/person/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutPersonEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromPersonActions.EntityActionTypes.LoadEntity,
        fromPersonActions.EntityActionTypes.StoreEntity,
        fromPersonActions.EntityActionTypes.UpdateEntity,
        fromPersonActions.EntityActionTypes.DestroyEntity,
        fromPersonActions.EntityActionTypes.PaginateEntity,
        fromPersonActions.EntityActionTypes.LoadEntityShared
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
        fromPersonActions.EntityActionTypes.LoadSuccessEntity
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
        fromPersonActions.EntityActionTypes.StoreSuccessEntity,
        fromPersonActions.EntityActionTypes.UpdateSuccessEntity,
        fromPersonActions.EntityActionTypes.DestroySuccessEntity
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
        fromPersonActions.EntityActionTypes.LoadFailEntity,
        fromPersonActions.EntityActionTypes.StoreFailEntity,
        fromPersonActions.EntityActionTypes.UpdateFailEntity,
        fromPersonActions.EntityActionTypes.DestroyFailEntity
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
        fromPersonActions.EntityActionTypes.LoadEntity,
        fromPersonActions.EntityActionTypes.StoreSuccessEntity,
        fromPersonActions.EntityActionTypes.UpdateSuccessEntity,
        fromPersonActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['person'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPersonActions.EntityActionTypes.Reset),
      map((action: fromPersonActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['person'] }));
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
