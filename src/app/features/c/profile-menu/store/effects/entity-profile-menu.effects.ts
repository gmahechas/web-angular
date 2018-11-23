import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromProfileMenuActions from '@web/app/features/c/profile-menu/store/actions';

import * as fromModels from '@web/app/features/c/profile-menu/models';

import { ProfileMenuService } from '@web/app/features/c/profile-menu/services/profile-menu.service';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class EntityProfileMenuEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromProfileMenuActions.LoadEntity>(fromProfileMenuActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    switchMap(({ search }: { search: fromModels.SearchProfileMenu }) => {
      return this.profileMenuService.load(search).pipe(
        map(({ data }) => new fromProfileMenuActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromProfileMenuActions.LoadFailEntity({ error })))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private profileMenuService: ProfileMenuService
  ) { }

}
