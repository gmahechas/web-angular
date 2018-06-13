import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select } from '@ngrx/store';
import * as fromReducers from './../reducers';
import * as fromSelectors from '../selectors';
import * as fromActions from '../actions';

import * as fromModels from './../../models';

import { EstateService } from '../../services/estate.service';

import { of, from } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class EntityEstateEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getCurrentPage))
    ),
    switchMap(([searchEstate, perPage, currentPage]: [fromModels.SearchEstate, number, number]) => {
      perPage = (perPage) ? perPage : searchEstate.limit;
      currentPage = (currentPage) ? currentPage : searchEstate.page;
      return this.estateService.load({ ...searchEstate, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity(data)),
        catchError((errors) => {
          return of(new fromActions.LoadFailEntity(errors));
        }
        )
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreEntity>(fromActions.EntityActionTypes.StoreEntity),
    map(action => action.payload),
    switchMap((estate: fromModels.Estate) => {
      return this.estateService.store(estate).pipe(
        map(({ data }) => new fromActions.StoreSuccessEntity(data)),
        catchError((errors) => of(new fromActions.StoreFailEntity(errors)))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload),
    switchMap((estate: fromModels.Estate) => {
      return this.estateService.update(estate).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity(data)),
        catchError((errors) => of(new fromActions.UpdateFailEntity(errors)))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload),
    switchMap((estate: fromModels.Estate) => {
      return this.estateService.destroy(estate).pipe(
        map(({ data }) => new fromActions.DestroySuccessEntity(data)),
        catchError((errors) => of(new fromActions.DestroyFailEntity(errors)))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromActions.PaginateEntity>(fromActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchEstate]: [number, number, fromModels.SearchEstate]) => {
      return from(this.estateService.pagination({ ...searchEstate, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity(data)),
        catchError((errors) => of(new fromActions.LoadFailEntity(errors)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private estateService: EstateService,
    private store: Store<fromReducers.State>
  ) { }
}
