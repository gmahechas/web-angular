import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromProjectReducers from '@web/app/features/d/project/store/reducers';
import * as fromProjectSelectors from '@web/app/features/d/project/store/selectors';
import * as fromProjectActions from '@web/app/features/d/project/store/actions';

import * as fromModels from '@web/app/features/d/project/models';

import { ProjectService } from '@web/app/features/d/project/services/project.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityProjectEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromProjectActions.LoadEntity>(fromProjectActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromProjectSelectors.getPerPage)),
      this.store.pipe(select(fromProjectSelectors.getCurrentPage))
    ),
    switchMap(([searchProject, perPage, currentPage]: [fromModels.SearchProject, number, number]) => {
      perPage = (perPage) ? perPage : searchProject.limit;
      currentPage = (currentPage) ? currentPage : searchProject.page;
      return this.projectService.load({ ...searchProject, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromProjectActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromProjectActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromProjectActions.StoreEntity>(fromProjectActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((project: fromModels.Project) => {
      return this.projectService.store(project).pipe(
        map(({ data }) => new fromProjectActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromProjectActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromProjectActions.UpdateEntity>(fromProjectActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((project: fromModels.Project) => {
      return this.projectService.update(project).pipe(
        map(({ data }) => new fromProjectActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromProjectActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromProjectActions.DestroyEntity>(fromProjectActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((project: fromModels.Project) => {
      return this.projectService.destroy(project).pipe(
        map(({ data }) => new fromProjectActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromProjectActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromProjectActions.PaginateEntity>(fromProjectActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromProjectSelectors.getPerPage)),
      this.store.pipe(select(fromProjectSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchProject]: [number, number, fromModels.SearchProject]) => {
      return from(this.projectService.pagination({ ...searchProject, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromProjectActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromProjectActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromProjectActions.LoadEntityShared>(fromProjectActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchProject: fromModels.SearchProject) => {
        if (
          searchProject.project.project_id === '' &&
          searchProject.project.project_name === '' &&
          searchProject.macroproject === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromProjectActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.projectService.load({ ...searchProject, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromProjectActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromProjectActions.LoadFailEntity({ error })))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private store: Store<fromProjectReducers.State>
  ) { }
}
