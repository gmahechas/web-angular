import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromWorkflowReducers from '@web/app/features/e/workflow/store/reducers';
import * as fromWorkflowSelectors from '@web/app/features/e/workflow/store/selectors';
import * as fromWorkflowActions from '@web/app/features/e/workflow/store/actions';

import * as fromModels from '@web/app/features/e/workflow/models';

import { WorkflowService } from '@web/app/features/e/workflow/services/workflow.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityWorkflowEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromWorkflowActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromWorkflowSelectors.getPerPage)),
        this.store.pipe(select(fromWorkflowSelectors.getCurrentPage))
      ),
      mergeMap(([searchWorkflow, perPage, currentPage]: [fromModels.SearchWorkflow, number, number]) => {
        perPage = (perPage) ? perPage : searchWorkflow.limit;
        currentPage = (currentPage) ? currentPage : searchWorkflow.page;
        return this.workflowService.load({ ...searchWorkflow, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromWorkflowActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromWorkflowActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromWorkflowActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((workflow: fromModels.Workflow) => {
        return this.workflowService.store(workflow).pipe(
          map(({ data }) => fromWorkflowActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromWorkflowActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromWorkflowActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((workflow: fromModels.Workflow) => {
        return this.workflowService.update(workflow).pipe(
          map(({ data }) => fromWorkflowActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromWorkflowActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromWorkflowActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((workflow: fromModels.Workflow) => {
        return this.workflowService.destroy(workflow).pipe(
          map(({ data }) => fromWorkflowActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromWorkflowActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromWorkflowActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromWorkflowSelectors.getPerPage)),
        this.store.pipe(select(fromWorkflowSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchWorkflow]: [number, number, fromModels.SearchWorkflow]) => {
        return from(this.workflowService.pagination({ ...searchWorkflow, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromWorkflowActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromWorkflowActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromWorkflowActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchWorkflow: fromModels.SearchWorkflow) => {
        if (
          searchWorkflow.workflow.workflow_id === '' &&
          searchWorkflow.workflow.workflow_name === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromWorkflowActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.workflowService.load({ ...searchWorkflow, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromWorkflowActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromWorkflowActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private workflowService: WorkflowService,
    private store: Store<fromWorkflowReducers.State>
  ) { }
}
