import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

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

  setDefaultLang$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoreActions.LayoutActions.SetDefaultLang),
      map(action => action.lang),
      tap((lang: string) => {
        this.localStorageService.setLang(lang);
        this.translate.setDefaultLang(lang);
      })
    ),
    { dispatch: false }
  );

  changeLang$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoreActions.LayoutActions.ChangeLang),
      map(action => action.lang),
      tap((lang: string) => {
        this.localStorageService.setLang(lang);
        this.translate.use(lang);
      })
    ),
    { dispatch: false }
  );

  setUserOffice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoreActions.LayoutActions.SetUserOffice),
      tap(({ userOffice, redirect }) => {
        this.localStorageService.setUserOffice(userOffice);
        this.localStorageService.setUserOfficeProject(null);
        if (redirect) {
          this.store.dispatch(fromCoreActions.RouterActions.Go({ path: ['dashboard'] }));
        }
      })
    ),
    { dispatch: false }
  );

  setUserOfficeProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoreActions.LayoutActions.SetUserOfficeProject),
      tap(({ userOfficeProject, redirect }) => {
        this.localStorageService.setUserOfficeProject(userOfficeProject);
        if (redirect) {
          this.store.dispatch(fromCoreActions.RouterActions.Go({ path: ['dashboard'] }));
        }
      })
    ),
    { dispatch: false }
  );

  showMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoreActions.LayoutActions.ShowMessages),
      map(action => action.messages),
      tap((message: any[]) => {
        this.messageService.addAll(message);
      })
    ),
    { dispatch: false }
  );

  confirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoreActions.LayoutActions.ConfirmDialog),
      map(action => action.confirm),
      tap((confirm: Confirm) => {
        this.confirmationService.confirm({
          accept: () => {
            if (confirm.acceptType) {
              this.store.dispatch(confirm.acceptType(confirm.acceptPayload));
            }
          },
          reject: () => {
            if (confirm.rejectType) {
              this.store.dispatch(confirm.rejectType(confirm.rejectPayload));
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
    ),
    { dispatch: false }
  );

  init$ = createEffect(
    () => defer(() => {
      return of([
        this.localStorageService.getLang(),
        this.localStorageService.getUserOffice(),
        this.localStorageService.getUserOfficeProject()
      ]);
    }).pipe(
      tap(([lang, userOffice, userOfficeProject]) => {
        if (lang) {
          this.store.dispatch(fromCoreActions.LayoutActions.SetDefaultLang({ lang }));
        } else {
          this.store.dispatch(fromCoreActions.LayoutActions.SetDefaultLang({ lang: 'es-co' }));
        }
        this.store.dispatch(fromCoreActions.LayoutActions.SetUserOffice({ userOffice, redirect: false }));
        this.store.dispatch(fromCoreActions.LayoutActions.SetUserOfficeProject({ userOfficeProject, redirect: false }));
      })
    ),
    { dispatch: false }
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
