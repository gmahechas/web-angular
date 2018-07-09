import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '../../../../core/store';
import * as fromActions from '../actions';

import * as fromModels from './../../models';

import { MessageService } from 'primeng/components/common/messageservice';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutEstateEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.LoadEntity,
      fromActions.EntityActionTypes.StoreEntity,
      fromActions.EntityActionTypes.UpdateEntity,
      fromActions.EntityActionTypes.DestroyEntity,
      fromActions.EntityActionTypes.PaginateEntity,
      fromActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.LoadSuccessEntity,
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.StoreSuccessEntity,
      fromActions.EntityActionTypes.UpdateSuccessEntity,
      fromActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
      this.messageService.add({
        severity: 'success',
        summary: 'Exito',
        detail: 'Se llevo a cabo',
        key: 'growl'
      });
    })
  );

  @Effect({ dispatch: false })
  fail$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.LoadFailEntity,
      fromActions.EntityActionTypes.StoreFailEntity,
      fromActions.EntityActionTypes.UpdateFailEntity,
      fromActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(action => {
      this.store.dispatch(new fromCore.CloseSpinner);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Ha ocurrido un error.',
        key: 'growl'
      });
    })
  );

  // Redirects
  @Effect({ dispatch: false })
  loadEntity$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.LoadEntity,
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['estate'] }));
    })
  );

  @Effect({ dispatch: false })
  storeSuccessEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreSuccessEntity>(fromActions.EntityActionTypes.StoreSuccessEntity),
    map(action => action.payload),
    tap((data: fromModels.StoreEstate) => {
      this.store.dispatch(new fromActions.LoadEntity({
        estate: {
          estate_id: String(data.storeEstate.estate_id),
          estate_name: data.storeEstate.estate_name,
          estate_code: data.storeEstate.estate_code
        },
        country: data.storeEstate.country
      }));
    })
  );

  @Effect({ dispatch: false })
  updateSuccessEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateSuccessEntity>(fromActions.EntityActionTypes.UpdateSuccessEntity),
    map(action => action.payload),
    tap((data: fromModels.UpdateEstate) => {
      this.store.dispatch(new fromCore.Go({ path: ['estate'] }));
    })
  );

  @Effect({ dispatch: false })
  destroySuccessEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroySuccessEntity>(fromActions.EntityActionTypes.DestroySuccessEntity),
    map(action => action.payload),
    tap((data: fromModels.DestroyEstate) => {
      this.store.dispatch(new fromCore.Go({ path: ['estate'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private messageService: MessageService,
    private store: Store<fromCore.State>
  ) { }
}
