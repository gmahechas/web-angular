import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromDepartment from '@web/app/features/b/department/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentExistGuard implements CanActivate {

  constructor(
    private store: Store<fromDepartment.State>
  ) { }

  hasInStore(departmentId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromDepartment.getEntities),
      map(entities => !!entities[departmentId]),
      take(1)
    );
  }

  hasEntity(departmentId: string): Observable<boolean> {
    return this.hasInStore(departmentId).pipe(
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

  checkStore(departmentId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromDepartment.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromDepartment.EntityActions.LoadEntity({
            search: {
              department: {
                department_id: departmentId,
                department_name: ''
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
    return this.checkStore(route.params.department_id).pipe(
      switchMap(() => this.hasEntity(route.params.department_id))
    );
  }

}
