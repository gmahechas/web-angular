import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromScheduleDayHourRange from '@web/app/features/f/schedule-day-hour-range/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDayHourRangeExistGuard implements CanActivate {

  constructor(
    private store: Store<fromScheduleDayHourRange.State>
  ) { }

  hasInStore(scheduleDayHourRangeId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromScheduleDayHourRange.getEntities),
      map(entities => !!entities[scheduleDayHourRangeId]),
      take(1)
    );
  }

  hasEntity(scheduleDayHourRangeId: string): Observable<boolean> {
    return this.hasInStore(scheduleDayHourRangeId).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        this.store.dispatch(fromCore.RouterActions.Go({
          path: ['not-found']
        }));
        return of(false);
      })
    );
  }

  checkStore(scheduleDayHourRangeId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromScheduleDayHourRange.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromScheduleDayHourRange.EntityActions.LoadEntity({
            search: {
              schedule_day_hour_range: {
                schedule_day_hour_range_id: scheduleDayHourRangeId,
                schedule_day_hour_range_status: null
              },
              schedule_day: null,
              hour_range: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.schedule_day_hour_range_id).pipe(
      switchMap(() => this.hasEntity(route.params.schedule_day_hour_range_id))
    );
  }

}
