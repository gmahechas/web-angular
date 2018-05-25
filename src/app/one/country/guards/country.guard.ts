import { CountryService } from './../services/country.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromCore from './../../../core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';
import { SearchCountry } from '../models/search-country.model';

@Injectable()
export class CountryGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.State>,
    private countryService: CountryService
  ) { }


  /*   hasInApi(country_id: string) {
      return this.countryService.paginationCountry({ country_id: +country_id }).pipe(
        map(({ data }) => new fromStore.EntityLoadSuccess(data)),
        tap((action: fromStore.EntityLoadSuccess) => this.store.dispatch(action)),
        map(action => action.payload),
        map(searchCountry => !!searchCountry),
        catchError(() => {
          this.store.dispatch(new fromCore.Go({
            path: ['not-found']
          }));
          return of(false);
        })
      );
    } */

  hasInStore(country_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getEntities),
      map(entities => !!entities[country_id]),
      take(1)
    );
  }

  hasEntity(country_id: string): Observable<boolean> {
    return this.hasInStore(country_id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        /* this.hasInApi(country_id); */
        this.store.dispatch(new fromCore.Go({
          path: ['not-found']
        }));
        return of(false);
      })
    );
  }

  checkStore(country_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.EntityLoad({ country_id: +country_id, country_name: '', country_code: '' }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params['country_id']).pipe(
      switchMap(() => this.hasEntity(route.params['country_id']))
    );
  }

}
