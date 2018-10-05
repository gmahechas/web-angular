import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from '@app/app/core/store/actions';

import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutCoreEffects {


  @Effect({ dispatch: false })
  showMessages$ = this.actions$.pipe(
    ofType(fromActions.LayoutActionTypes.ShowMessages),
    map((action: fromActions.ShowMessages) => action.payload),
    tap((message: Message[]) => {
      this.messageService.addAll(message);
    })
  );

  constructor(
    private actions$: Actions,
    private messageService: MessageService
  ) { }
}
