import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromReducers from '@web/app/one/country/store/reducers';
import * as fromSelectors from '@web/app/one/country/store/selectors';
import * as fromActions from '@web/app/one/country/store/actions';

import * as fromModels from '@web/app/one/country/models';

import { CountryService } from '@web/app/one/country/services/country.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityCountryEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getCurrentPage))
    ),
    switchMap(([searchCountry, perPage, currentPage]: [fromModels.SearchCountry, number, number]) => {
      perPage = (perPage) ? perPage : searchCountry.limit;
      currentPage = (currentPage) ? currentPage : searchCountry.page;
      return this.countryService.load({ ...searchCountry, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreEntity>(fromActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((country: fromModels.Country) => {
      return this.countryService.store(country).pipe(
        map(({ data }) => new fromActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((country: fromModels.Country) => {
      return this.countryService.update(country).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((country: fromModels.Country) => {
      return this.countryService.destroy(country).pipe(
        map(({ data }) => new fromActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromActions.PaginateEntity>(fromActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchCountry]: [number, number, fromModels.SearchCountry]) => {
      return from(this.countryService.pagination({ ...searchCountry, limit: perPage, page: currentPage })).pipe(
        skip(1),
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromActions.LoadEntityShared>(fromActions.EntityActionTypes.LoadEntityShared),
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
          ofType(fromActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.countryService.load({ ...searchCountry, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromActions.LoadFailEntity({ error })))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private countryService: CountryService,
    private store: Store<fromReducers.State>
  ) { }
}
