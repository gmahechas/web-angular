import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromProject from '@web/app/features/d/project/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectExistGuard implements CanActivate {

  constructor(
    private store: Store<fromProject.State>
  ) { }

  hasInStore(projectId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromProject.getEntities),
      map(entities => !!entities[projectId]),
      take(1)
    );
  }

  hasEntity(projectId: string): Observable<boolean> {
    return this.hasInStore(projectId).pipe(
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

  checkStore(projectId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromProject.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromProject.EntityActions.LoadEntity({
            search: {
              project: {
                project_id: projectId,
                project_name: ''
              },
              macroproject: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.project_id).pipe(
      switchMap(() => this.hasEntity(route.params.project_id))
    );
  }

}
