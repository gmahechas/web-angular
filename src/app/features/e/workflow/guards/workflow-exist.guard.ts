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

  hasInStore(workflowId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromWorkflow.getEntities),
      map(entities => !!entities[workflowId]),
      take(1)
    );
  }

  hasEntity(workflowId: string): Observable<boolean> {
    return this.hasInStore(workflowId).pipe(
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

  checkStore(workflowId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromWorkflow.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromWorkflow.EntityActions.LoadEntity({
            search: {
              workflow: {
                workflow_id: workflowId,
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
