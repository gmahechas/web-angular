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
      ofType<fromTypePersonIdentificationActions.LoadEntity>(fromTypePersonIdentificationActions.EntityActionTypes.LoadEntity),
      map(action => action.payload.search),
      withLatestFrom(
        this.store.pipe(select(fromTypePersonIdentificationSelectors.getPerPage)),
        this.store.pipe(select(fromTypePersonIdentificationSelectors.getCurrentPage))
      ),
      mergeMap(([searchTypePersonIdentification, perPage, currentPage]: [fromModels.SearchTypePersonIdentification, number, number]) => {
        perPage = (perPage) ? perPage : searchTypePersonIdentification.limit;
        currentPage = (currentPage) ? currentPage : searchTypePersonIdentification.page;
        return this.typePersonIdentificationService.load({ ...searchTypePersonIdentification, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => new fromTypePersonIdentificationActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromTypePersonIdentificationActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromTypePersonIdentificationActions.StoreEntity>(fromTypePersonIdentificationActions.EntityActionTypes.StoreEntity),
      map(action => action.payload.entity),
      mergeMap((typePersonIdentification: fromModels.TypePersonIdentification) => {
        return this.typePersonIdentificationService.store(typePersonIdentification).pipe(
          map(({ data }) => new fromTypePersonIdentificationActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(new fromTypePersonIdentificationActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromTypePersonIdentificationActions.UpdateEntity>(fromTypePersonIdentificationActions.EntityActionTypes.UpdateEntity),
      map(action => action.payload.entity),
      mergeMap((typePersonIdentification: fromModels.TypePersonIdentification) => {
        return this.typePersonIdentificationService.update(typePersonIdentification).pipe(
          map(({ data }) => new fromTypePersonIdentificationActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(new fromTypePersonIdentificationActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromTypePersonIdentificationActions.DestroyEntity>(fromTypePersonIdentificationActions.EntityActionTypes.DestroyEntity),
      map(action => action.payload.entity),
      mergeMap((typePersonIdentification: fromModels.TypePersonIdentification) => {
        return this.typePersonIdentificationService.destroy(typePersonIdentification).pipe(
          map(({ data }) => new fromTypePersonIdentificationActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(new fromTypePersonIdentificationActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType<fromTypePersonIdentificationActions.PaginateEntity>(fromTypePersonIdentificationActions.EntityActionTypes.PaginateEntity),
      map(action => action.payload.page),
      withLatestFrom(
        this.store.pipe(select(fromTypePersonIdentificationSelectors.getPerPage)),
        this.store.pipe(select(fromTypePersonIdentificationSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchTypePersonIdentification]: [number, number, fromModels.SearchTypePersonIdentification]) => {
        return from(this.typePersonIdentificationService.pagination({
          ...searchTypePersonIdentification, limit: perPage, page: currentPage
        })).pipe(
          map(({ data }) => new fromTypePersonIdentificationActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromTypePersonIdentificationActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromTypePersonIdentificationActions.LoadEntityShared>(fromTypePersonIdentificationActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchTypePersonIdentification: fromModels.SearchTypePersonIdentification) => {
        if (
          searchTypePersonIdentification.type_person_identification.type_person_identification_id === '' &&
          searchTypePersonIdentification.type_person_identification.type_person_identification_description === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromTypePersonIdentificationActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.typePersonIdentificationService.load({ ...searchTypePersonIdentification, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromTypePersonIdentificationActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromTypePersonIdentificationActions.LoadFailEntity({ error })))
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
