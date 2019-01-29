import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutUserOfficeEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromUserOfficeActions.EntityActionTypes.LoadEntity,
      fromUserOfficeActions.EntityActionTypes.StoreEntity,
      fromUserOfficeActions.EntityActionTypes.UpdateEntity,
      fromUserOfficeActions.EntityActionTypes.DestroyEntity,
      fromUserOfficeActions.EntityActionTypes.PaginateEntity,
      fromUserOfficeActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromUserOfficeActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromUserOfficeActions.EntityActionTypes.StoreSuccessEntity,
      fromUserOfficeActions.EntityActionTypes.UpdateSuccessEntity,
      fromUserOfficeActions.EntityActionTypes.DestroySuccessEntity
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
      fromUserOfficeActions.EntityActionTypes.LoadFailEntity,
      fromUserOfficeActions.EntityActionTypes.StoreFailEntity,
      fromUserOfficeActions.EntityActionTypes.UpdateFailEntity,
      fromUserOfficeActions.EntityActionTypes.DestroyFailEntity
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

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
