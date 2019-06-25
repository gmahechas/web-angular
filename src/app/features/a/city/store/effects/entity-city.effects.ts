import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromCityReducers from '@web/app/features/a/city/store/reducers';
import * as fromCitySelectors from '@web/app/features/a/city/store/selectors';
import * as fromCityActions from '@web/app/features/a/city/store/actions';

import * as fromModels from '@web/app/features/a/city/models';

import { CityService } from '@web/app/features/a/city/services/city.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityCityEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCityActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromCitySelectors.getPerPage)),
        this.store.pipe(select(fromCitySelectors.getCurrentPage))
      ),
      mergeMap(([searchCity, perPage, currentPage]: [fromModels.SearchCity, number, number]) => {
        perPage = (perPage) ? perPage : searchCity.limit;
        currentPage = (currentPage) ? currentPage : searchCity.page;
        return this.cityService.load({ ...searchCity, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromCityActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromCityActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCityActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((city: fromModels.City) => {
        return this.cityService.store(city).pipe(
          map(({ data }) => fromCityActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromCityActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCityActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((city: fromModels.City) => {
        return this.cityService.update(city).pipe(
          map(({ data }) => fromCityActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromCityActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCityActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((city: fromModels.City) => {
        return this.cityService.destroy(city).pipe(
          map(({ data }) => fromCityActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromCityActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCityActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromCitySelectors.getPerPage)),
        this.store.pipe(select(fromCitySelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchCity]: [number, number, fromModels.SearchCity]) => {
        return from(this.cityService.pagination({ ...searchCity, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromCityActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromCityActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromCityActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchCity: fromModels.SearchCity) => {
        if (
          searchCity.city.city_id === '' &&
          searchCity.city.city_name === '' &&
          searchCity.city.city_code === '' &&
          searchCity.estate === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromCityActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.cityService.load({ ...searchCity, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromCityActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromCityActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private cityService: CityService,
    private store: Store<fromCityReducers.State>
  ) { }
}
