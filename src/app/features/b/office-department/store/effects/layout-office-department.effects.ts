import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromOfficeDepartmentActions from '@web/app/features/b/office-department/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutOfficeDepartmentEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromOfficeDepartmentActions.EntityActionTypes.LoadEntity,
        fromOfficeDepartmentActions.EntityActionTypes.StoreEntity,
        fromOfficeDepartmentActions.EntityActionTypes.UpdateEntity,
        fromOfficeDepartmentActions.EntityActionTypes.DestroyEntity,
        fromOfficeDepartmentActions.EntityActionTypes.PaginateEntity,
        fromOfficeDepartmentActions.EntityActionTypes.LoadEntityShared
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
        fromOfficeDepartmentActions.EntityActionTypes.LoadSuccessEntity
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
        fromOfficeDepartmentActions.EntityActionTypes.StoreSuccessEntity,
        fromOfficeDepartmentActions.EntityActionTypes.UpdateSuccessEntity,
        fromOfficeDepartmentActions.EntityActionTypes.DestroySuccessEntity
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
        fromOfficeDepartmentActions.EntityActionTypes.LoadFailEntity,
        fromOfficeDepartmentActions.EntityActionTypes.StoreFailEntity,
        fromOfficeDepartmentActions.EntityActionTypes.UpdateFailEntity,
        fromOfficeDepartmentActions.EntityActionTypes.DestroyFailEntity
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

/*   // Redirects
  successRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromOfficeDepartmentActions.EntityActionTypes.LoadEntity,
        fromOfficeDepartmentActions.EntityActionTypes.StoreSuccessEntity,
        fromOfficeDepartmentActions.EntityActionTypes.UpdateSuccessEntity,
        fromOfficeDepartmentActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['office_department'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeDepartmentActions.EntityActionTypes.Reset),
      map((action: fromOfficeDepartmentActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['office_department'] }));
        }
      })
    ),
    { dispatch: false }
  ); */

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
