import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromHourRange from '@web/app/features/f/hour-range/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HourRangeExistGuard implements CanActivate {

  constructor(
    private store: Store<fromHourRange.State>
  ) { }

  hasInStore(hourRangeId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromHourRange.getEntities),
      map(entities => !!entities[hourRangeId]),
      take(1)
    );
  }

  hasEntity(hourRangeId: string): Observable<boolean> {
    return this.hasInStore(hourRangeId).pipe(
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

  checkStore(hourRangeId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromHourRange.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromHourRange.LoadEntity({
            search: {
              hour_range: {
                hour_range_id: hourRangeId,
                hour_range_name: ''
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
    return this.checkStore(route.params.hour_range_id).pipe(
      switchMap(() => this.hasEntity(route.params.hour_range_id))
    );
  }

}
