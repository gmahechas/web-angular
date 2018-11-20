import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromReducers from '@web/app/features/e/workflow/store/reducers';
import * as fromSelectors from '@web/app/features/e/workflow/store/selectors';
import * as fromActions from '@web/app/features/e/workflow/store/actions';

import * as fromModels from '@web/app/features/e/workflow/models';

import { WorkflowService } from '@web/app/features/e/workflow/services/workflow.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityWorkflowEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getCurrentPage))
    ),
    switchMap(([searchWorkflow, perPage, currentPage]: [fromModels.SearchWorkflow, number, number]) => {
      perPage = (perPage) ? perPage : searchWorkflow.limit;
      currentPage = (currentPage) ? currentPage : searchWorkflow.page;
      return this.workflowService.load({ ...searchWorkflow, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => of(new fromActions.LoadFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreEntity>(fromActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((workflow: fromModels.Workflow) => {
      return this.workflowService.store(workflow).pipe(
        map(({ data }) => new fromActions.StoreSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromActions.StoreFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((workflow: fromModels.Workflow) => {
      return this.workflowService.update(workflow).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromActions.UpdateFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((workflow: fromModels.Workflow) => {
      return this.workflowService.destroy(workflow).pipe(
        map(({ data }) => new fromActions.DestroySuccessEntity({ entity: data })),
        catchError((errors) => of(new fromActions.DestroyFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromActions.PaginateEntity>(fromActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchWorkflow]: [number, number, fromModels.SearchWorkflow]) => {
      return from(this.workflowService.pagination({ ...searchWorkflow, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => of(new fromActions.LoadFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromActions.LoadEntityShared>(fromActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchWorkflow: fromModels.SearchWorkflow) => {
        if (
          searchWorkflow.workflow.workflow_id === '' &&
          searchWorkflow.workflow.workflow_name === ''
          ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.workflowService.load({ ...searchWorkflow, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
          catchError((errors) => {
            return of(new fromActions.LoadFailEntity({ error: errors }));
          })
        );

      })
    )

  constructor(
    private actions$: Actions,
    private workflowService: WorkflowService,
    private store: Store<fromReducers.State>
  ) { }
}
