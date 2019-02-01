import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromCity from '@web/app/features/a/city/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityExistGuard implements CanActivate {

  constructor(
    private store: Store<fromCity.State>
  ) { }

  hasInStore(cityId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromCity.getEntities),
      map(entities => !!entities[cityId]),
      take(1)
    );
  }

  hasEntity(cityId: string): Observable<boolean> {
    return this.hasInStore(cityId).pipe(
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

  checkStore(cityId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromCity.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromCity.LoadEntity({
            search: {
              city: {
                city_id: cityId,
                city_name: '',
                city_code: ''
              },
              estate: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.city_id).pipe(
      switchMap(() => this.hasEntity(route.params.city_id))
    );
  }

}
