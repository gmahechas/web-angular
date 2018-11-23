import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromWorkflow from '@web/app/features/e/workflow/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkflowExistGuard implements CanActivate {

  constructor(
    private store: Store<fromWorkflow.State>
  ) { }

  hasInStore(workflow_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromWorkflow.getEntities),
      map(entities => !!entities[workflow_id]),
      take(1)
    );
  }

  hasEntity(workflow_id: string): Observable<boolean> {
    return this.hasInStore(workflow_id).pipe(
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

  checkStore(workflow_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromWorkflow.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromWorkflow.LoadEntity({
            search: {
              workflow: {
                workflow_id: workflow_id,
                workflow_name: ''
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
    return this.checkStore(route.params.workflow_id).pipe(
      switchMap(() => this.hasEntity(route.params.workflow_id))
    );
  }

}
