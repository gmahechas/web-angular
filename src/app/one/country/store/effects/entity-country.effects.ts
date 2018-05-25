import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  EntityActionTypes,
  EntityLoad,
  EntityLoadSuccess,
  EntityLoadFail,
  EntityStore,
  EntityStoreSuccess,
  EntityStoreFail,
  EntityUpdate,
  EntityUpdateSuccess,
  EntityUpdateFail,
  EntityDestroy,
  EntityDestroySuccess,
  EntityDestroyFail
} from './../actions/entity-country.actions';

import { CountryService } from '../../services/country.service';

import { SearchCountry } from '../../models/search-country.model';
import { Country } from '../../models/country.model';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class EntityCountryEffects {

  @Effect()
  entityLoad$ = this.actions$.pipe(
    ofType<EntityLoad>(EntityActionTypes.EntityLoad),
    map(action => action.payload),
    switchMap((searchCountry: SearchCountry) => {
      return this.countryService.paginationCountry(searchCountry).pipe(
        map(({ data }) => new EntityLoadSuccess(data)),
        catchError(({ errors }) => of(new EntityLoadFail(errors)))
      );
    })
  );

  @Effect()
  entityStore$ = this.actions$.pipe(
    ofType<EntityStore>(EntityActionTypes.EntityStore),
    map(action => action.payload),
    switchMap((country: Country) => {
      return this.countryService.storeCountry(country).pipe(
        map(({ data }) => new EntityStoreSuccess(data)),
        catchError(({ errors }) => of(new EntityStoreFail(errors)))
      );
    })
  );

  @Effect()
  entityUpdate$ = this.actions$.pipe(
    ofType<EntityUpdate>(EntityActionTypes.EntityUpdate),
    map(action => action.payload),
    switchMap((country: Country) => {
      return this.countryService.updateCountry(country).pipe(
        map(({ data }) => new EntityUpdateSuccess(data)),
        catchError(({ errors }) => of(new EntityUpdateFail(errors)))
      );
    })
  );

  @Effect()
  entityDestroy$ = this.actions$.pipe(
    ofType<EntityDestroy>(EntityActionTypes.EntityDestroy),
    map(action => action.payload),
    switchMap((country: Country) => {
      return this.countryService.destroyCountry(country).pipe(
        map(({ data }) => new EntityDestroySuccess(data)),
        catchError(({ errors }) => of(new EntityDestroyFail(errors)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private countryService: CountryService
  ) { }
}
