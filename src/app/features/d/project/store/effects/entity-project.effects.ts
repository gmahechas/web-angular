import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromProjectReducers from '@web/app/features/d/project/store/reducers';
import * as fromProjectSelectors from '@web/app/features/d/project/store/selectors';
import * as fromProjectActions from '@web/app/features/d/project/store/actions';

import * as fromModels from '@web/app/features/d/project/models';

import { ProjectService } from '@web/app/features/d/project/services/project.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityProjectEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProjectActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromProjectSelectors.getPerPage)),
        this.store.pipe(select(fromProjectSelectors.getCurrentPage))
      ),
      mergeMap(([searchProject, perPage, currentPage]: [fromModels.SearchProject, number, number]) => {
        perPage = (perPage) ? perPage : searchProject.limit;
        currentPage = (currentPage) ? currentPage : searchProject.page;
        return this.projectService.load({ ...searchProject, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromProjectActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromProjectActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProjectActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((project: fromModels.Project) => {
        return this.projectService.store(project).pipe(
          map(({ data }) => fromProjectActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromProjectActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProjectActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((project: fromModels.Project) => {
        return this.projectService.update(project).pipe(
          map(({ data }) => fromProjectActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromProjectActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProjectActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((project: fromModels.Project) => {
        return this.projectService.destroy(project).pipe(
          map(({ data }) => fromProjectActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromProjectActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProjectActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromProjectSelectors.getPerPage)),
        this.store.pipe(select(fromProjectSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchProject]: [number, number, fromModels.SearchProject]) => {
        return from(this.projectService.pagination({ ...searchProject, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromProjectActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromProjectActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromProjectActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchProject: fromModels.SearchProject) => {
        if (
          searchProject.project.project_id === '' &&
          searchProject.project.project_name === '' &&
          searchProject.macroproject === null &&
          searchProject.office === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromProjectActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.projectService.load({ ...searchProject, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromProjectActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromProjectActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private store: Store<fromProjectReducers.State>
  ) { }
}
