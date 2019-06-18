import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutUserOfficeProjectEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromUserOfficeProjectActions.EntityActionTypes.LoadEntity,
        fromUserOfficeProjectActions.EntityActionTypes.StoreEntity,
        fromUserOfficeProjectActions.EntityActionTypes.UpdateEntity,
        fromUserOfficeProjectActions.EntityActionTypes.DestroyEntity,
        fromUserOfficeProjectActions.EntityActionTypes.PaginateEntity,
        fromUserOfficeProjectActions.EntityActionTypes.LoadEntityShared
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
        fromUserOfficeProjectActions.EntityActionTypes.LoadSuccessEntity
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
        fromUserOfficeProjectActions.EntityActionTypes.StoreSuccessEntity,
        fromUserOfficeProjectActions.EntityActionTypes.UpdateSuccessEntity,
        fromUserOfficeProjectActions.EntityActionTypes.DestroySuccessEntity
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
        fromUserOfficeProjectActions.EntityActionTypes.LoadFailEntity,
        fromUserOfficeProjectActions.EntityActionTypes.StoreFailEntity,
        fromUserOfficeProjectActions.EntityActionTypes.UpdateFailEntity,
        fromUserOfficeProjectActions.EntityActionTypes.DestroyFailEntity
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
        fromUserOfficeProjectActions.EntityActionTypes.LoadEntity,
        fromUserOfficeProjectActions.EntityActionTypes.StoreSuccessEntity,
        fromUserOfficeProjectActions.EntityActionTypes.UpdateSuccessEntity,
        fromUserOfficeProjectActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['user_office_project'] }));
      })
    ),
    { dispatch: false }
  );


  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeProjectActions.EntityActionTypes.Reset),
      map((action: fromUserOfficeProjectActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['user_office_project'] }));
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
