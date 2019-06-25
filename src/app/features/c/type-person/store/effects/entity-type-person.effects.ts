import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromTypePersonReducers from '@web/app/features/c/type-person/store/reducers';
import * as fromTypePersonSelectors from '@web/app/features/c/type-person/store/selectors';
import * as fromTypePersonActions from '@web/app/features/c/type-person/store/actions';

import * as fromModels from '@web/app/features/c/type-person/models';

import { TypePersonService } from '@web/app/features/c/type-person/services/type-person.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityTypePersonEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromTypePersonSelectors.getPerPage)),
        this.store.pipe(select(fromTypePersonSelectors.getCurrentPage))
      ),
      mergeMap(([searchTypePerson, perPage, currentPage]: [fromModels.SearchTypePerson, number, number]) => {
        perPage = (perPage) ? perPage : searchTypePerson.limit;
        currentPage = (currentPage) ? currentPage : searchTypePerson.page;
        return this.typePersonService.load({ ...searchTypePerson, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromTypePersonActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromTypePersonActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((typePerson: fromModels.TypePerson) => {
        return this.typePersonService.store(typePerson).pipe(
          map(({ data }) => fromTypePersonActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromTypePersonActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((typePerson: fromModels.TypePerson) => {
        return this.typePersonService.update(typePerson).pipe(
          map(({ data }) => fromTypePersonActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromTypePersonActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((typePerson: fromModels.TypePerson) => {
        return this.typePersonService.destroy(typePerson).pipe(
          map(({ data }) => fromTypePersonActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromTypePersonActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromTypePersonSelectors.getPerPage)),
        this.store.pipe(select(fromTypePersonSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchTypePerson]: [number, number, fromModels.SearchTypePerson]) => {
        return from(this.typePersonService.pagination({ ...searchTypePerson, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromTypePersonActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromTypePersonActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromTypePersonActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchTypePerson: fromModels.SearchTypePerson) => {
        if (
          searchTypePerson.type_person.type_person_id === '' &&
          searchTypePerson.type_person.type_person_description === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromTypePersonActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.typePersonService.load({ ...searchTypePerson, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromTypePersonActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromTypePersonActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private typePersonService: TypePersonService,
    private store: Store<fromTypePersonReducers.State>
  ) { }
}
