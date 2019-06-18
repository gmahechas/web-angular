import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromEstateReducers from '@web/app/features/a/estate/store/reducers';
import * as fromEstateSelectors from '@web/app/features/a/estate/store/selectors';
import * as fromEstateActions from '@web/app/features/a/estate/store/actions';

import * as fromModels from '@web/app/features/a/estate/models';

import { EstateService } from '@web/app/features/a/estate/services/estate.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityEstateEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromEstateActions.LoadEntity>(fromEstateActions.EntityActionTypes.LoadEntity),
      map(action => action.payload.search),
      withLatestFrom(
        this.store.pipe(select(fromEstateSelectors.getPerPage)),
        this.store.pipe(select(fromEstateSelectors.getCurrentPage))
      ),
      mergeMap(([searchEstate, perPage, currentPage]: [fromModels.SearchEstate, number, number]) => {
        perPage = (perPage) ? perPage : searchEstate.limit;
        currentPage = (currentPage) ? currentPage : searchEstate.page;
        return this.estateService.load({ ...searchEstate, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => new fromEstateActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromEstateActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromEstateActions.StoreEntity>(fromEstateActions.EntityActionTypes.StoreEntity),
      map(action => action.payload.entity),
      mergeMap((estate: fromModels.Estate) => {
        return this.estateService.store(estate).pipe(
          map(({ data }) => new fromEstateActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(new fromEstateActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromEstateActions.UpdateEntity>(fromEstateActions.EntityActionTypes.UpdateEntity),
      map(action => action.payload.entity),
      mergeMap((estate: fromModels.Estate) => {
        return this.estateService.update(estate).pipe(
          map(({ data }) => new fromEstateActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(new fromEstateActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromEstateActions.DestroyEntity>(fromEstateActions.EntityActionTypes.DestroyEntity),
      map(action => action.payload.entity),
      mergeMap((estate: fromModels.Estate) => {
        return this.estateService.destroy(estate).pipe(
          map(({ data }) => new fromEstateActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(new fromEstateActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromEstateActions.PaginateEntity>(fromEstateActions.EntityActionTypes.PaginateEntity),
      map(action => action.payload.page),
      withLatestFrom(
        this.store.pipe(select(fromEstateSelectors.getPerPage)),
        this.store.pipe(select(fromEstateSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchEstate]: [number, number, fromModels.SearchEstate]) => {
        return from(this.estateService.pagination({ ...searchEstate, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => new fromEstateActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromEstateActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromEstateActions.LoadEntityShared>(fromEstateActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchEstate: fromModels.SearchEstate) => {
        if (
          searchEstate.estate.estate_id === '' &&
          searchEstate.estate.estate_name === '' &&
          searchEstate.estate.estate_code === '' &&
          searchEstate.country === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromEstateActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.estateService.load({ ...searchEstate, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromEstateActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromEstateActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private estateService: EstateService,
    private store: Store<fromEstateReducers.State>
  ) { }
}
