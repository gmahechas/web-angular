import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromCountry from '@web/app/features/a/country/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryExistGuard implements CanActivate {

  constructor(
    private store: Store<fromCountry.State>
  ) { }

  hasInStore(countryId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromCountry.getEntities),
      map(entities => !!entities[countryId]),
      take(1)
    );
  }

  hasEntity(countryId: string): Observable<boolean> {
    return this.hasInStore(countryId).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        this.store.dispatch(new fromCore.Go({
          path: ['not-found']
        }));
        return of(false);
      })
    );
  }

  checkStore(countryId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromCountry.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromCountry.LoadEntity({
            search: {
              country: {
                country_id: countryId,
                country_name: '',
                country_code: ''
              }
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.country_id).pipe(
      switchMap(() => this.hasEntity(route.params.country_id))
    );
  }

}
