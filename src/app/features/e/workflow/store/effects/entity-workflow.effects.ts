import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromWorkflowReducers from '@web/app/features/e/workflow/store/reducers';
import * as fromWorkflowSelectors from '@web/app/features/e/workflow/store/selectors';
import * as fromWorkflowActions from '@web/app/features/e/workflow/store/actions';

import * as fromModels from '@web/app/features/e/workflow/models';

import { WorkflowService } from '@web/app/features/e/workflow/services/workflow.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityWorkflowEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromWorkflowActions.LoadEntity>(fromWorkflowActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromWorkflowSelectors.getPerPage)),
      this.store.pipe(select(fromWorkflowSelectors.getCurrentPage))
    ),
    switchMap(([searchWorkflow, perPage, currentPage]: [fromModels.SearchWorkflow, number, number]) => {
      perPage = (perPage) ? perPage : searchWorkflow.limit;
      currentPage = (currentPage) ? currentPage : searchWorkflow.page;
      return this.workflowService.load({ ...searchWorkflow, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromWorkflowActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromWorkflowActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromWorkflowActions.StoreEntity>(fromWorkflowActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((workflow: fromModels.Workflow) => {
      return this.workflowService.store(workflow).pipe(
        map(({ data }) => new fromWorkflowActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromWorkflowActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromWorkflowActions.UpdateEntity>(fromWorkflowActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((workflow: fromModels.Workflow) => {
      return this.workflowService.update(workflow).pipe(
        map(({ data }) => new fromWorkflowActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromWorkflowActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromWorkflowActions.DestroyEntity>(fromWorkflowActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((workflow: fromModels.Workflow) => {
      return this.workflowService.destroy(workflow).pipe(
        map(({ data }) => new fromWorkflowActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromWorkflowActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromWorkflowActions.PaginateEntity>(fromWorkflowActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromWorkflowSelectors.getPerPage)),
      this.store.pipe(select(fromWorkflowSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchWorkflow]: [number, number, fromModels.SearchWorkflow]) => {
      return from(this.workflowService.pagination({ ...searchWorkflow, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromWorkflowActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromWorkflowActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromWorkflowActions.LoadEntityShared>(fromWorkflowActions.EntityActionTypes.LoadEntityShared),
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
          ofType(fromWorkflowActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.workflowService.load({ ...searchWorkflow, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromWorkflowActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromWorkflowActions.LoadFailEntity({ error })))
        );

      })
    )

  constructor(
    private actions$: Actions,
    private workflowService: WorkflowService,
    private store: Store<fromWorkflowReducers.State>
  ) { }
}
