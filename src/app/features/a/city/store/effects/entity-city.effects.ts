import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromCityReducers from '@web/app/features/a/city/store/reducers';
import * as fromCitySelectors from '@web/app/features/a/city/store/selectors';
import * as fromCityActions from '@web/app/features/a/city/store/actions';

import * as fromModels from '@web/app/features/a/city/models';

import { CityService } from '@web/app/features/a/city/services/city.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityCityEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromCityActions.LoadEntity>(fromCityActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromCitySelectors.getPerPage)),
      this.store.pipe(select(fromCitySelectors.getCurrentPage))
    ),
    switchMap(([searchCity, perPage, currentPage]: [fromModels.SearchCity, number, number]) => {
      perPage = (perPage) ? perPage : searchCity.limit;
      currentPage = (currentPage) ? currentPage : searchCity.page;
      return this.cityService.load({ ...searchCity, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromCityActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromCityActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromCityActions.StoreEntity>(fromCityActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((city: fromModels.City) => {
      return this.cityService.store(city).pipe(
        map(({ data }) => new fromCityActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromCityActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromCityActions.UpdateEntity>(fromCityActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((city: fromModels.City) => {
      return this.cityService.update(city).pipe(
        map(({ data }) => new fromCityActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromCityActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromCityActions.DestroyEntity>(fromCityActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((city: fromModels.City) => {
      return this.cityService.destroy(city).pipe(
        map(({ data }) => new fromCityActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromCityActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromCityActions.PaginateEntity>(fromCityActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromCitySelectors.getPerPage)),
      this.store.pipe(select(fromCitySelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchCity]: [number, number, fromModels.SearchCity]) => {
      return from(this.cityService.pagination({ ...searchCity, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromCityActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromCityActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromCityActions.LoadEntityShared>(fromCityActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
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
          ofType(fromCityActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.cityService.load({ ...searchCity, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromCityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromCityActions.LoadFailEntity({ error })))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private cityService: CityService,
    private store: Store<fromCityReducers.State>
  ) { }
}
