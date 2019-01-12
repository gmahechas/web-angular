import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromDepartmentActions from '@web/app/features/b/department/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutDepartmentEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromDepartmentActions.EntityActionTypes.LoadEntity,
      fromDepartmentActions.EntityActionTypes.StoreEntity,
      fromDepartmentActions.EntityActionTypes.UpdateEntity,
      fromDepartmentActions.EntityActionTypes.DestroyEntity,
      fromDepartmentActions.EntityActionTypes.PaginateEntity,
      fromDepartmentActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromDepartmentActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromDepartmentActions.EntityActionTypes.StoreSuccessEntity,
      fromDepartmentActions.EntityActionTypes.UpdateSuccessEntity,
      fromDepartmentActions.EntityActionTypes.DestroySuccessEntity
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
      fromDepartmentActions.EntityActionTypes.LoadFailEntity,
      fromDepartmentActions.EntityActionTypes.StoreFailEntity,
      fromDepartmentActions.EntityActionTypes.UpdateFailEntity,
      fromDepartmentActions.EntityActionTypes.DestroyFailEntity
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
      fromDepartmentActions.EntityActionTypes.LoadEntity,
      fromDepartmentActions.EntityActionTypes.StoreSuccessEntity,
      fromDepartmentActions.EntityActionTypes.UpdateSuccessEntity,
      fromDepartmentActions.EntityActionTypes.DestroySuccessEntity,
      fromDepartmentActions.EntityActionTypes.ResetSearch
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['department'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) {}
}
