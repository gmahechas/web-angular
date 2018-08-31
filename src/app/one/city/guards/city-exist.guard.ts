import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromCore from './../../../core/store';

import { CityService } from './../services/city.service';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class CityExistGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.State>,
    private cityService: CityService
  ) { }

  hasInStore(city_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getEntities),
      map(entities => !!entities[city_id]),
      take(1)
    );
  }

  hasEntity(city_id: string): Observable<boolean> {
    return this.hasInStore(city_id).pipe(
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

  checkStore(city_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadEntity({
            city: {
              city_id: city_id,
              city_name: '',
              city_code: ''
            },
            estate: null
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
