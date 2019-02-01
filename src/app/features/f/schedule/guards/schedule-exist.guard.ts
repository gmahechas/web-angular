import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromSchedule from '@web/app/features/f/schedule/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExistGuard implements CanActivate {

  constructor(
    private store: Store<fromSchedule.State>
  ) { }

  hasInStore(scheduleId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromSchedule.getEntities),
      map(entities => !!entities[scheduleId]),
      take(1)
    );
  }

  hasEntity(scheduleId: string): Observable<boolean> {
    return this.hasInStore(scheduleId).pipe(
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

  checkStore(scheduleId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromSchedule.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromSchedule.LoadEntity({
            search: {
              schedule: {
                schedule_id: scheduleId,
                schedule_name: ''
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
    return this.checkStore(route.params.schedule_id).pipe(
      switchMap(() => this.hasEntity(route.params.schedule_id))
    );
  }

}
