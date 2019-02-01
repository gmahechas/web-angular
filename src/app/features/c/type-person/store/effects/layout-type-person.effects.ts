import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromTypePersonActions from '@web/app/features/c/type-person/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutTypePersonEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromTypePersonActions.EntityActionTypes.LoadEntity,
      fromTypePersonActions.EntityActionTypes.StoreEntity,
      fromTypePersonActions.EntityActionTypes.UpdateEntity,
      fromTypePersonActions.EntityActionTypes.DestroyEntity,
      fromTypePersonActions.EntityActionTypes.PaginateEntity,
      fromTypePersonActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromTypePersonActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromTypePersonActions.EntityActionTypes.StoreSuccessEntity,
      fromTypePersonActions.EntityActionTypes.UpdateSuccessEntity,
      fromTypePersonActions.EntityActionTypes.DestroySuccessEntity
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
      fromTypePersonActions.EntityActionTypes.LoadFailEntity,
      fromTypePersonActions.EntityActionTypes.StoreFailEntity,
      fromTypePersonActions.EntityActionTypes.UpdateFailEntity,
      fromTypePersonActions.EntityActionTypes.DestroyFailEntity
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
      fromTypePersonActions.EntityActionTypes.LoadEntity,
      fromTypePersonActions.EntityActionTypes.StoreSuccessEntity,
      fromTypePersonActions.EntityActionTypes.UpdateSuccessEntity,
      fromTypePersonActions.EntityActionTypes.DestroySuccessEntity,
      fromTypePersonActions.EntityActionTypes.Reset
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['type_person'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) {}
}
