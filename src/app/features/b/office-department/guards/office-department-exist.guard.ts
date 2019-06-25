import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromOfficeDepartment from '@web/app/features/b/office-department/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficeDepartmentExistGuard implements CanActivate {

  constructor(
    private store: Store<fromOfficeDepartment.State>
  ) { }

  hasInStore(officeDepartmentId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromOfficeDepartment.getEntities),
      map(entities => !!entities[officeDepartmentId]),
      take(1)
    );
  }

  hasEntity(officeDepartmentId: string): Observable<boolean> {
    return this.hasInStore(officeDepartmentId).pipe(
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

  checkStore(officeDepartmentId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromOfficeDepartment.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromOfficeDepartment.EntityActions.LoadEntity({
            search: {
              office_department: {
                office_department_id: officeDepartmentId,
                office_department_status: null
              },
              office: null,
              department: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.office_department_id).pipe(
      switchMap(() => this.hasEntity(route.params.office_department_id))
    );
  }

}
