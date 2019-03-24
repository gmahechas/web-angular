import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCoreReducers from '@web/app/core/store/reducers';
import * as fromCoreActions from '@web/app/core/store/actions';

import { LocalStorageService } from '@web/app/core/services/local-storage.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';

import { Confirm } from '@web/app/core/models/confirm.model';

import { defer, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutCoreEffects {

  @Effect({ dispatch: false })
  setDefaultLang$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.SetDefaultLang),
    map((action: fromCoreActions.SetDefaultLang) => action.payload.lang),
    tap((lang: string) => {
      this.localStorageService.setLang(lang);
      this.translate.setDefaultLang(lang);
    })
  );

  @Effect({ dispatch: false })
  changeLang$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.ChangeLang),
    map((action: fromCoreActions.ChangeLang) => action.payload.lang),
    tap((lang: string) => {
      this.localStorageService.setLang(lang);
      this.translate.use(lang);
    })
  );

  @Effect({ dispatch: false })
  setUserOffice$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.SetUserOffice),
    map((action: fromCoreActions.SetUserOffice) => action.payload),
    tap(({ userOffice, redirect }) => {
      this.localStorageService.setUserOffice(userOffice);
      this.localStorageService.setUserOfficeProject(null);
      if (redirect) {
        this.store.dispatch(new fromCoreActions.Go({ path: ['dashboard'] }));
      }
    })
  );

  @Effect({ dispatch: false })
  setUserOfficeProject$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.SetUserOfficeProject),
    map((action: fromCoreActions.SetUserOfficeProject) => action.payload),
    tap(({ userOfficeProject, redirect }) => {
      this.localStorageService.setUserOfficeProject(userOfficeProject);
      if (redirect) {
        this.store.dispatch(new fromCoreActions.Go({ path: ['dashboard'] }));
      }
    })
  );

  @Effect({ dispatch: false })
  showMessages$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.ShowMessages),
    map((action: fromCoreActions.ShowMessages) => action.payload.messages),
    tap((message: any[]) => {
      this.messageService.addAll(message);
    })
  );

  @Effect({ dispatch: false })
  confirm$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.ConfirmDialog),
    map((action: fromCoreActions.ConfirmDialog) => action.payload.confirm),
    tap((confirm: Confirm) => {
      this.confirmationService.confirm({
        accept: () => {
          if (confirm.acceptType) {
            this.store.dispatch({ type: confirm.acceptType, payload: confirm.acceptPayload });
          }
        },
        reject: () => {
          if (confirm.rejectType) {
            this.store.dispatch({ type: confirm.rejectType, payload: confirm.rejectPayload });
          }
        },
        message: confirm.message,
        key: confirm.key,
        icon: confirm.icon,
        header: confirm.header,
        acceptLabel: confirm.acceptLabel,
        rejectLabel: confirm.rejectLabel,
        acceptVisible: confirm.acceptVisible,
        rejectVisible: confirm.rejectVisible
      });
    })
  );

  @Effect({ dispatch: false })
  init$ = defer(() => {
    return of([
      this.localStorageService.getLang(),
      this.localStorageService.getUserOffice(),
      this.localStorageService.getUserOfficeProject()
    ]);
  }).pipe(
    tap(([lang, userOffice, userOfficeProject]) => {
      if (lang) {
        this.store.dispatch(new fromCoreActions.SetDefaultLang({ lang }));
      } else {
        this.store.dispatch(new fromCoreActions.SetDefaultLang({ lang: 'es-co' }));
      }
      this.store.dispatch(new fromCoreActions.SetUserOffice({ userOffice, redirect: false }));
      this.store.dispatch(new fromCoreActions.SetUserOfficeProject({ userOfficeProject, redirect: false }));
    })
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private store: Store<fromCoreReducers.State>,
    private messageService: MessageService,
    private translate: TranslateService,
    private confirmationService: ConfirmationService
  ) { }
}
