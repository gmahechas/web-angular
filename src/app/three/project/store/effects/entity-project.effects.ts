import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromReducers from '@web/app/three/project/store/reducers';
import * as fromSelectors from '@web/app/three/project/store/selectors';
import * as fromActions from '@web/app/three/project/store/actions';

import * as fromModels from '@web/app/three/project/models';

import { ProjectService } from '@web/app/three/project/services/project.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityProjectEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getCurrentPage))
    ),
    switchMap(([searchProject, perPage, currentPage]: [fromModels.SearchProject, number, number]) => {
      perPage = (perPage) ? perPage : searchProject.limit;
      currentPage = (currentPage) ? currentPage : searchProject.page;
      return this.projectService.load({ ...searchProject, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((errors) => of(new fromActions.LoadFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreEntity>(fromActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((project: fromModels.Project) => {
      return this.projectService.store(project).pipe(
        map(({ data }) => new fromActions.StoreSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromActions.StoreFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((project: fromModels.Project) => {
      return this.projectService.update(project).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity({ entity: data })),
        catchError((errors) => of(new fromActions.UpdateFailEntity({ error: errors })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((project: fromModels.Project) => {
      return this.projectService.destroy(project).pipe(
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
    switchMap(([currentPage, perPage, searchProject]: [number, number, fromModels.SearchProject]) => {
      return from(this.projectService.pagination({ ...searchProject, limit: perPage, page: currentPage })).pipe(
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
      switchMap((searchProject: fromModels.SearchProject) => {
        if (
          searchProject.project.project_id === '' &&
          searchProject.project.project_name === '' &&
          searchProject.macroproject === null
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.projectService.load({ ...searchProject, limit: 20, page: 1 }).pipe(
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
    private projectService: ProjectService,
    private store: Store<fromReducers.State>
  ) { }
}
