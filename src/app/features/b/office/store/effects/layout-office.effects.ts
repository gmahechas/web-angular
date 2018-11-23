import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromOfficeActions from '@web/app/features/b/office/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutOfficeEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromOfficeActions.EntityActionTypes.LoadEntity,
      fromOfficeActions.EntityActionTypes.StoreEntity,
      fromOfficeActions.EntityActionTypes.UpdateEntity,
      fromOfficeActions.EntityActionTypes.DestroyEntity,
      fromOfficeActions.EntityActionTypes.PaginateEntity,
      fromOfficeActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromOfficeActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromOfficeActions.EntityActionTypes.StoreSuccessEntity,
      fromOfficeActions.EntityActionTypes.UpdateSuccessEntity,
      fromOfficeActions.EntityActionTypes.DestroySuccessEntity
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
      fromOfficeActions.EntityActionTypes.LoadFailEntity,
      fromOfficeActions.EntityActionTypes.StoreFailEntity,
      fromOfficeActions.EntityActionTypes.UpdateFailEntity,
      fromOfficeActions.EntityActionTypes.DestroyFailEntity
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
      fromOfficeActions.EntityActionTypes.LoadEntity,
      fromOfficeActions.EntityActionTypes.StoreSuccessEntity,
      fromOfficeActions.EntityActionTypes.UpdateSuccessEntity,
      fromOfficeActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['office'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
