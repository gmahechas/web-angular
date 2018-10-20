import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '@web/app/two/profile-menu/store/actions';

import * as fromModels from '@web/app/two/profile-menu/models';

import { ProfileMenuService } from '@web/app/two/profile-menu/services/profile-menu.service';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class EntityProfileMenuEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    switchMap(({ search }: { search: fromModels.SearchProfileMenu }) => {
      return this.profileMenuService.load(search).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromActions.LoadFailEntity({ error })))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private profileMenuService: ProfileMenuService
  ) { }

}
