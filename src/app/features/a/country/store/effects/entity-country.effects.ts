import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromCountryReducers from '@web/app/features/a/country/store/reducers';
import * as fromCountrySelectors from '@web/app/features/a/country/store/selectors';
import * as fromCountryActions from '@web/app/features/a/country/store/actions';

import * as fromModels from '@web/app/features/a/country/models';

import { CountryService } from '@web/app/features/a/country/services/country.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityCountryEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromCountryActions.LoadEntity>(fromCountryActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromCountrySelectors.getPerPage)),
      this.store.pipe(select(fromCountrySelectors.getCurrentPage))
    ),
    switchMap(([searchCountry, perPage, currentPage]: [fromModels.SearchCountry, number, number]) => {
      perPage = (perPage) ? perPage : searchCountry.limit;
      currentPage = (currentPage) ? currentPage : searchCountry.page;
      return this.countryService.load({ ...searchCountry, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromCountryActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromCountryActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromCountryActions.StoreEntity>(fromCountryActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((country: fromModels.Country) => {
      return this.countryService.store(country).pipe(
        map(({ data }) => new fromCountryActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromCountryActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromCountryActions.UpdateEntity>(fromCountryActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((country: fromModels.Country) => {
      return this.countryService.update(country).pipe(
        map(({ data }) => new fromCountryActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromCountryActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromCountryActions.DestroyEntity>(fromCountryActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((country: fromModels.Country) => {
      return this.countryService.destroy(country).pipe(
        map(({ data }) => new fromCountryActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromCountryActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromCountryActions.PaginateEntity>(fromCountryActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromCountrySelectors.getPerPage)),
      this.store.pipe(select(fromCountrySelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchCountry]: [number, number, fromModels.SearchCountry]) => {
      return from(this.countryService.pagination({ ...searchCountry, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromCountryActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromCountryActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromCountryActions.LoadEntityShared>(fromCountryActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchCountry: fromModels.SearchCountry) => {
        if (
          searchCountry.country.country_id === '' &&
          searchCountry.country.country_name === '' &&
          searchCountry.country.country_code === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromCountryActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.countryService.load({ ...searchCountry, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromCountryActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromCountryActions.LoadFailEntity({ error })))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private countryService: CountryService,
    private store: Store<fromCountryReducers.State>
  ) { }
}
