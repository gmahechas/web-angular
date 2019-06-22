import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromCountryReducers from '@web/app/features/a/country/store/reducers';
import * as fromCountrySelectors from '@web/app/features/a/country/store/selectors';
import * as fromCountryActions from '@web/app/features/a/country/store/actions';

import * as fromModels from '@web/app/features/a/country/models';

import { CountryService } from '@web/app/features/a/country/services/country.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityCountryEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCountryActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromCountrySelectors.getPerPage)),
        this.store.pipe(select(fromCountrySelectors.getCurrentPage))
      ),
      mergeMap(([searchCountry, perPage, currentPage]: [fromModels.SearchCountry, number, number]) => {
        perPage = (perPage) ? perPage : searchCountry.limit;
        currentPage = (currentPage) ? currentPage : searchCountry.page;
        return this.countryService.load({ ...searchCountry, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromCountryActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromCountryActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCountryActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((country: fromModels.Country) => {
        return this.countryService.store(country).pipe(
          map(({ data }) => fromCountryActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromCountryActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCountryActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((country: fromModels.Country) => {
        return this.countryService.update(country).pipe(
          map(({ data }) => fromCountryActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromCountryActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCountryActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((country: fromModels.Country) => {
        return this.countryService.destroy(country).pipe(
          map(({ data }) => fromCountryActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromCountryActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCountryActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromCountrySelectors.getPerPage)),
        this.store.pipe(select(fromCountrySelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchCountry]: [number, number, fromModels.SearchCountry]) => {
        return from(this.countryService.pagination({ ...searchCountry, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromCountryActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromCountryActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromCountryActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchCountry: fromModels.SearchCountry) => {
        if (
          searchCountry.country.country_id === '' &&
          searchCountry.country.country_name === '' &&
          searchCountry.country.country_code === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromCountryActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.countryService.load({ ...searchCountry, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromCountryActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromCountryActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private countryService: CountryService,
    private store: Store<fromCountryReducers.State>
  ) { }
}
