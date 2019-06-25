import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromTypePersonIdentificationReducers from '@web/app/features/c/type-person-identification/store/reducers';
import * as fromTypePersonIdentificationSelectors from '@web/app/features/c/type-person-identification/store/selectors';
import * as fromTypePersonIdentificationActions from '@web/app/features/c/type-person-identification/store/actions';

import * as fromModels from '@web/app/features/c/type-person-identification/models';

import {
  TypePersonIdentificationService
} from '@web/app/features/c/type-person-identification/services/type-person-identification.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityTypePersonIdentificationEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonIdentificationActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromTypePersonIdentificationSelectors.getPerPage)),
        this.store.pipe(select(fromTypePersonIdentificationSelectors.getCurrentPage))
      ),
      mergeMap(([searchTypePersonIdentification, perPage, currentPage]: [fromModels.SearchTypePersonIdentification, number, number]) => {
        perPage = (perPage) ? perPage : searchTypePersonIdentification.limit;
        currentPage = (currentPage) ? currentPage : searchTypePersonIdentification.page;
        return this.typePersonIdentificationService.load({ ...searchTypePersonIdentification, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromTypePersonIdentificationActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromTypePersonIdentificationActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonIdentificationActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((typePersonIdentification: fromModels.TypePersonIdentification) => {
        return this.typePersonIdentificationService.store(typePersonIdentification).pipe(
          map(({ data }) => fromTypePersonIdentificationActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromTypePersonIdentificationActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonIdentificationActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((typePersonIdentification: fromModels.TypePersonIdentification) => {
        return this.typePersonIdentificationService.update(typePersonIdentification).pipe(
          map(({ data }) => fromTypePersonIdentificationActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromTypePersonIdentificationActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonIdentificationActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((typePersonIdentification: fromModels.TypePersonIdentification) => {
        return this.typePersonIdentificationService.destroy(typePersonIdentification).pipe(
          map(({ data }) => fromTypePersonIdentificationActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromTypePersonIdentificationActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonIdentificationActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromTypePersonIdentificationSelectors.getPerPage)),
        this.store.pipe(select(fromTypePersonIdentificationSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchTypePersonIdentification]: [number, number, fromModels.SearchTypePersonIdentification]) => {
        return from(this.typePersonIdentificationService.pagination(
          { ...searchTypePersonIdentification, limit: perPage, page: currentPage }
        )).pipe(
          map(({ data }) => fromTypePersonIdentificationActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromTypePersonIdentificationActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromTypePersonIdentificationActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchTypePersonIdentification: fromModels.SearchTypePersonIdentification) => {
        if (
          searchTypePersonIdentification.type_person_identification.type_person_identification_id === '' &&
          searchTypePersonIdentification.type_person_identification.type_person_identification_description === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromTypePersonIdentificationActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.typePersonIdentificationService.load({ ...searchTypePersonIdentification, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromTypePersonIdentificationActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromTypePersonIdentificationActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private typePersonIdentificationService: TypePersonIdentificationService,
    private store: Store<fromTypePersonIdentificationReducers.State>
  ) { }
}
