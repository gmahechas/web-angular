import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromScheduleDay from '@web/app/features/f/schedule-day/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDayExistGuard implements CanActivate {

  constructor(
    private store: Store<fromScheduleDay.State>
  ) { }

  hasInStore(scheduleDayId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromScheduleDay.getEntities),
      map(entities => !!entities[scheduleDayId]),
      take(1)
    );
  }

  hasEntity(scheduleDayId: string): Observable<boolean> {
    return this.hasInStore(scheduleDayId).pipe(
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

  checkStore(scheduleDayId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromScheduleDay.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromScheduleDay.LoadEntity({
            search: {
              schedule_day: {
                schedule_day_id: scheduleDayId,
                schedule_day_status: null
              },
              schedule: null,
              day: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.schedule_day_id).pipe(
      switchMap(() => this.hasEntity(route.params.schedule_day_id))
    );
  }

}
